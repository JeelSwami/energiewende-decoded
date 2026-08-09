/* ============================================================
   Energiewende, decoded — content layer
   All copy (EN/DE), every dataset, every source.
   Datasets marked FILL are populated from /data (see data/README.md).
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- datasets ---------------- */

  const D = {
    // Renewables share of gross electricity consumption, % (BMWK/AGEE-Stat, UBA; 2025: Agora)
    resShare: {
      years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
      values: [31.6, 31.8, 36.2, 37.9, 42.2, 45.5, 41.7, 46.3, 52.9, 54.4, 55.1],
    },
    // Public net electricity generation 2025, TWh (Fraunhofer ISE Energy-Charts)
    genMix: [
      { key: "wind_onshore", twh: 106.0, renewable: true },
      { key: "solar", twh: 71.0, renewable: true },
      { key: "lignite", twh: 67.2, renewable: false },
      { key: "natural_gas", twh: 52.4, renewable: false },
      { key: "biomass", twh: 36.0, renewable: true },
      { key: "hard_coal", twh: 26.7, renewable: false },
      { key: "wind_offshore", twh: 26.1, renewable: true },
      { key: "hydro", twh: 17.8, renewable: true },
      { key: "other", twh: 16.3, renewable: false },
    ],
    // Installed capacity GW, end of year (Marktstammdatenregister/BNetzA-based)
    capacity: {
      years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
      solar: [45.4, 49.4, 54.6, 60.3, 67.8, 83.2, 99.9, 117.7],
      windOn: [52.6, 53.2, 54.2, 55.9, 58.0, 61.0, 63.6, 68.2],
      windOff: [6.4, 7.5, 7.9, 7.9, 8.2, 8.5, 9.2, 9.6],
    },
    // Congestion management cost €bn (Bundesnetzagentur, via trade press)
    redispatch: {
      years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
      costBn: [1.3, 1.4, 2.3, 4.2, 3.35, 2.8, 3.1],
    },
    // Hours with negative day-ahead prices (Fraunhofer ISE / FfE)
    negPrices: {
      years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
      hours: [211, 298, 139, 69, 301, 457, 573],
    },
    // Heat pump sales, thousand units (BWP)
    heatPumps: {
      years: [2020, 2021, 2022, 2023, 2024, 2025],
      salesK: [120, 154, 236, 356, 193, 299],
    },
    // New BEV registrations, thousand vehicles (KBA)
    ev: {
      years: [2020, 2021, 2022, 2023, 2024, 2025],
      regK: [194, 356, 471, 524, 381, 545],
    },

    // E.ON FY2025 (company reporting via EQS/Investegate, March 2026)
    eonSegments: [
      { key: "networks", ebitda: 7.7, invest: 7.0 },
      { key: "retail", ebitda: 1.7, invest: 0.48 },
      { key: "eis", ebitda: 0.59, invest: 0.9 },
    ],
    eonPath: {
      labels: ["2024", "2025", "2026e", "2028t", "2030t"],
      actual: [9.0, 9.8, null, null, null],
      target: [null, null, 9.5, 11.3, 13.0],
    },
  };

  /* ---------------- i18n ---------------- */

  const en = {
    ui: {
      navLabel: "Sections",
      themeToggle: "Toggle dark mode",
      tableView: "Table view",
      chartKeyHint: "Chart: use arrow keys to step through values",
    },
    nav: {
      transition: "The transition",
      bottleneck: "The bottleneck",
      eon: "E.ON deep dive",
      simulator: "Simulator",
      plays: "Strategic plays",
      method: "Method & sources",
    },
    hero: {
      kicker: "An independent strategy case study · Germany 2026",
      title: "Germany is rebuilding its power system. The bottleneck has moved — <em>from generation to the grid.</em>",
      sub: "Renewables covered a record share of German electricity demand in 2025 — the same year prices went negative for a record 573 hours and battery projects totalling more than 500&nbsp;GW queued for grid connections. This case study decodes that paradox with sourced data, an interactive grid-stress model, and four strategic plays for the utility at the center of it: E.ON.",
      badge1: "🇩🇪 Bilingual EN/DE",
      badge2: "📊 Every number sourced",
      badge3: "🧮 Transparent model",
      badge4: "🛠 Zero dependencies",
      disclaimer: "Independent analysis by Jeel Swami, based exclusively on public information. Not affiliated with, endorsed by, or commissioned by E.ON SE or any other company mentioned. Figures are the latest available as of August 2026; sources in the register below.",
    },
    transition: {
      kicker: "01 · The transition in numbers",
      title: "A success story that outran its infrastructure",
      lede: "Germany's renewable build-out delivered: wind and solar now out-generate fossil fuels. But the power system around the new generation fleet — grids, storage, flexible demand — was designed for a different century. The data shows both halves of that story.",
      insights: [
        {
          title: "Solar doubled, value halved",
          body: "Installed solar passed <strong>100 GW</strong> — double the 2020 fleet. The market price it earns collapsed in parallel: the German solar capture price fell below <strong>€20/MWh</strong> in May 2025, down 37% year-on-year. Growth without flexibility cannibalizes its own business case.",
        },
        {
          title: "The 80% question",
          body: "The 2030 target is <strong>80% renewables</strong> in gross electricity consumption. The 2015–2025 trend added ~2.4 percentage points a year; reaching 80% from 55.1% needs ~5 — <strong>double the historical pace</strong>. And unlike the last decade, the binding constraint is no longer building generators but connecting and integrating them.",
        },
        {
          title: "Hydrogen won't save the 2020s",
          body: "Germany has <strong>181 MW</strong> of electrolysis installed against a 10-GW-by-2030 target that is being scaled back. The flexibility the system needs this decade must come from batteries, demand response and grids — not hydrogen.",
        },
      ],
    },
    bottleneck: {
      kicker: "02 · The new bottleneck",
      title: "Negative prices, congestion costs, and a 500-GW queue",
      lede: "Three symptoms show where the system now binds: prices that go negative when solar peaks, billions spent annually to manage congestion, and a connection queue that has decoupled from physical reality — while the real demand wave (heat pumps, EVs, data centers) is only beginning.",
      prose: "<p>By late 2025, grid-connection requests for large battery storage exceeded <strong>500 GW</strong> nationwide — a BDEW survey of four transmission and 17 large distribution operators counted more than <strong>720 GW</strong> — against a national peak load of roughly 80 GW. Only ~2.5 GW of large-scale storage was actually in operation. The queue is largely speculative options, not projects; and real, bankable load waits behind it: at E.ON's DSO Mitnetz Strom alone, 90 data-center requests total <strong>16.8 GW</strong>.</p><p>The fixes are known and contested: maturity-gating of the queue (<em>Reifegradverfahren</em>), the Bundesnetzagentur's new NEST framework for grid returns (December 2025), a €6.5bn federal subsidy that cut 2026 transmission charges by ~57%, and the debate about stretching grid-cost recovery over decades (<em>Amortisationskonto</em>). Every one of them is a live construction site where analysis capacity is scarce — which is exactly why this is the most interesting corner of the sector to work in.</p>",
    },
    eon: {
      kicker: "03 · Company deep dive",
      title: "E.ON: the purest exposure to the grid decade",
      lede: "After the 2018–2020 asset swap with RWE, E.ON runs grids and retail — no large-scale generation. Europe's largest distribution operator and energy retailer is, in effect, a leveraged bet that Germany solves its grid problem. The FY2025 numbers say the bet is working; the constraints say why it needs help.",
      prose: "<p><strong>What could stop the machine?</strong> Four things. Regulatory returns — whether the NEST framework prices equity attractively enough. The queue — connection chaos consumes engineering capacity and political goodwill. Financing — €48bn over five years lands in a sector with a measured financing gap of €346bn (KfW/PwC). And retail commoditization — mandatory dynamic tariffs make cost-to-serve, not brand, the differentiator. Each constraint maps to a strategic play below.</p>",
      insights: [
        {
          title: "A connection every seven seconds",
          body: "E.ON's German digital twin (built with envelio) covers <strong>700,000 km</strong> of grid and 55 million components, auto-assessing over <strong>410,000</strong> connection requests a year. CEO Leonhard Birnbaum expects E.ON will need to make \"one connection every seven seconds of a working day\" by 2030.",
        },
        {
          title: "The smart-meter frontrunner",
          body: "First German utility past <strong>1 million</strong> smart meters — a ~30% rollout rate at its DSOs versus the statutory 20% minimum for end-2025. Nearly half of all smart meters in Germany sit in E.ON grid areas. Metering is the substrate for §14a flexibility and dynamic tariffs.",
        },
        {
          title: "Data centers: constraint into product",
          body: "Frankfurt's grid is full — so E.ON's June 2025 partnership with CyrusOne adds <strong>61 MW</strong> of on-site generation to the FRA7 campus by 2029. Turning connection scarcity into an infrastructure-solutions product line is the template for the AI-demand decade.",
        },
      ],
    },
    sim: {
      kicker: "04 · Interactive model",
      title: "Grid-stress simulator: the 2030 demand wave",
      lede: "How much new peak load hits German distribution grids by 2030 — and what does it cost to absorb? Move the levers or pick a scenario. Every coefficient is documented in the model card below; the point of the model is not precision but seeing which lever dominates.",
      scenarios: "Scenarios",
      scenarioNames: { base: "Base case", policy: "Policy targets", slow: "Slow lane" },
      params: {
        ev: { label: "Additional battery-electric cars by 2030", unit: "m", hint: "Germany had ~1.8m BEVs in 2025; the former political goal was 15m by 2030." },
        hp: { label: "Additional heat pumps by 2030", unit: "m", hint: "Sales peaked at ~356k/yr in 2023; the political ambition was 500k/yr." },
        dc: { label: "Additional data-center load by 2030", unit: "GW", hint: "Bitkom expects IT connection capacity to grow from 2.7 to ~4.8 GW by 2030." },
        flex: { label: "Share of new loads actively managed", unit: "%", hint: "Smart charging & §14a dimming reduce coincident peak demand." },
      },
      out: {
        peak: "Additional peak load",
        energy: "Additional annual demand",
        capex: "Implied distribution capex",
        capexUnit: "bn €",
        peakNote: "contribution to added peak",
        takeaway: "This scenario adds <strong>{peak} GW</strong> of coincident peak load — about <strong>{share}%</strong> of today's national peak (~79 GW) — implying on the order of <strong>€{capex}bn</strong> of distribution-grid investment. Flexibility is the cheapest lever on this board: it cuts the peak without cutting the demand.",
      },
      contrib: { ev: "Electric vehicles", hp: "Heat pumps", dc: "Data centers" },
      modelCardTitle: "Model card — every assumption, sourced",
      modelCardBody: "<p><strong>Peak load.</strong> <code>ΔP = N_EV · 11 kW · g_EV + N_HP · 2.8 kW · g_HP + P_DC · 0.9</code>. EV coincidence factor g_EV = 0.20 for uncontrolled home charging, reduced by up to 60% as the managed share rises (smart charging; Consentec 2020, Probst 2014). Heat-pump electrical design load ≈ 2.8 kW (air-water, incl. auxiliary heating; ZVEI 2023) with g_HP = 0.75 in a cold snap, reduced by up to 40% via §14a EnWG dimming (the law guarantees a 4.2 kW minimum, so flexibility is bounded). Data centers run near-flat (load factor 0.9).</p><p><strong>Energy.</strong> EV ≈ 2.5 MWh/yr (≈14,000 km at ~18 kWh/100 km); heat pump ≈ 4.5 MWh/yr (BWP typical values); data centers at 0.8 utilization × 8,760 h.</p><p><strong>Capex proxy.</strong> ≈ €2.8bn per GW of added coincident peak — derived from the BDEW/ZVEI estimate of €323bn distribution-grid investment to 2045 spread over the load and generation it integrates. Order-of-magnitude only: actual cost depends on local headroom, simultaneity with PV feed-in, and how much reinforcement digital operation avoids.</p><p><strong>Limitations.</strong> Static, national-level, linear model; no regional resolution, no PV feed-in peaks (which size rural grids), no price feedback. It answers one question honestly: <em>which lever moves the number</em>.</p>",
    },
    plays: {
      kicker: "05 · Recommendations",
      title: "Four plays for the grid decade",
      lede: "What I would tell the board. Each play answers a measured problem from the sections above, and each carries the KPI I would put on the steering dashboard.",
      items: [
        {
          tag: "Play 1 · Networks",
          title: "Clear the queue: from first-come-first-served to maturity-gated",
          body: "More than 500 GW of storage requests nationwide — E.ON alone reports ~330 GW — sit in queues designed for a slower era, delaying data centers and industry. Implement maturity-gating (site control, permits, financing) with published criteria, refundable reservation fees to price out speculation, hosting-capacity maps from the digital twin so developers self-select feasible nodes, and flexible (curtailable) connection agreements as a fast lane.",
          kpi: "KPI: median time-to-connection-offer · share of queue with demonstrated maturity · GW of flexible-connection contracts signed",
        },
        {
          tag: "Play 2 · Capital",
          title: "Finance the compounding machine",
          body: "€48bn of planned investment 2026–2030 meets a sector whose measured financing gap is €346bn (KfW/PwC) — EnBW already needed a €3.1bn capital increase. Treat the programme as a capital-allocation portfolio: recycle capital via minority stakes in mature grid assets, back intergenerational cost-smoothing (Amortisationskonto-type instruments), and argue the NEST equity-return case with quantified evidence, not lobbying prose.",
          kpi: "KPI: FFO/net debt within rating corridor · realized RAB growth vs. plan · regulatory return vs. cost-of-capital spread",
        },
        {
          tag: "Play 3 · Retail & flexibility",
          title: "Monetize flexibility at the edge",
          body: "573 negative-price hours in 2025, §14a dimming rights, time-variable grid fees and mandatory dynamic tariffs turn household flexibility into an asset class. Bundle dynamic tariff + wallbox + heat pump + home battery into one flex subscription that shifts load into cheap hours and sells aggregated flexibility into congestion management — retail stops being a shrinking commodity and becomes the platform.",
          kpi: "KPI: MW of §14a-controlled load under management · smart-meter penetration vs. 20%→95% trajectory · churn in flex cohorts vs. commodity cohorts",
        },
        {
          tag: "Play 4 · AI & operations",
          title: "Industrialize AI where it defers capex",
          body: "Three AI theses survive scrutiny: probabilistic load-flow on the digital twin (planning in days, not months — and deferred reinforcement), AI-assisted field-force productivity against >18,000 unfilled electrician vacancies, and extending the existing ~70%-automation customer-service estate into tariff optimization. All of it inside NIS2/KRITIS constraints — since December 2025, cybersecurity is a board duty in Germany.",
          kpi: "KPI: planning cycle time · capex deferred per € of digital spend · cost-to-serve per customer · automation rate with a CSAT floor",
        },
      ],
    },
    method: {
      kicker: "06 · Method",
      title: "How this was built",
      lede: "Built the way a client deliverable should be: every number traced to a primary source, every derived statistic reproducible from code, every model assumption documented.",
      prose: "<p>Quantitative claims trace to the source register below (Bundesnetzagentur/SMARD, Fraunhofer ISE Energy-Charts, Agora Energiewende, BDEW, KBA, KfW, company reporting). Derived statistics — trend vs. the 80% target, the solar/negative-price correlation, congestion-cost trajectories — are computed in the repository's <a href='https://github.com/JeelSwami/energiewende-decoded/tree/main/analysis' target='_blank' rel='noopener'>Python analysis layer</a>; the datasets ship as CSVs with a data dictionary. Where 2026 figures were not yet published, the latest full-year values are used and labeled. The app itself is dependency-free: hand-rolled SVG charts with keyboard navigation, table views for every chart, and a color system validated for color-vision deficiency in both light and dark mode.</p>",
      sourcesTitle: "Source register",
    },
    about: {
      kicker: "07 · About",
      title: "About the analyst",
      name: "Jeel Swami",
      p1: "Physics-trained data scientist heading into energy consulting. I like problems where regulation, engineering, and capital meet — which is the German power grid in one sentence.",
      p2: "My background is computational: Monte-Carlo simulation of many-body systems, materials-informatics ML pipelines, and open-data dashboards. This case study applies the same discipline — sourced data, reproducible analysis, transparent models — to utility strategy.",
      p3: "I work in English and German (and built my own vocabulary trainer on the way to C1). If this analysis is useful to your team, I'd love to talk.",
      link1: "<strong>This project</strong> — <a href='https://github.com/JeelSwami/energiewende-decoded' target='_blank' rel='noopener'>github.com/JeelSwami/energiewende-decoded</a>",
      link2: "<strong>EU research-funding dashboard NRW</strong> — <a href='https://github.com/JeelSwami/nrw-funding-dashboard' target='_blank' rel='noopener'>CORDIS/Eurostat open data, interactive</a>",
      link3: "<strong>Materials-informatics ML</strong> — <a href='https://github.com/JeelSwami/Materials-Band-Gap-Prediction-ML-' target='_blank' rel='noopener'>band-gap prediction from atomic descriptors</a>",
      link4: "<strong>Contact</strong> — <a href='mailto:jeelswamis@gmail.com'>jeelswamis@gmail.com</a> · <a href='https://github.com/JeelSwami' target='_blank' rel='noopener'>@JeelSwami</a>",
    },
    footer: {
      left: "© 2026 Jeel Swami · MIT License · Independent analysis, not affiliated with any company mentioned.",
      right: "Data status: August 2026 · Built by hand — no chart libraries harmed.",
    },
    charts: {
      resShare: {
        title: "Renewables share of electricity consumption",
        sub: "Share of gross electricity consumption, Germany, % — versus the 80% target for 2030",
        note: "Source: UBA/AGEB via Agora Energiewende annual reviews; 2025 per Agora \"Die Energiewende in Deutschland: Stand der Dinge 2025\".",
      },
      genMix: {
        title: "Where German electricity came from in 2025",
        sub: "Public net electricity generation, TWh",
        note: "Source: Fraunhofer ISE Energy-Charts, annual evaluation 2025 (~419.5 TWh public net generation; renewables 55.9%).",
        renewable: "Renewable",
        fossil: "Fossil & other",
        wind_onshore: "Wind onshore",
        wind_offshore: "Wind offshore",
        solar: "Solar PV",
        biomass: "Biomass",
        hydro: "Hydro",
        lignite: "Lignite",
        hard_coal: "Hard coal",
        natural_gas: "Natural gas",
        other: "Other",
      },
      capacity: {
        title: "The build-out: installed capacity",
        sub: "Gigawatts installed, end of year",
        note: "Source: Bundesnetzagentur / Fraunhofer ISE Energy-Charts.",
        solar: "Solar PV",
        windOn: "Wind onshore",
        windOff: "Wind offshore",
      },
      redispatch: {
        title: "The cost of congestion",
        sub: "Congestion management (redispatch, curtailment etc.), € billion per year",
        note: "Source: Bundesnetzagentur congestion management reports. Cumulative 2019–2025: €18.4bn (computed in the repo's analysis layer).",
      },
      negPrices: {
        title: "Hours below zero",
        sub: "Hours with negative day-ahead wholesale prices per year",
        note: "Source: Fraunhofer ISE / FfE, EPEX day-ahead data. Correlation with installed solar capacity: Pearson r = 0.82 (see analysis/).",
      },
      heatPumps: {
        title: "Heat pumps: crash and rebound",
        sub: "Heating heat pumps sold in Germany, thousand units per year",
        note: "Source: Bundesverband Wärmepumpe (BWP). 2025: 299k (+55%) — heat pumps outsold gas boilers for the first time.",
      },
      ev: {
        title: "Electric cars: dip and record",
        sub: "New battery-electric registrations in Germany, thousands per year",
        note: "Source: Kraftfahrt-Bundesamt (KBA). BEV stock passed 2 million on 1 Jan 2026.",
      },
      eonSegments: {
        title: "E.ON FY2025: where the money is made",
        sub: "Adjusted EBITDA by segment, € billion",
        note: "Source: E.ON FY2025 results (EQS/Investegate, March 2026). Investment 2025: Networks €7.0bn · Retail ~€0.5bn · Infrastructure Solutions ~€0.9bn.",
        networks: "Energy Networks",
        retail: "Energy Retail",
        eis: "Infrastructure Solutions",
      },
      eonPath: {
        title: "The compounding path",
        sub: "Group adjusted EBITDA, € billion — actuals and company targets",
        note: "Source: E.ON FY2025 results & guidance; 2026e = guidance midpoint, 2028t/2030t = company targets (>€11.3bn / ~€13bn).",
        actual: "Actual",
        target: "Guidance / target",
      },
    },
    kpis: {
      hero: [
        { label: "Renewables share of demand, 2025", value: "55.1", unit: "%" },
        { label: "Hours with negative prices, 2025", value: "573", unit: "h", delta: "record — up from 457 in 2024" },
        { label: "Grid investment need to 2045", value: "€360+", unit: "bn", delta: "BNetzA-based estimate" },
        { label: "Battery projects queuing for connection", value: ">500", unit: "GW", delta: "vs. ~80 GW national peak load" },
      ],
      bottleneck: [
        { label: "Storage requests (BDEW survey, 2025)", value: ">720", unit: "GW" },
        { label: "Large-scale storage actually operating", value: "≈2.5", unit: "GW", delta: "end of 2025" },
        { label: "Data-center requests at one E.ON DSO", value: "16.8", unit: "GW", delta: "Mitnetz Strom, 90 projects" },
        { label: "DSO investment need by 2033", value: "≈€110", unit: "bn" },
      ],
      eon: [
        { label: "Adjusted EBITDA FY2025", value: "€9.8", unit: "bn", delta: "+9% vs 2024", deltaGood: true },
        { label: "Investment plan 2026–2030", value: "€48", unit: "bn" },
        { label: "Retail customers in Europe", value: "46.8", unit: "m" },
        { label: "German grid operated", value: "700k", unit: "km", delta: "~110 GW renewables connected" },
      ],
    },
  };

  const de = {
    ui: {
      navLabel: "Abschnitte",
      themeToggle: "Dunkelmodus umschalten",
      tableView: "Tabellenansicht",
      chartKeyHint: "Diagramm: mit Pfeiltasten durch die Werte navigieren",
    },
    nav: {
      transition: "Die Wende",
      bottleneck: "Der Engpass",
      eon: "E.ON im Detail",
      simulator: "Simulator",
      plays: "Handlungsfelder",
      method: "Methodik & Quellen",
    },
    hero: {
      kicker: "Eine unabhängige Strategie-Fallstudie · Deutschland 2026",
      title: "Deutschland baut sein Stromsystem um. Der Engpass ist gewandert — <em>von der Erzeugung ins Netz.</em>",
      sub: "2025 deckten Erneuerbare einen Rekordanteil des deutschen Strombedarfs — im selben Jahr waren die Börsenpreise rekordhohe 573 Stunden negativ, und Batterieprojekte mit über 500&nbsp;GW standen in der Netzanschluss-Warteschlange. Diese Fallstudie entschlüsselt das Paradox: mit belegten Daten, einem interaktiven Netzstress-Modell und vier strategischen Handlungsfeldern für das Unternehmen im Zentrum — E.ON.",
      badge1: "🇩🇪 Zweisprachig DE/EN",
      badge2: "📊 Jede Zahl belegt",
      badge3: "🧮 Transparentes Modell",
      badge4: "🛠 Ohne Fremdbibliotheken",
      disclaimer: "Unabhängige Analyse von Jeel Swami, ausschließlich auf Basis öffentlicher Informationen. Nicht mit E.ON SE oder anderen genannten Unternehmen verbunden, von ihnen beauftragt oder autorisiert. Zahlen: Stand August 2026, jeweils letzte verfügbare Werte; Quellen im Verzeichnis unten.",
    },
    transition: {
      kicker: "01 · Die Wende in Zahlen",
      title: "Eine Erfolgsgeschichte, die ihrer Infrastruktur davongelaufen ist",
      lede: "Der Ausbau der Erneuerbaren hat geliefert: Wind und Solar erzeugen inzwischen mehr Strom als die fossilen Kraftwerke. Aber das System um den neuen Erzeugungspark — Netze, Speicher, flexible Nachfrage — stammt aus einem anderen Jahrhundert. Die Daten zeigen beide Hälften dieser Geschichte.",
      insights: [
        {
          title: "Solar verdoppelt, Wert halbiert",
          body: "Die installierte Solarleistung hat <strong>100 GW</strong> überschritten — doppelt so viel wie 2020. Parallel ist ihr Marktwert eingebrochen: Der deutsche Solar-Capture-Preis fiel im Mai 2025 unter <strong>20 €/MWh</strong>, minus 37 % zum Vorjahr. Wachstum ohne Flexibilität kannibalisiert sein eigenes Geschäftsmodell.",
        },
        {
          title: "Die 80-Prozent-Frage",
          body: "Das Ziel für 2030: <strong>80 % Erneuerbare</strong> am Bruttostromverbrauch. Der Trend 2015–2025 brachte ~2,4 Prozentpunkte pro Jahr; von 55,1 % auf 80 % braucht es ~5 — <strong>das doppelte historische Tempo</strong>. Und anders als im letzten Jahrzehnt ist der Engpass nicht mehr der Bau von Anlagen, sondern ihr Anschluss und ihre Integration.",
        },
        {
          title: "Wasserstoff rettet die 2020er nicht",
          body: "Deutschland hat <strong>181 MW</strong> Elektrolyse installiert — bei einem 10-GW-Ziel für 2030, das gerade zurückgenommen wird. Die Flexibilität, die das System in diesem Jahrzehnt braucht, müssen Batterien, Lastmanagement und Netze liefern, nicht Wasserstoff.",
        },
      ],
    },
    bottleneck: {
      kicker: "02 · Der neue Engpass",
      title: "Negative Preise, Redispatch-Kosten und eine 500-GW-Warteschlange",
      lede: "Drei Symptome zeigen, wo das System heute klemmt: Preise, die bei Solarspitzen negativ werden, Milliarden pro Jahr für Engpassmanagement, und eine Anschluss-Warteschlange, die sich von der physischen Realität entkoppelt hat — während die eigentliche Nachfragewelle (Wärmepumpen, E-Autos, Rechenzentren) erst beginnt.",
      prose: "<p>Ende 2025 überstiegen die Netzanschlussbegehren für Großbatteriespeicher bundesweit <strong>500 GW</strong> — eine BDEW-Abfrage bei vier Übertragungs- und 17 großen Verteilnetzbetreibern zählte über <strong>720 GW</strong> — bei einer Jahreshöchstlast von rund 80 GW. Tatsächlich in Betrieb: nur ~2,5 GW Großspeicher. Die Warteschlange besteht überwiegend aus spekulativen Optionen, nicht aus Projekten; dahinter wartet reale, finanzierbare Last: Allein bei der E.ON-Tochter Mitnetz Strom summieren sich 90 Rechenzentrums-Anfragen auf <strong>16,8 GW</strong>.</p><p>Die Lösungsansätze sind bekannt und umkämpft: das Reifegradverfahren für die Warteschlange, der neue NEST-Regulierungsrahmen der Bundesnetzagentur für Netzrenditen (Dezember 2025), ein Bundeszuschuss von 6,5 Mrd. €, der die Übertragungsnetzentgelte 2026 um ~57 % senkt, und die Debatte um ein <em>Amortisationskonto</em>, das die Netzkosten über Jahrzehnte streckt. Jeder dieser Punkte ist eine offene Baustelle, auf der Analysekapazität knapp ist — genau deshalb ist dies die spannendste Ecke der Branche.</p>",
    },
    eon: {
      kicker: "03 · Unternehmensanalyse",
      title: "E.ON: das reinste Investment in das Netz-Jahrzehnt",
      lede: "Seit dem Asset-Tausch mit RWE (2018–2020) betreibt E.ON Netze und Vertrieb — ohne Großerzeugung. Europas größter Verteilnetzbetreiber und Energievertrieb ist damit faktisch eine gehebelte Wette darauf, dass Deutschland sein Netzproblem löst. Die Zahlen für 2025 zeigen: Die Wette geht auf. Die Engpässe zeigen, warum sie Unterstützung braucht.",
      prose: "<p><strong>Was könnte die Maschine stoppen?</strong> Vier Dinge. Die regulatorische Verzinsung — ob NEST Eigenkapital attraktiv genug vergütet. Die Warteschlange — Anschlusschaos bindet Ingenieurkapazität und politisches Kapital. Die Finanzierung — 48 Mrd. € in fünf Jahren treffen auf eine Branche mit einer bezifferten Finanzierungslücke von 346 Mrd. € (KfW/PwC). Und die Kommodifizierung des Vertriebs — verpflichtende dynamische Tarife machen die Servicekosten, nicht die Marke, zum Differenzierungsmerkmal. Jeder dieser Engpässe führt zu einem Handlungsfeld weiter unten.</p>",
      insights: [
        {
          title: "Alle sieben Sekunden ein Anschluss",
          body: "E.ONs digitaler Netz-Zwilling (mit envelio) umfasst <strong>700.000 km</strong> Netz und 55 Millionen Betriebsmittel und bewertet über <strong>410.000</strong> Anschlussbegehren pro Jahr automatisiert. CEO Leonhard Birnbaum erwartet, dass E.ON bis 2030 „alle sieben Sekunden eines Arbeitstags einen Anschluss“ herstellen muss.",
        },
        {
          title: "Vorreiter beim Smart Meter",
          body: "Als erster deutscher Versorger über <strong>1 Million</strong> intelligente Messsysteme — eine Rollout-Quote von ~30 % bei den eigenen Verteilnetzbetreibern gegenüber den gesetzlichen 20 % für Ende 2025. Fast die Hälfte aller Smart Meter Deutschlands steht in E.ON-Netzgebieten. Messtechnik ist das Substrat für §14a-Flexibilität und dynamische Tarife.",
        },
        {
          title: "Rechenzentren: aus Engpass wird Produkt",
          body: "Frankfurts Netz ist voll — also liefert E.ONs Partnerschaft mit CyrusOne (Juni 2025) bis 2029 <strong>61 MW</strong> lokale Erzeugung für den FRA7-Campus. Anschlussknappheit in ein Infrastrukturprodukt zu verwandeln, ist die Blaupause für das Jahrzehnt der KI-Nachfrage.",
        },
      ],
    },
    sim: {
      kicker: "04 · Interaktives Modell",
      title: "Netzstress-Simulator: die Nachfragewelle bis 2030",
      lede: "Wie viel neue Spitzenlast trifft die deutschen Verteilnetze bis 2030 — und was kostet es, sie aufzunehmen? Bewegen Sie die Hebel oder wählen Sie ein Szenario. Jeder Koeffizient ist in der Modellkarte dokumentiert; der Zweck des Modells ist nicht Präzision, sondern zu zeigen, welcher Hebel dominiert.",
      scenarios: "Szenarien",
      scenarioNames: { base: "Basisszenario", policy: "Politische Ziele", slow: "Langsamer Pfad" },
      params: {
        ev: { label: "Zusätzliche E-Autos bis 2030", unit: "Mio.", hint: "2025 waren ~1,8 Mio. BEV zugelassen; das frühere politische Ziel lautete 15 Mio. bis 2030." },
        hp: { label: "Zusätzliche Wärmepumpen bis 2030", unit: "Mio.", hint: "Absatzspitze 2023: ~356.000/Jahr; die politische Ambition lag bei 500.000/Jahr." },
        dc: { label: "Zusätzliche Rechenzentrumslast bis 2030", unit: "GW", hint: "Bitkom erwartet einen Anstieg der IT-Anschlussleistung von 2,7 auf ~4,8 GW bis 2030." },
        flex: { label: "Anteil aktiv gesteuerter neuer Lasten", unit: "%", hint: "Gesteuertes Laden & §14a-Dimmung senken die gleichzeitige Spitzenlast." },
      },
      out: {
        peak: "Zusätzliche Spitzenlast",
        energy: "Zusätzlicher Jahresverbrauch",
        capex: "Implizierter Verteilnetz-Invest",
        capexUnit: "Mrd. €",
        peakNote: "Beitrag zur zusätzlichen Spitzenlast",
        takeaway: "Dieses Szenario erzeugt <strong>{peak} GW</strong> zusätzliche gleichzeitige Spitzenlast — rund <strong>{share} %</strong> der heutigen Jahreshöchstlast (~79 GW) — und impliziert Verteilnetz-Investitionen in der Größenordnung von <strong>{capex} Mrd. €</strong>. Flexibilität ist der günstigste Hebel auf diesem Brett: Sie senkt die Spitze, ohne den Verbrauch zu senken.",
      },
      contrib: { ev: "Elektrofahrzeuge", hp: "Wärmepumpen", dc: "Rechenzentren" },
      modelCardTitle: "Modellkarte — jede Annahme, mit Quelle",
      modelCardBody: "<p><strong>Spitzenlast.</strong> <code>ΔP = N_EV · 11 kW · g_EV + N_WP · 2,8 kW · g_WP + P_RZ · 0,9</code>. Gleichzeitigkeitsfaktor E-Auto g_EV = 0,20 bei ungesteuertem Heimladen, mit steigendem Steuerungsanteil um bis zu 60 % reduziert (gesteuertes Laden; Consentec 2020, Probst 2014). Elektrische Auslegungsleistung Wärmepumpe ≈ 2,8 kW (Luft-Wasser, inkl. Zusatzheizung; ZVEI 2023) mit g_WP = 0,75 bei Kältewelle, per §14a-EnWG-Dimmung um bis zu 40 % reduzierbar (das Gesetz garantiert 4,2 kW Mindestleistung — die Flexibilität ist also begrenzt). Rechenzentren laufen nahezu konstant (Lastfaktor 0,9).</p><p><strong>Energie.</strong> E-Auto ≈ 2,5 MWh/Jahr (≈14.000 km bei ~18 kWh/100 km); Wärmepumpe ≈ 4,5 MWh/Jahr (BWP-Richtwerte); Rechenzentren mit 0,8 Auslastung × 8.760 h.</p><p><strong>Investitions-Proxy.</strong> ≈ 2,8 Mrd. € je GW zusätzlicher gleichzeitiger Spitzenlast — abgeleitet aus der BDEW/ZVEI-Schätzung von 323 Mrd. € Verteilnetz-Investitionsbedarf bis 2045, verteilt auf die zu integrierende Last und Erzeugung. Nur Größenordnung: Die tatsächlichen Kosten hängen von lokalen Reserven, der Gleichzeitigkeit mit PV-Einspeisung und dem durch Digitalisierung vermiedenen Ausbau ab.</p><p><strong>Grenzen.</strong> Statisches, nationales, lineares Modell; keine regionale Auflösung, keine PV-Einspeisespitzen (die ländliche Netze dimensionieren), keine Preisrückkopplung. Es beantwortet ehrlich genau eine Frage: <em>welcher Hebel bewegt die Zahl</em>.</p>",
    },
    plays: {
      kicker: "05 · Handlungsempfehlungen",
      title: "Vier Handlungsfelder für das Netz-Jahrzehnt",
      lede: "Was ich dem Vorstand sagen würde. Jedes Handlungsfeld beantwortet ein gemessenes Problem aus den vorigen Abschnitten — und trägt den KPI, den ich auf das Steuerungs-Dashboard setzen würde.",
      items: [
        {
          tag: "Feld 1 · Netze",
          title: "Die Warteschlange räumen: vom Windhundprinzip zum Reifegradverfahren",
          body: "Über 500 GW Speicher-Anschlussbegehren bundesweit — E.ON allein meldet ~330 GW — stehen in Warteschlangen aus einer langsameren Ära und verzögern Rechenzentren und Industrie. Einführen: Reifegrad-Prüfung (Flächensicherung, Genehmigungen, Finanzierung) mit veröffentlichten Kriterien, rückzahlbare Reservierungsgebühren gegen Spekulation, Kapazitätskarten aus dem digitalen Zwilling zur Selbstselektion machbarer Netzknoten, und flexible (abregelbare) Anschlussverträge als Überholspur.",
          kpi: "KPI: Median-Zeit bis zum Anschlussangebot · Anteil der Warteschlange mit nachgewiesener Reife · GW abgeschlossener flexibler Anschlussverträge",
        },
        {
          tag: "Feld 2 · Kapital",
          title: "Die Verzinsungsmaschine finanzieren",
          body: "48 Mrd. € geplante Investitionen 2026–2030 treffen auf eine Branche mit einer bezifferten Finanzierungslücke von 346 Mrd. € (KfW/PwC) — EnBW brauchte bereits eine Kapitalerhöhung von 3,1 Mrd. €. Das Programm als Kapitalallokations-Portfolio führen: Kapitalrecycling über Minderheitsbeteiligungen an reifen Netzen, Unterstützung generationenübergreifender Kostenstreckung (Instrumente vom Typ Amortisationskonto), und die NEST-Eigenkapitaldebatte mit quantifizierter Evidenz führen statt mit Lobbyprosa.",
          kpi: "KPI: FFO/Nettoverschuldung im Rating-Korridor · realisiertes RAB-Wachstum vs. Plan · Spread regulatorische Verzinsung vs. Kapitalkosten",
        },
        {
          tag: "Feld 3 · Vertrieb & Flexibilität",
          title: "Flexibilität am Netzrand monetarisieren",
          body: "573 Negativpreis-Stunden im Jahr 2025, §14a-Dimmrechte, zeitvariable Netzentgelte und verpflichtende dynamische Tarife machen Haushaltsflexibilität erstmals zur Anlageklasse. Dynamischen Tarif + Wallbox + Wärmepumpe + Heimspeicher zu einem Flex-Abo bündeln, das Last in günstige Stunden verschiebt und aggregierte Flexibilität ins Engpassmanagement verkauft — der Vertrieb hört auf, schrumpfende Commodity zu sein, und wird zur Plattform.",
          kpi: "KPI: MW gesteuerter §14a-Last im Portfolio · Smart-Meter-Quote vs. 20 %→95 %-Pfad · Kündigungsquote Flex-Kohorten vs. Commodity-Kohorten",
        },
        {
          tag: "Feld 4 · KI & Betrieb",
          title: "KI dort industrialisieren, wo sie Capex vermeidet",
          body: "Drei KI-Thesen halten der Prüfung stand: probabilistische Lastflussrechnung auf dem digitalen Zwilling (Planung in Tagen statt Monaten — und aufgeschobener Netzausbau), KI-gestützte Produktivität im Außendienst gegen über 18.000 unbesetzte Elektriker-Stellen, und die Erweiterung der bestehenden Kundenservice-Automatisierung (~70 %) in Richtung Tarifoptimierung. Alles innerhalb der NIS2-/KRITIS-Leitplanken — Cybersicherheit ist in Deutschland seit Dezember 2025 Vorstandspflicht.",
          kpi: "KPI: Planungszykluszeit · vermiedener Capex je € Digitalinvest · Servicekosten je Kunde · Automatisierungsquote mit CSAT-Untergrenze",
        },
      ],
    },
    method: {
      kicker: "06 · Methodik",
      title: "Wie diese Analyse entstanden ist",
      lede: "Gebaut wie ein Kundendeliverable gebaut sein sollte: jede Zahl auf eine Primärquelle zurückführbar, jede abgeleitete Statistik aus Code reproduzierbar, jede Modellannahme dokumentiert.",
      prose: "<p>Alle quantitativen Aussagen führen auf das Quellenverzeichnis unten zurück (Bundesnetzagentur/SMARD, Fraunhofer ISE Energy-Charts, Agora Energiewende, BDEW, KBA, KfW, Unternehmensberichte). Abgeleitete Statistiken — Trend vs. 80-%-Ziel, die Solar/Negativpreis-Korrelation, Redispatch-Kostenpfade — werden in der <a href='https://github.com/JeelSwami/energiewende-decoded/tree/main/analysis' target='_blank' rel='noopener'>Python-Analyseschicht</a> des Repositories berechnet; die Datensätze liegen als CSV mit Datenwörterbuch bei. Wo Zahlen für 2026 noch nicht publiziert sind, werden die letzten Ganzjahreswerte verwendet und entsprechend gekennzeichnet. Die App selbst kommt ohne Fremdbibliotheken aus: handgebaute SVG-Diagramme mit Tastaturnavigation, Tabellenansicht für jedes Diagramm und ein Farbsystem, das für Farbfehlsichtigkeit in Hell- und Dunkelmodus validiert ist.</p>",
      sourcesTitle: "Quellenverzeichnis",
    },
    about: {
      kicker: "07 · Über mich",
      title: "Über den Analysten",
      name: "Jeel Swami",
      p1: "Physiker und Data Scientist auf dem Weg in die Energieberatung. Mich interessieren Probleme, in denen Regulierung, Technik und Kapital aufeinandertreffen — das deutsche Stromnetz in einem Satz.",
      p2: "Mein Hintergrund ist rechnerisch: Monte-Carlo-Simulation von Vielteilchensystemen, ML-Pipelines für Materialforschung, Open-Data-Dashboards. Diese Fallstudie überträgt dieselbe Disziplin — belegte Daten, reproduzierbare Analysen, transparente Modelle — auf Versorgerstrategie.",
      p3: "Ich arbeite auf Deutsch und Englisch (und habe mir auf dem Weg zu C1 einen eigenen Vokabeltrainer gebaut). Wenn diese Analyse für Ihr Team nützlich ist: Ich freue mich über eine Nachricht.",
      link1: "<strong>Dieses Projekt</strong> — <a href='https://github.com/JeelSwami/energiewende-decoded' target='_blank' rel='noopener'>github.com/JeelSwami/energiewende-decoded</a>",
      link2: "<strong>EU-Förderdashboard NRW</strong> — <a href='https://github.com/JeelSwami/nrw-funding-dashboard' target='_blank' rel='noopener'>CORDIS/Eurostat-Daten, interaktiv</a>",
      link3: "<strong>Materialinformatik-ML</strong> — <a href='https://github.com/JeelSwami/Materials-Band-Gap-Prediction-ML-' target='_blank' rel='noopener'>Bandlücken-Vorhersage aus Atomdeskriptoren</a>",
      link4: "<strong>Kontakt</strong> — <a href='mailto:jeelswamis@gmail.com'>jeelswamis@gmail.com</a> · <a href='https://github.com/JeelSwami' target='_blank' rel='noopener'>@JeelSwami</a>",
    },
    footer: {
      left: "© 2026 Jeel Swami · MIT-Lizenz · Unabhängige Analyse, mit keinem der genannten Unternehmen verbunden.",
      right: "Datenstand: August 2026 · Von Hand gebaut — ganz ohne Chart-Bibliotheken.",
    },
    charts: {
      resShare: {
        title: "Erneuerbaren-Anteil am Stromverbrauch",
        sub: "Anteil am Bruttostromverbrauch, Deutschland, % — gegen das 80-%-Ziel für 2030",
        note: "Quelle: UBA/AGEB via Agora Energiewende, Jahresauswertungen; 2025 laut Agora „Die Energiewende in Deutschland: Stand der Dinge 2025“.",
      },
      genMix: {
        title: "Woher der deutsche Strom 2025 kam",
        sub: "Öffentliche Nettostromerzeugung, TWh",
        note: "Quelle: Fraunhofer ISE Energy-Charts, Jahresauswertung 2025 (~419,5 TWh öffentliche Nettoerzeugung; Erneuerbare 55,9 %).",
        renewable: "Erneuerbar",
        fossil: "Fossil & Sonstige",
        wind_onshore: "Wind an Land",
        wind_offshore: "Wind auf See",
        solar: "Photovoltaik",
        biomass: "Biomasse",
        hydro: "Wasserkraft",
        lignite: "Braunkohle",
        hard_coal: "Steinkohle",
        natural_gas: "Erdgas",
        other: "Sonstige",
      },
      capacity: {
        title: "Der Ausbau: installierte Leistung",
        sub: "Gigawatt installiert, Jahresende",
        note: "Quelle: Bundesnetzagentur / Fraunhofer ISE Energy-Charts.",
        solar: "Photovoltaik",
        windOn: "Wind an Land",
        windOff: "Wind auf See",
      },
      redispatch: {
        title: "Was Engpässe kosten",
        sub: "Engpassmanagement (Redispatch, Einspeisemanagement u. a.), Mrd. € pro Jahr",
        note: "Quelle: Engpassmanagement-Berichte der Bundesnetzagentur. Kumuliert 2019–2025: 18,4 Mrd. € (berechnet in der Analyseschicht des Repos).",
      },
      negPrices: {
        title: "Stunden unter null",
        sub: "Stunden mit negativen Day-Ahead-Großhandelspreisen pro Jahr",
        note: "Quelle: Fraunhofer ISE / FfE, EPEX-Day-Ahead-Daten. Korrelation mit installierter Solarleistung: Pearson r = 0,82 (siehe analysis/).",
      },
      heatPumps: {
        title: "Wärmepumpen: Einbruch und Erholung",
        sub: "Verkaufte Heizungswärmepumpen in Deutschland, Tsd. Stück pro Jahr",
        note: "Quelle: Bundesverband Wärmepumpe (BWP). 2025: 299 Tsd. (+55 %) — erstmals mehr Wärmepumpen als Gaskessel verkauft.",
      },
      ev: {
        title: "E-Autos: Delle und Rekord",
        sub: "Neuzulassungen batterieelektrischer Pkw in Deutschland, Tsd. pro Jahr",
        note: "Quelle: Kraftfahrt-Bundesamt (KBA). Bestand über 2 Millionen zum 1. Januar 2026.",
      },
      eonSegments: {
        title: "E.ON 2025: wo das Geld verdient wird",
        sub: "Bereinigtes EBITDA nach Segment, Mrd. €",
        note: "Quelle: E.ON Jahresergebnis 2025 (EQS/Investegate, März 2026). Investitionen 2025: Netze 7,0 Mrd. € · Vertrieb ~0,5 Mrd. € · Infrastructure Solutions ~0,9 Mrd. €.",
        networks: "Energienetze",
        retail: "Energievertrieb",
        eis: "Infrastructure Solutions",
      },
      eonPath: {
        title: "Der Verzinsungspfad",
        sub: "Bereinigtes Konzern-EBITDA, Mrd. € — Istwerte und Unternehmensziele",
        note: "Quelle: E.ON Jahresergebnis 2025 & Guidance; 2026e = Guidance-Mittelwert, 2028t/2030t = Unternehmensziele (>11,3 Mrd. € / ~13 Mrd. €).",
        actual: "Ist",
        target: "Guidance / Ziel",
      },
    },
    kpis: {
      hero: [
        { label: "Erneuerbaren-Anteil am Verbrauch 2025", value: "55,1", unit: "%" },
        { label: "Stunden mit Negativpreisen 2025", value: "573", unit: "h", delta: "Rekord — nach 457 im Jahr 2024" },
        { label: "Netzinvestitionsbedarf bis 2045", value: "360+", unit: "Mrd. €", delta: "BNetzA-basierte Schätzung" },
        { label: "Batterieprojekte in der Anschluss-Warteschlange", value: ">500", unit: "GW", delta: "vs. ~80 GW Jahreshöchstlast" },
      ],
      bottleneck: [
        { label: "Speicher-Anfragen (BDEW-Abfrage 2025)", value: ">720", unit: "GW" },
        { label: "Großspeicher tatsächlich in Betrieb", value: "≈2,5", unit: "GW", delta: "Ende 2025" },
        { label: "Rechenzentrums-Anfragen bei einem E.ON-VNB", value: "16,8", unit: "GW", delta: "Mitnetz Strom, 90 Projekte" },
        { label: "VNB-Investitionsbedarf bis 2033", value: "≈110", unit: "Mrd. €" },
      ],
      eon: [
        { label: "Bereinigtes EBITDA 2025", value: "9,8", unit: "Mrd. €", delta: "+9 % vs. 2024", deltaGood: true },
        { label: "Investitionsplan 2026–2030", value: "48", unit: "Mrd. €" },
        { label: "Vertriebskunden in Europa", value: "46,8", unit: "Mio." },
        { label: "Betriebenes Netz in Deutschland", value: "700 Tsd.", unit: "km", delta: "~110 GW Erneuerbare angeschlossen" },
      ],
    },
  };

  /* ---------------- charts ---------------- */

  function charts(h) {
    const t = h.t;
    const specs = [];

    if (D.resShare) {
      specs.push({
        id: "chart-res-share",
        titleKey: "charts.resShare.title",
        subKey: "charts.resShare.sub",
        noteKey: "charts.resShare.note",
        render: h.line({
          labels: D.resShare.years.map(String),
          series: [{ name: t("charts.resShare.title"), values: D.resShare.values, colorIdx: 0, area: true }],
          unit: "%", dec: 1, yMax: 100,
          targetLine: { value: 80, label: "80% · 2030" },
          ariaLabel: t("charts.resShare.title"),
        }),
        table: {
          headers: ["", ...D.resShare.years.map(String)],
          rows: [["%", ...D.resShare.values.map((v) => h.fmt(v, 1))]],
        },
      });
    }

    if (D.genMix) {
      specs.push({
        id: "chart-gen-mix",
        titleKey: "charts.genMix.title",
        subKey: "charts.genMix.sub",
        noteKey: "charts.genMix.note",
        render: h.hbars({
          items: D.genMix.map((g) => ({
            label: t("charts.genMix." + g.key) || g.label, value: g.twh,
            colorIdx: g.renewable ? 0 : 1,
            note: g.renewable ? t("charts.genMix.renewable") : t("charts.genMix.fossil"),
          })),
          unit: "TWh", dec: 0,
          legend: [
            { label: t("charts.genMix.renewable"), colorIdx: 0 },
            { label: t("charts.genMix.fossil"), colorIdx: 1 },
          ],
          ariaLabel: t("charts.genMix.title"),
        }),
        table: {
          headers: [t("charts.genMix.title"), "TWh"],
          rows: D.genMix.map((g) => [t("charts.genMix." + g.key) || g.label, h.fmt(g.twh, 1)]),
        },
      });
    }

    if (D.capacity) {
      specs.push({
        id: "chart-capacity",
        titleKey: "charts.capacity.title",
        subKey: "charts.capacity.sub",
        noteKey: "charts.capacity.note",
        render: h.line({
          labels: D.capacity.years.map(String),
          series: [
            { name: t("charts.capacity.solar"), values: D.capacity.solar, colorIdx: 0 },
            { name: t("charts.capacity.windOn"), values: D.capacity.windOn, colorIdx: 1 },
            { name: t("charts.capacity.windOff"), values: D.capacity.windOff, colorIdx: 2 },
          ],
          unit: "GW", dec: 0,
          ariaLabel: t("charts.capacity.title"),
        }),
        table: {
          headers: ["", ...D.capacity.years.map(String)],
          rows: [
            [t("charts.capacity.solar"), ...D.capacity.solar.map((v) => h.fmt(v, 0))],
            [t("charts.capacity.windOn"), ...D.capacity.windOn.map((v) => h.fmt(v, 0))],
            [t("charts.capacity.windOff"), ...D.capacity.windOff.map((v) => h.fmt(v, 0))],
          ],
        },
      });
    }

    if (D.redispatch) {
      specs.push({
        id: "chart-redispatch",
        titleKey: "charts.redispatch.title",
        subKey: "charts.redispatch.sub",
        noteKey: "charts.redispatch.note",
        render: h.columns({
          labels: D.redispatch.years.map(String),
          series: [{ name: t("charts.redispatch.title"), values: D.redispatch.costBn, colorIdx: 0 }],
          unit: h.t("sim.out.capexUnit"), dec: 1,
          ariaLabel: t("charts.redispatch.title"),
        }),
        table: {
          headers: ["", ...D.redispatch.years.map(String)],
          rows: [[t("sim.out.capexUnit"), ...D.redispatch.costBn.map((v) => h.fmt(v, 1))]],
        },
      });
    }

    if (D.negPrices) {
      specs.push({
        id: "chart-negative-prices",
        titleKey: "charts.negPrices.title",
        subKey: "charts.negPrices.sub",
        noteKey: "charts.negPrices.note",
        render: h.columns({
          labels: D.negPrices.years.map(String),
          series: [{ name: t("charts.negPrices.title"), values: D.negPrices.hours, colorIdx: 0 }],
          unit: "h", dec: 0,
          ariaLabel: t("charts.negPrices.title"),
        }),
        table: {
          headers: ["", ...D.negPrices.years.map(String)],
          rows: [["h", ...D.negPrices.hours.map((v) => h.fmt(v, 0))]],
        },
      });
    }

    if (D.heatPumps) {
      specs.push({
        id: "chart-heatpumps",
        titleKey: "charts.heatPumps.title",
        subKey: "charts.heatPumps.sub",
        noteKey: "charts.heatPumps.note",
        render: h.columns({
          labels: D.heatPumps.years.map(String),
          series: [{ name: t("charts.heatPumps.title"), values: D.heatPumps.salesK, colorIdx: 0 }],
          unit: "k", dec: 0,
          ariaLabel: t("charts.heatPumps.title"),
        }),
        table: {
          headers: ["", ...D.heatPumps.years.map(String)],
          rows: [["k", ...D.heatPumps.salesK.map((v) => h.fmt(v, 0))]],
        },
      });
    }

    if (D.ev) {
      specs.push({
        id: "chart-ev",
        titleKey: "charts.ev.title",
        subKey: "charts.ev.sub",
        noteKey: "charts.ev.note",
        render: h.columns({
          labels: D.ev.years.map(String),
          series: [{ name: t("charts.ev.title"), values: D.ev.regK, colorIdx: 0 }],
          unit: "k", dec: 0,
          ariaLabel: t("charts.ev.title"),
        }),
        table: {
          headers: ["", ...D.ev.years.map(String)],
          rows: [["k", ...D.ev.regK.map((v) => h.fmt(v, 0))]],
        },
      });
    }

    specs.push({
      id: "chart-eon-segments",
      titleKey: "charts.eonSegments.title",
      subKey: "charts.eonSegments.sub",
      noteKey: "charts.eonSegments.note",
      render: h.hbars({
        items: D.eonSegments.map((s) => ({
          label: t("charts.eonSegments." + s.key), value: s.ebitda, colorIdx: 0,
          note: "EBITDA",
        })),
        unit: t("sim.out.capexUnit"), dec: 2,
        ariaLabel: t("charts.eonSegments.title"),
      }),
      table: {
        headers: ["Segment", "EBITDA (" + t("sim.out.capexUnit") + ")", "Invest 2025 (" + t("sim.out.capexUnit") + ")"],
        rows: D.eonSegments.map((s) => [t("charts.eonSegments." + s.key), h.fmt(s.ebitda, 2), h.fmt(s.invest, 2)]),
      },
    });

    specs.push({
      id: "chart-eon-capex",
      titleKey: "charts.eonPath.title",
      subKey: "charts.eonPath.sub",
      noteKey: "charts.eonPath.note",
      render: h.columns({
        labels: D.eonPath.labels,
        series: [
          { name: t("charts.eonPath.actual"), values: D.eonPath.actual, colorIdx: 0 },
          { name: t("charts.eonPath.target"), values: D.eonPath.target, colorIdx: 2 },
        ],
        unit: t("sim.out.capexUnit"), dec: 1,
        ariaLabel: t("charts.eonPath.title"),
      }),
      table: {
        headers: ["", ...D.eonPath.labels],
        rows: [
          [t("charts.eonPath.actual"), ...D.eonPath.actual.map((v) => (v == null ? "–" : h.fmt(v, 1)))],
          [t("charts.eonPath.target"), ...D.eonPath.target.map((v) => (v == null ? "–" : h.fmt(v, 1)))],
        ],
      },
    });

    return specs;
  }

  /* ---------------- KPI rows ---------------- */

  function kpiRows(h) {
    const rows = h.t("kpis");
    return [
      { id: "hero-kpis", tiles: rows.hero },
      { id: "bottleneck-kpis", tiles: rows.bottleneck },
      { id: "eon-kpis", tiles: rows.eon },
    ];
  }

  /* ---------------- simulator ---------------- */

  const sim = {
    params: [
      { key: "ev", min: 0, max: 12, step: 0.5, def: 5, dec: 1 },
      { key: "hp", min: 0, max: 4, step: 0.25, def: 1.5, dec: 2 },
      { key: "dc", min: 0, max: 5, step: 0.1, def: 2.0, dec: 1 },
      { key: "flex", min: 0, max: 100, step: 5, def: 30, dec: 0 },
    ],
    scenarios: {
      base: { ev: 5, hp: 1.5, dc: 2.0, flex: 30 },
      policy: { ev: 10, hp: 3, dc: 2.1, flex: 60 },
      slow: { ev: 2.5, hp: 0.75, dc: 1.2, flex: 15 },
    },
    model(s) {
      const flex = s.flex / 100;
      const gEV = 0.20 * (1 - 0.6 * flex);        // coincidence, home charging
      const gHP = 0.75 * (1 - 0.4 * flex);        // cold-snap coincidence, §14a-bounded
      const evGW = s.ev * 11 * gEV;               // millions × kW → GW
      const hpGW = s.hp * 2.8 * gHP;
      const dcGW = s.dc * 0.9;
      const peakGW = evGW + hpGW + dcGW;
      const energyTWh = s.ev * 2.5 + s.hp * 4.5 + s.dc * 8.76 * 0.8;
      const capexBn = peakGW * 2.8;
      return {
        peakGW, energyTWh, capexBn,
        peakVsToday: (peakGW / 79) * 100,
        contributions: [
          { key: "ev", gw: evGW },
          { key: "hp", gw: hpGW },
          { key: "dc", gw: dcGW },
        ],
      };
    },
  };

  /* ---------------- sources ---------------- */

  const sources = [
    { name: "Bundesnetzagentur / SMARD — annual electricity market data", url: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2026/20260104_SMARD.html", desc: { en: "generation, consumption, prices, negative-price hours", de: "Erzeugung, Verbrauch, Preise, Negativpreis-Stunden" } },
    { name: "Agora Energiewende — Die Energiewende in Deutschland: Stand der Dinge 2025", url: "https://www.agora-energiewende.de/fileadmin/Projekte/2025/2025-28_DE_JAW25/A-EW_391_Die_Energiewende_in_Deutschland_Stand_der_Dinge_2025_WEB.pdf", desc: { en: "annual review: renewables share, emissions, policy", de: "Jahresauswertung: EE-Anteil, Emissionen, Politik" } },
    { name: "Fraunhofer ISE — Energy-Charts", url: "https://www.energy-charts.info/", desc: { en: "public net electricity generation and installed capacity", de: "öffentliche Nettostromerzeugung und installierte Leistung" } },
    { name: "Bundesnetzagentur — NEST determinations (Dec 2025)", url: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2025/20251210_NEST.html", desc: { en: "new framework for grid regulation and returns", de: "neuer Rahmen für Netzregulierung und -verzinsung" } },
    { name: "Bundesnetzagentur — equity returns for new investments (Jan 2024)", url: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2024/20240124_EKZins.html", desc: { en: "base rate + 3% risk premium on new grid capex", de: "Basiszins + 3 % Risikoprämie für neue Netzinvestitionen" } },
    { name: "E.ON — FY2025 results (EQS via Investegate)", url: "https://www.investegate.co.uk/announcement/eqs/e-on-ag--0mpp/eqs-news-e-on-continues-growth-path-in-2025-/9445200", desc: { en: "EBITDA €9.8bn, segments, €48bn plan, dividend", de: "EBITDA 9,8 Mrd. €, Segmente, 48-Mrd.-Plan, Dividende" } },
    { name: "E.ON — H1 2025 results overview (Investing.com)", url: "https://www.investing.com/news/company-news/eon-h1-2025-slides-13-ebitda-growth-driven-by-network-expansion-guidance-confirmed-93CH-4187088", desc: { en: "2028 targets, RAB, dividend policy", de: "Ziele 2028, RAB, Dividendenpolitik" } },
    { name: "envelio — E.ON's digital twin of the German distribution grid", url: "https://envelio.com/insights/eon-digital-twin-german-distribution-grid", desc: { en: "700,000 km, 55m components, 410k requests/yr", de: "700.000 km, 55 Mio. Betriebsmittel, 410 Tsd. Anträge/Jahr" } },
    { name: "E.ON — one million smart meters (Enlit / SolarQuarter)", url: "https://www.enlit.world/library/eon-first-energy-company-to-reach-one-million-smart-meters-in-germany", desc: { en: "first German utility past 1m smart meters, ~30% rollout", de: "erster deutscher Versorger über 1 Mio. Smart Meter, ~30 % Quote" } },
    { name: "Eurelectric — grid connections & the queue (Birnbaum)", url: "https://www.eurelectric.org/in-detail/what-are-grid-connections-and-how-europe-can-fix-the-queue/", desc: { en: "5.7m connections 2024–2030, 'every seven seconds'", de: "5,7 Mio. Anschlüsse 2024–2030, „alle sieben Sekunden“" } },
    { name: "CyrusOne & E.ON — Frankfurt data-center partnership", url: "https://www.cyrusone.com/resources/press-releases/cyrusone-and-e.on-announce-strategic-partnership-to-overcome-data-center-grid-capacity-constraints-for-customers-in-europe", desc: { en: "61 MW on-site generation for FRA7 by 2029", de: "61 MW lokale Erzeugung für FRA7 bis 2029" } },
    { name: "pv magazine — battery connection requests exceed 500 GW", url: "https://www.pv-magazine.com/2025/09/02/germany-battery-storage-grid-connection-requests-exceed-500-gw/", desc: { en: "the storage queue vs. ~80 GW peak load", de: "die Speicher-Warteschlange vs. ~80 GW Höchstlast" } },
    { name: "ESS News — BDEW survey: >720 GW requested; 2.5 GW operating", url: "https://www.ess-news.com/2026/02/20/too-many-batteries-not-enough-grid-germanys-battery-storage-sector-wants-fixes-for-connection-waits/", desc: { en: "queue reform debate (Reifegradverfahren)", de: "Debatte zur Warteschlangenreform (Reifegradverfahren)" } },
    { name: "zfk / Mitnetz — data-center connection requests", url: "https://www.stadt-und-werk.de/k21-meldungen/anschluss-von-rechenzentrum/", desc: { en: "90 requests, 16.8 GW at one E.ON DSO", de: "90 Anfragen, 16,8 GW bei einem E.ON-VNB" } },
    { name: "Clean Energy Wire — €651bn grid investment estimate to 2045", url: "https://www.cleanenergywire.org/news/electricity-grid-upgrades-will-cost-germany-650-billion-euros-2045-report", desc: { en: "transmission €328bn + distribution €323bn", de: "Übertragung 328 + Verteilung 323 Mrd. €" } },
    { name: "Clean Energy Wire — DSOs need €110bn by 2033", url: "https://www.cleanenergywire.org/news/germany-must-invest-eu110-bln-expanding-electricity-local-distribution-grids-2033-agency", desc: { en: "distribution-grid needs per BNetzA", de: "Verteilnetzbedarf laut BNetzA" } },
    { name: "BDEW — Starke Netze (distribution investment need)", url: "https://www.bdew.de/energie/starke-netze-starke-zukunft/", desc: { en: "€323bn to 2045; 34,500/262,200/526,000 km build-out", de: "323 Mrd. € bis 2045; 34.500/262.200/526.000 km Ausbau" } },
    { name: "KfW/PwC — the utilities' financing gap", url: "https://www.kfw.de/%C3%9Cber-die-KfW/Newsroom/Aktuelles/Pressemitteilungen-Details_869248.html", desc: { en: "€535bn need, €346bn gap by 2045", de: "535 Mrd. € Bedarf, 346 Mrd. € Lücke bis 2045" } },
    { name: "Bundesregierung — 2026 transmission-fee subsidy (€6.5bn)", url: "https://www.bundesregierung.de/breg-de/aktuelles/niedrigere-netzentgelte-2382396", desc: { en: "average transmission charge −57% for 2026", de: "durchschnittliches Übertragungsnetzentgelt −57 % für 2026" } },
    { name: "S&P Global — German solar capture price below €20/MWh", url: "https://www.spglobal.com/commodity-insights/en/news-research/latest-news/electric-power/061025-german-solar-capture-price-sinks-below-eur20mwh-in-may-as-cannibalization-deflates-value", desc: { en: "cannibalization of solar market value", de: "Kannibalisierung des Solar-Marktwerts" } },
    { name: "FfE — German electricity prices on the EPEX Spot exchange in 2025", url: "https://www.ffe.de/en/publications/german-electricity-prices-on-the-epex-spot-exchange-in-2025/", desc: { en: "573 negative-price hours in 2025 (record)", de: "573 Negativpreis-Stunden 2025 (Rekord)" } },
    { name: "Fraunhofer ISE — public electricity generation 2025", url: "https://www.ise.fraunhofer.de/en/press-media/press-releases/2026/german-public-electricity-generation-in-2025-wind-and-solar-power-take-the-lead.html", desc: { en: "2025 generation mix; wind & solar take the lead", de: "Erzeugungsmix 2025; Wind & Solar erstmals vorn" } },
    { name: "BMWK / AGEE-Stat — renewables time series", url: "https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Downloads/Energie/zeitreihen-zur-entwicklung-der-erneuerbaren-energien-in-deutschland-1990-2024.pdf", desc: { en: "renewables share of gross consumption 2015–2024", de: "EE-Anteil am Bruttostromverbrauch 2015–2024" } },
    { name: "BWP — heat pump sales statistics", url: "https://www.waermepumpe.de/presse/zahlen-daten/absatzzahlen/", desc: { en: "annual heat pump sales; 2025: 299k (+55%)", de: "Wärmepumpen-Absatz; 2025: 299 Tsd. (+55 %)" } },
    { name: "KBA — battery-electric vehicle registrations", url: "https://www.kba.de/DE/Presse/Pressemitteilungen/AlternativeAntriebe/2026/pm03_2026_Antriebe_12_25_komplett.html", desc: { en: "BEV new registrations; stock >2m on 1 Jan 2026", de: "BEV-Neuzulassungen; Bestand >2 Mio. am 1.1.2026" } },
    { name: "BDEW — Strompreisanalyse (January 2026)", url: "https://www.bdew.de/service/daten-und-grafiken/bdew-strompreisanalyse/", desc: { en: "household electricity price and its components", de: "Haushaltsstrompreis und seine Bestandteile" } },
    { name: "pv magazine — smart meter rollout passes the 20% mark", url: "https://www.pv-magazine.de/2025/12/29/smart-meter-rollout-erreicht-20-prozent-marke-bei-pflichteinbaufaellen/", desc: { en: "Germany-wide rollout status end-2025", de: "bundesweiter Rollout-Stand Ende 2025" } },
    { name: "Clean Energy Wire — electrolysis ramp-up lagging", url: "https://www.cleanenergywire.org/news/ramp-germanys-green-hydrogen-electrolyser-capacity-continues-lag-behind", desc: { en: "181 MW installed vs. 10 GW target", de: "181 MW installiert vs. 10-GW-Ziel" } },
    { name: "ESIG — Germany's §14a EnWG explained", url: "https://www.esig.energy/germanys-paragraph-14a-enwg/", desc: { en: "dimming controllable loads to 4.2 kW minimum", de: "Dimmen steuerbarer Lasten auf mind. 4,2 kW" } },
    { name: "Bitkom — data centers in Germany", url: "https://www.bitkom.org/Presse/Presseinformation/Rechenzentren-Deutschland-KI-treibt-Wachstum", desc: { en: "IT capacity 2.7 → ~4.8 GW by 2030", de: "IT-Anschlussleistung 2,7 → ~4,8 GW bis 2030" } },
    { name: "IEA — Energy and AI", url: "https://www.iea.org/reports/energy-and-ai/executive-summary", desc: { en: "global data-centre demand ~945 TWh by 2030", de: "globale Rechenzentrums-Nachfrage ~945 TWh bis 2030" } },
    { name: "Roland Berger — The golden age of the utility", url: "https://www.rolandberger.com/en/Insights/Publications/The-golden-age-of-the-utility.html", desc: { en: "only 55% of top utilities can finance the transformation", de: "nur 55 % der Top-Versorger können die Transformation finanzieren" } },
    { name: "BCG — Europe's electricity TSOs: capital challenges", url: "https://www.bcg.com/publications/2025/navigating-growth-capital-challenges-and-strategic-decisions-for-europes-electricity-tsos", desc: { en: "€345bn capex on a €175bn asset base", de: "345 Mrd. € Capex auf 175 Mrd. € Anlagenbasis" } },
    { name: "McKinsey via CEW — right-sizing the build-out", url: "https://www.cleanenergywire.org/news/reduced-electricity-demand-could-slash-germanys-transition-investments-2035-report", desc: { en: "demand realism could cut system investment up to 45%", de: "Nachfragerealismus könnte Systeminvestitionen um bis zu 45 % senken" } },
    { name: "Consentec — heat pumps & e-mobility in distribution grids (et 2020)", url: "https://consentec.de/app/uploads/2024/02/PDF_et_12_2020_S.41-44.pdf", desc: { en: "coincidence factors for the simulator model", de: "Gleichzeitigkeitsfaktoren für das Simulationsmodell" } },
    { name: "ZVEI — heat pump guide (2023)", url: "https://www.zvei.org/fileadmin/user_upload/Presse_und_Medien/Publikationen/2023/Februar/ZVEI-Leitfaden_Waermepumpe/ZVEI-Leitfaden_Waermepumpen_Langversion_final_02-2023.pdf", desc: { en: "electrical connection loads of heat pumps", de: "elektrische Anschlussleistungen von Wärmepumpen" } },
    { name: "Probst — impact of e-mobility on distribution grids (Diss., Stuttgart)", url: "https://www.ieh.uni-stuttgart.de/dokumente/dissertationen/Diss_Probst.pdf", desc: { en: "EV charging coincidence modelling", de: "Modellierung der Ladegleichzeitigkeit von E-Autos" } },
    { name: "Bundesnetzagentur — 2023 electricity market review (peak load)", url: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2024/20240103_SMARD.html", desc: { en: "national peak load ~79 GW", de: "Jahreshöchstlast ~79 GW" } },
    { name: "European Commission — merger decision M.8871 (E.ON/innogy)", url: "https://ec.europa.eu/competition/mergers/cases/decisions/m8871_2573_3.pdf", desc: { en: "the 2018–2020 E.ON/RWE asset swap", de: "der E.ON/RWE-Asset-Tausch 2018–2020" } },
  ];

  window.CONTENT = { i18n: { en, de }, charts, kpiRows, sim, sources };
})();
