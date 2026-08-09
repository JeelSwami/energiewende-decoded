/* ============================================================
   Energiewende, decoded — application engine
   Hand-rolled SVG charts, no dependencies.
   Data + copy live in content.js (window.CONTENT).
   ============================================================ */
(function () {
  "use strict";

  const C = window.CONTENT;
  let lang = localStorage.getItem("ed-lang") || "en";
  if (!C.i18n[lang]) lang = "en";

  /* ---------------- utilities ---------------- */

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function el(tag, attrs, children) {
    const isSvg = ["svg","g","path","rect","line","circle","text","tspan","polyline"].includes(tag);
    const node = isSvg
      ? document.createElementNS("http://www.w3.org/2000/svg", tag)
      : document.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (k === "style" && typeof v === "object") Object.assign(node.style, v);
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    }
    (children || []).forEach((ch) => node.appendChild(ch));
    return node;
  }

  const locale = () => (lang === "de" ? "de-DE" : "en-US");

  function fmt(v, dec) {
    if (v === null || v === undefined || Number.isNaN(v)) return "–";
    return new Intl.NumberFormat(locale(), {
      minimumFractionDigits: dec ?? 0,
      maximumFractionDigits: dec ?? 0,
    }).format(v);
  }

  function t(key) {
    const parts = key.split(".");
    let cur = C.i18n[lang];
    for (const p of parts) cur = cur && cur[p];
    if (cur === undefined) {
      cur = C.i18n.en;
      for (const p of parts) cur = cur && cur[p];
    }
    return cur ?? key;
  }

  function niceTicks(maxVal, count) {
    if (maxVal <= 0) return [0, 1];
    const rough = maxVal / (count || 4);
    const mag = Math.pow(10, Math.floor(Math.log10(rough)));
    const norm = rough / mag;
    const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
    const ticks = [];
    for (let v = 0; v <= maxVal + step * 0.001; v += step) ticks.push(+v.toFixed(6));
    if (ticks[ticks.length - 1] < maxVal) ticks.push(+(ticks[ticks.length - 1] + step).toFixed(6));
    return ticks;
  }

  const SERIES_VARS = ["--series-1", "--series-2", "--series-3", "--series-4"];
  const sv = (i) => `var(${SERIES_VARS[i % SERIES_VARS.length]})`;

  /* ---------------- tooltip ---------------- */

  function makeTooltip(box) {
    const tip = el("div", { class: "viz-tooltip" });
    box.appendChild(tip);
    return {
      show(x, y, title, rows) {
        tip.textContent = "";
        const h = el("div", { class: "tt-title" });
        h.textContent = title;
        tip.appendChild(h);
        rows.forEach((r) => {
          const row = el("div", { class: "tt-row" });
          const key = el("span", { class: "tt-key" });
          key.style.background = r.color;
          const name = el("span", { class: "tt-name" });
          name.textContent = r.name;
          const val = el("span", { class: "tt-val" });
          val.textContent = r.value;
          row.appendChild(key); row.appendChild(name); row.appendChild(val);
          tip.appendChild(row);
        });
        tip.style.display = "block";
        const bw = box.clientWidth, tw = tip.offsetWidth;
        let left = x + 14;
        if (left + tw > bw - 4) left = x - tw - 14;
        tip.style.left = Math.max(4, left) + "px";
        tip.style.top = Math.max(4, y - 10) + "px";
      },
      hide() { tip.style.display = "none"; },
    };
  }

  /* ---------------- chart shell ---------------- */

  function chartCard(cfg) {
    // cfg: {id, titleKey, subKey, noteKey, render(figureBox), table:{headers, rows}}
    const host = document.getElementById(cfg.id);
    if (!host) return;
    host.textContent = "";
    host.className = "chart-card";
    const h3 = el("h3", { text: t(cfg.titleKey) });
    const sub = el("p", { class: "chart-sub", text: t(cfg.subKey) });
    const fig = el("figure", { role: "group", "aria-label": t(cfg.titleKey) });
    const box = el("div", { class: "chart-box" });
    fig.appendChild(box);
    host.appendChild(h3); host.appendChild(sub); host.appendChild(fig);
    cfg.render(box, fig);
    if (cfg.table) fig.appendChild(tableView(cfg.table));
    if (cfg.noteKey) {
      const note = el("p", { class: "chart-note" });
      note.innerHTML = t(cfg.noteKey);
      host.appendChild(note);
    }
  }

  function legendRow(items) {
    const lg = el("div", { class: "chart-legend", role: "list" });
    items.forEach((it) => {
      const key = el("span", { class: "key", role: "listitem" });
      const sw = el("span", { class: it.line ? "swatch-line" : "swatch-rect" });
      sw.style.background = it.color;
      const label = el("span");
      label.textContent = it.label;
      key.appendChild(sw); key.appendChild(label);
      lg.appendChild(key);
    });
    return lg;
  }

  function tableView(tbl) {
    const details = el("details", { class: "table-view" });
    const summary = el("summary", { text: t("ui.tableView") });
    const table = el("table");
    const thead = el("thead"); const trh = el("tr");
    tbl.headers.forEach((h) => { const th = el("th"); th.textContent = h; trh.appendChild(th); });
    thead.appendChild(trh);
    const tbody = el("tbody");
    tbl.rows.forEach((r) => {
      const tr = el("tr");
      r.forEach((cell) => { const td = el("td"); td.textContent = cell; tr.appendChild(td); });
      tbody.appendChild(tr);
    });
    table.appendChild(thead); table.appendChild(tbody);
    details.appendChild(summary); details.appendChild(table);
    return details;
  }

  /* ---------------- line chart ---------------- */

  function lineChart(box, cfg) {
    // cfg: {labels[], series:[{name, values[], colorIdx, area}], unit, dec, targetLine:{value,label}, yMax}
    const W = 720, H = 300, M = { t: 18, r: 76, b: 30, l: 46 };
    const iw = W - M.l - M.r, ih = H - M.t - M.b;
    const n = cfg.labels.length;
    const allVals = cfg.series.flatMap((s) => s.values).filter((v) => v != null);
    const yMax = cfg.yMax || Math.max(...allVals, cfg.targetLine ? cfg.targetLine.value : 0) * 1.08;
    const ticks = niceTicks(yMax, 4);
    const yTop = ticks[ticks.length - 1];
    const x = (i) => M.l + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
    const y = (v) => M.t + ih - (v / yTop) * ih;

    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": cfg.ariaLabel || "" });

    ticks.forEach((tv) => {
      svg.appendChild(el("line", { x1: M.l, x2: W - M.r, y1: y(tv), y2: y(tv), style: { stroke: tv === 0 ? "var(--baseline)" : "var(--grid)", strokeWidth: 1 } }));
      svg.appendChild(el("text", { x: M.l - 8, y: y(tv) + 4, "text-anchor": "end", style: { fill: "var(--muted)", fontSize: "11px", fontVariantNumeric: "tabular-nums" }, text: fmt(tv) }));
    });

    const labelStep = Math.ceil(n / 8);
    cfg.labels.forEach((lb, i) => {
      if (i % labelStep !== 0 && i !== n - 1) return;
      svg.appendChild(el("text", { x: x(i), y: H - 8, "text-anchor": "middle", style: { fill: "var(--muted)", fontSize: "11px", fontVariantNumeric: "tabular-nums" }, text: lb }));
    });

    if (cfg.targetLine) {
      svg.appendChild(el("line", { x1: M.l, x2: W - M.r, y1: y(cfg.targetLine.value), y2: y(cfg.targetLine.value), style: { stroke: "var(--muted)", strokeWidth: 1 } }));
      svg.appendChild(el("text", { x: W - M.r + 6, y: y(cfg.targetLine.value) + 4, style: { fill: "var(--muted)", fontSize: "11px" }, text: cfg.targetLine.label }));
    }

    cfg.series.forEach((s) => {
      const color = sv(s.colorIdx);
      const pts = s.values.map((v, i) => (v == null ? null : [x(i), y(v)])).filter(Boolean);
      if (s.area) {
        const d = "M" + pts.map((p) => p.join(",")).join(" L") + ` L${pts[pts.length - 1][0]},${y(0)} L${pts[0][0]},${y(0)} Z`;
        svg.appendChild(el("path", { d, style: { fill: color, opacity: 0.1 } }));
      }
      const d = "M" + pts.map((p) => p.join(",")).join(" L");
      svg.appendChild(el("path", { d, style: { stroke: color, strokeWidth: 2, fill: "none", strokeLinejoin: "round", strokeLinecap: "round" } }));
      const last = pts[pts.length - 1];
      svg.appendChild(el("circle", { cx: last[0], cy: last[1], r: 4.5, style: { fill: color, stroke: "var(--surface)", strokeWidth: 2 } }));
      const lastVal = s.values[s.values.length - 1];
      svg.appendChild(el("text", { x: last[0] + 9, y: last[1] + 4, style: { fill: "var(--ink)", fontSize: "11.5px", fontWeight: 650 }, text: fmt(lastVal, cfg.dec) + (cfg.unit ? " " + cfg.unit : "") }));
    });

    // crosshair + tooltip layer
    const hair = el("line", { y1: M.t, y2: M.t + ih, style: { stroke: "var(--baseline)", strokeWidth: 1, display: "none" } });
    svg.appendChild(hair);
    const overlay = el("rect", { x: M.l, y: M.t, width: iw, height: ih, tabindex: "0", class: "mark-hit", "aria-label": t("ui.chartKeyHint"), style: { fill: "transparent" } });
    svg.appendChild(overlay);
    box.appendChild(svg);
    const tip = makeTooltip(box);
    let focusIdx = -1;

    function showAt(i) {
      const px = x(i);
      hair.setAttribute("x1", px); hair.setAttribute("x2", px);
      hair.style.display = "block";
      const rect = box.getBoundingClientRect();
      const sx = (px / W) * rect.width;
      tip.show(sx, 20, cfg.labels[i], cfg.series.map((s) => ({
        color: sv(s.colorIdx), name: s.name,
        value: s.values[i] == null ? "–" : fmt(s.values[i], cfg.dec) + (cfg.unit ? " " + cfg.unit : ""),
      })));
    }
    function hide() { hair.style.display = "none"; tip.hide(); focusIdx = -1; }

    overlay.addEventListener("pointermove", (ev) => {
      const rect = svg.getBoundingClientRect();
      const relX = ((ev.clientX - rect.left) / rect.width) * W;
      let best = 0, bd = Infinity;
      for (let i = 0; i < n; i++) { const d = Math.abs(x(i) - relX); if (d < bd) { bd = d; best = i; } }
      showAt(best);
    });
    overlay.addEventListener("pointerleave", hide);
    overlay.addEventListener("keydown", (ev) => {
      if (ev.key === "ArrowRight") { focusIdx = Math.min(n - 1, focusIdx + 1); showAt(focusIdx); ev.preventDefault(); }
      else if (ev.key === "ArrowLeft") { focusIdx = focusIdx < 0 ? n - 1 : Math.max(0, focusIdx - 1); showAt(focusIdx); ev.preventDefault(); }
      else if (ev.key === "Escape") hide();
    });
    overlay.addEventListener("focus", () => { focusIdx = n - 1; showAt(focusIdx); });
    overlay.addEventListener("blur", hide);
  }

  /* ---------------- column chart (stacked or single) ---------------- */

  function columnChart(box, cfg) {
    // cfg: {labels[], series:[{name, values[], colorIdx}], unit, dec, stacked, yMax}
    const W = 720, H = 300, M = { t: 18, r: 16, b: 30, l: 52 };
    const iw = W - M.l - M.r, ih = H - M.t - M.b;
    const n = cfg.labels.length;
    const totals = cfg.labels.map((_, i) =>
      cfg.stacked ? cfg.series.reduce((a, s) => a + (s.values[i] || 0), 0)
                  : Math.max(...cfg.series.map((s) => s.values[i] || 0)));
    const yMax = cfg.yMax || Math.max(...totals) * 1.1;
    const ticks = niceTicks(yMax, 4);
    const yTop = ticks[ticks.length - 1];
    const y = (v) => M.t + ih - (v / yTop) * ih;
    const band = iw / n;
    const groups = cfg.stacked ? 1 : cfg.series.length;
    const barW = Math.min(24, (band * 0.62) / groups);

    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": cfg.ariaLabel || "" });
    ticks.forEach((tv) => {
      svg.appendChild(el("line", { x1: M.l, x2: W - M.r, y1: y(tv), y2: y(tv), style: { stroke: tv === 0 ? "var(--baseline)" : "var(--grid)", strokeWidth: 1 } }));
      svg.appendChild(el("text", { x: M.l - 8, y: y(tv) + 4, "text-anchor": "end", style: { fill: "var(--muted)", fontSize: "11px", fontVariantNumeric: "tabular-nums" }, text: fmt(tv) }));
    });
    const labelStep = Math.ceil(n / 10);
    cfg.labels.forEach((lb, i) => {
      if (i % labelStep !== 0 && i !== n - 1) return;
      svg.appendChild(el("text", { x: M.l + band * i + band / 2, y: H - 8, "text-anchor": "middle", style: { fill: "var(--muted)", fontSize: "11px", fontVariantNumeric: "tabular-nums" }, text: lb }));
    });

    function roundedTop(x0, y0, w, h, r) {
      if (h <= 0) return "";
      const rr = Math.min(r, h, w / 2);
      return `M${x0},${y0 + h} L${x0},${y0 + rr} Q${x0},${y0} ${x0 + rr},${y0} L${x0 + w - rr},${y0} Q${x0 + w},${y0} ${x0 + w},${y0 + rr} L${x0 + w},${y0 + h} Z`;
    }

    const tip = makeTooltip(box);
    const GAP = 2;

    cfg.labels.forEach((lb, i) => {
      const cx = M.l + band * i + band / 2;
      if (cfg.stacked) {
        let acc = 0;
        cfg.series.forEach((s, si) => {
          const v = s.values[i] || 0;
          if (v <= 0) { acc += v; return; }
          const y1 = y(acc + v), y0 = y(acc);
          const isTop = si === cfg.series.length - 1 ||
            cfg.series.slice(si + 1).every((ss) => !(ss.values[i] > 0));
          const hPix = Math.max(0, y0 - y1 - (isTop ? 0 : GAP));
          const shape = isTop
            ? roundedTop(cx - barW / 2, y1, barW, hPix, 4)
            : `M${cx - barW / 2},${y1} h${barW} v${hPix} h${-barW} Z`;
          if (hPix > 0.5) svg.appendChild(el("path", { d: shape, style: { fill: sv(s.colorIdx) } }));
          acc += v;
        });
      } else {
        cfg.series.forEach((s, si) => {
          const v = s.values[i];
          if (v == null) return;
          const totalW = cfg.series.length * barW + (cfg.series.length - 1) * GAP;
          const x0 = cx - totalW / 2 + si * (barW + GAP);
          svg.appendChild(el("path", { d: roundedTop(x0, y(v), barW, y(0) - y(v), 4), style: { fill: sv(s.colorIdx) } }));
        });
      }
      // hit area per label position
      const hit = el("rect", { x: M.l + band * i, y: M.t, width: band, height: ih, tabindex: "0", class: "mark-hit", style: { fill: "transparent" } });
      const show = () => {
        const rect = box.getBoundingClientRect();
        const sx = ((cx) / W) * rect.width;
        tip.show(sx, 16, lb, cfg.series.map((s) => ({
          color: sv(s.colorIdx), name: s.name,
          value: s.values[i] == null ? "–" : fmt(s.values[i], cfg.dec) + (cfg.unit ? " " + cfg.unit : ""),
        })));
      };
      hit.addEventListener("pointermove", show);
      hit.addEventListener("pointerleave", () => tip.hide());
      hit.addEventListener("focus", show);
      hit.addEventListener("blur", () => tip.hide());
      svg.appendChild(hit);
    });

    box.appendChild(svg);
  }

  /* ---------------- horizontal bar chart ---------------- */

  function hBarChart(box, cfg) {
    // cfg: {items:[{label, value, colorIdx, note}], unit, dec, maxVal}
    const W = 720;
    const rowH = 40, M = { t: 6, r: 90, b: 6, l: 4 };
    const labelH = 16;
    const H = M.t + cfg.items.length * rowH + M.b;
    const iw = W - M.l - M.r;
    const maxVal = cfg.maxVal || Math.max(...cfg.items.map((d) => d.value)) * 1.05;
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": cfg.ariaLabel || "" });
    const tip = makeTooltip(box);

    cfg.items.forEach((d, i) => {
      const yTop = M.t + i * rowH;
      const barY = yTop + labelH + 4;
      const bw = Math.max(2, (d.value / maxVal) * iw);
      svg.appendChild(el("text", { x: M.l, y: yTop + 12, style: { fill: "var(--ink-2)", fontSize: "12px" }, text: d.label }));
      const r = 4, hgt = 14;
      const dPath = `M${M.l},${barY} L${M.l + bw - r},${barY} Q${M.l + bw},${barY} ${M.l + bw},${barY + r} L${M.l + bw},${barY + hgt - r} Q${M.l + bw},${barY + hgt} ${M.l + bw - r},${barY + hgt} L${M.l},${barY + hgt} Z`;
      svg.appendChild(el("path", { d: dPath, style: { fill: sv(d.colorIdx) } }));
      svg.appendChild(el("text", { x: M.l + bw + 8, y: barY + 11.5, style: { fill: "var(--ink)", fontSize: "12px", fontWeight: 650, fontVariantNumeric: "tabular-nums" }, text: fmt(d.value, cfg.dec) + (cfg.unit ? " " + cfg.unit : "") }));
      const hit = el("rect", { x: 0, y: yTop, width: W, height: rowH, tabindex: "0", class: "mark-hit", style: { fill: "transparent" } });
      const show = () => {
        const rect = box.getBoundingClientRect();
        tip.show(rect.width * 0.45, (yTop / H) * rect.height, d.label, [{ color: sv(d.colorIdx), name: d.note || "", value: fmt(d.value, cfg.dec) + (cfg.unit ? " " + cfg.unit : "") }]);
      };
      hit.addEventListener("pointermove", show);
      hit.addEventListener("pointerleave", () => tip.hide());
      hit.addEventListener("focus", show);
      hit.addEventListener("blur", () => tip.hide());
      svg.appendChild(hit);
    });
    box.appendChild(svg);
  }

  /* ---------------- static content rendering ---------------- */

  function renderStatic() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      node.innerHTML = t(key);
    });
    $$("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria")));
    });
    $$(".lang-switch button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  }

  function kpiRow(hostId, tiles) {
    const host = document.getElementById(hostId);
    if (!host) return;
    host.textContent = "";
    tiles.forEach((tile) => {
      const div = el("div", { class: "stat-tile" });
      const lb = el("p", { class: "label", text: tile.label });
      const val = el("p", { class: "value" });
      val.textContent = tile.value;
      if (tile.unit) { const sm = el("small", { text: tile.unit }); val.appendChild(sm); }
      div.appendChild(lb); div.appendChild(val);
      if (tile.delta) {
        const d = el("p", { class: "delta" + (tile.deltaGood ? " up" : ""), text: tile.delta });
        div.appendChild(d);
      }
      host.appendChild(div);
    });
  }

  /* ---------------- simulator ---------------- */

  const SIM = C.sim;
  const simState = {};

  function simInit() {
    const controls = $("#sim-controls");
    if (!controls) return;
    controls.textContent = "";

    const scen = el("div", { class: "sim-scenarios", role: "group", "aria-label": t("sim.scenarios") });
    Object.entries(SIM.scenarios).forEach(([key, sc]) => {
      const b = el("button", { type: "button", "aria-pressed": "false", text: t("sim.scenarioNames." + key) });
      b.addEventListener("click", () => {
        Object.assign(simState, sc);
        $$(".sim-scenarios button", controls).forEach((bb) => bb.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true");
        simSyncInputs(); simRender();
      });
      scen.appendChild(b);
    });
    controls.appendChild(scen);

    SIM.params.forEach((p) => {
      simState[p.key] = p.def;
      const field = el("div", { class: "sim-field" });
      const label = el("label", { for: "sim-" + p.key });
      const nameSpan = el("span", { text: t("sim.params." + p.key + ".label") });
      const out = el("output", { id: "sim-out-" + p.key });
      label.appendChild(nameSpan); label.appendChild(out);
      const input = el("input", { type: "range", id: "sim-" + p.key, min: p.min, max: p.max, step: p.step, value: p.def });
      input.addEventListener("input", () => {
        simState[p.key] = parseFloat(input.value);
        $$(".sim-scenarios button", controls).forEach((bb) => bb.setAttribute("aria-pressed", "false"));
        simRender();
      });
      const hint = el("p", { class: "hint", text: t("sim.params." + p.key + ".hint") });
      field.appendChild(label); field.appendChild(input); field.appendChild(hint);
      controls.appendChild(field);
    });
    simRender();
  }

  function simSyncInputs() {
    SIM.params.forEach((p) => {
      const input = $("#sim-" + p.key);
      if (input) input.value = simState[p.key];
    });
  }

  function simRender() {
    const m = SIM.model(simState);
    SIM.params.forEach((p) => {
      const out = $("#sim-out-" + p.key);
      if (out) out.textContent = fmt(simState[p.key], p.dec || 0) + " " + t("sim.params." + p.key + ".unit");
    });
    kpiRow("sim-kpis", [
      { label: t("sim.out.peak"), value: "+" + fmt(m.peakGW, 1), unit: "GW" },
      { label: t("sim.out.energy"), value: "+" + fmt(m.energyTWh, 0), unit: "TWh" },
      { label: t("sim.out.capex"), value: "≈" + fmt(m.capexBn, 0), unit: t("sim.out.capexUnit") },
    ]);
    const box = $("#sim-bars");
    if (box) {
      box.textContent = "";
      const inner = el("div", { class: "chart-box" });
      box.appendChild(inner);
      hBarChart(inner, {
        items: m.contributions.map((cb, i) => ({
          label: t("sim.contrib." + cb.key), value: cb.gw, colorIdx: i, note: t("sim.out.peakNote"),
        })),
        unit: "GW", dec: 1,
        maxVal: Math.max(4, ...m.contributions.map((cb) => cb.gw)) * 1.1,
        ariaLabel: t("sim.out.peak"),
      });
    }
    const takeaway = $("#sim-takeaway");
    if (takeaway) takeaway.innerHTML = t("sim.out.takeaway")
      .replace("{peak}", fmt(m.peakGW, 1))
      .replace("{share}", fmt(m.peakVsToday, 0))
      .replace("{capex}", fmt(m.capexBn, 0));
  }

  /* ---------------- charts from content ---------------- */

  function renderCharts() {
    C.charts(chartHelpers).forEach(chartCard);
  }

  const chartHelpers = {
    t, fmt, sv,
    line: (cfg) => (box, fig) => {
      lineChart(box, cfg);
      if (cfg.series.length > 1) fig.appendChild(legendRow(cfg.series.map((s) => ({ label: s.name, color: sv(s.colorIdx), line: true }))));
    },
    columns: (cfg) => (box, fig) => {
      columnChart(box, cfg);
      if (cfg.series.length > 1) fig.appendChild(legendRow(cfg.series.map((s) => ({ label: s.name, color: sv(s.colorIdx) }))));
    },
    hbars: (cfg) => (box, fig) => {
      hBarChart(box, cfg);
      if (cfg.legend) fig.appendChild(legendRow(cfg.legend.map((lg) => ({ label: lg.label, color: sv(lg.colorIdx) }))));
    },
  };

  /* ---------------- header controls ---------------- */

  function initControls() {
    $$(".lang-switch button").forEach((b) => {
      b.addEventListener("click", () => {
        lang = b.dataset.lang;
        localStorage.setItem("ed-lang", lang);
        renderAll();
      });
    });
    const themeBtn = $("#theme-toggle");
    const stored = localStorage.getItem("ed-theme");
    if (stored) document.documentElement.setAttribute("data-theme", stored);
    themeBtn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme")
        || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("ed-theme", next);
    });
  }

  /* ---------------- insight & recommendation cards ---------------- */

  function renderInsights() {
    const map = { "transition-insights": "transition.insights", "eon-insights": "eon.insights" };
    Object.entries(map).forEach(([hostId, key]) => {
      const host = document.getElementById(hostId);
      const items = t(key);
      if (!host || !Array.isArray(items)) return;
      host.textContent = "";
      items.forEach((it, i) => {
        const card = el("div", { class: "insight" });
        card.appendChild(el("p", { class: "num", text: String(i + 1).padStart(2, "0") }));
        card.appendChild(el("h4", { text: it.title }));
        const p = el("p");
        p.innerHTML = it.body;
        card.appendChild(p);
        host.appendChild(card);
      });
    });
  }

  function renderRecos() {
    const host = document.getElementById("reco-list");
    const items = t("plays.items");
    if (!host || !Array.isArray(items)) return;
    host.textContent = "";
    items.forEach((it) => {
      const card = el("div", { class: "reco" });
      card.appendChild(el("p", { class: "reco-tag", text: it.tag }));
      card.appendChild(el("h4", { text: it.title }));
      const p = el("p");
      p.innerHTML = it.body;
      card.appendChild(p);
      if (it.kpi) {
        const k = el("p", { class: "kpi-line" });
        k.innerHTML = it.kpi;
        card.appendChild(k);
      }
      host.appendChild(card);
    });
  }

  /* ---------------- sources ---------------- */

  function renderSources() {
    const host = $("#source-list");
    if (!host) return;
    host.textContent = "";
    C.sources.forEach((s) => {
      const li = el("li");
      const a = el("a", { href: s.url, target: "_blank", rel: "noopener" });
      a.textContent = s.name;
      li.appendChild(a);
      const span = el("span");
      span.textContent = " — " + s.desc[lang === "de" ? "de" : "en"];
      li.appendChild(span);
      host.appendChild(li);
    });
  }

  /* ---------------- render pipeline ---------------- */

  function renderAll() {
    renderStatic();
    C.kpiRows(chartHelpers).forEach((row) => kpiRow(row.id, row.tiles));
    renderCharts();
    renderInsights();
    renderRecos();
    renderSources();
    simInit();
  }

  initControls();
  renderAll();
})();
