# ⚡ Energiewende, decoded

**A bilingual (EN/DE), data-driven strategy case study of Germany's energy transition — and what it means for a grid-and-retail utility like E.ON.**

**Live app → [jeelswami.github.io/energiewende-decoded](https://jeelswami.github.io/energiewende-decoded/)**

[![Live demo](https://img.shields.io/badge/demo-GitHub%20Pages-2a78d6)](https://jeelswami.github.io/energiewende-decoded/)
[![Language](https://img.shields.io/badge/languages-EN%20%7C%20DE-eb6834)](#)
[![Python](https://img.shields.io/badge/analysis-Python%20%2B%20pandas-1baf7a)](analysis/)
[![License](https://img.shields.io/badge/license-MIT-52514e)](LICENSE)

---

## What this is

Germany is rebuilding its power system in real time: renewables covered a record 55.1% of demand in 2025, yet day-ahead prices went negative for a record 573 hours, congestion management cost €3.1bn that year, and battery-storage projects totalling **more than 500 GW** — several times the national peak load of ~80 GW — are queuing for grid connections. The bottleneck of the Energiewende has moved **from generation to the grid**.

This repository is an independent consulting-style analysis of that shift, built like I would build a client deliverable:

1. **📊 An interactive web app** ([`docs/`](docs/)) — hand-built SVG data visualizations (no chart libraries), a **grid-stress simulator** with a fully documented model, strategic recommendations, and a complete EN/DE language toggle. Dependency-free, accessible (keyboard navigation, table views for every chart, light/dark mode).
2. **🗃️ Sourced datasets** ([`data/`](data/)) — every number traced to a primary source: Bundesnetzagentur/SMARD, Fraunhofer ISE, Agora Energiewende, BDEW, KBA, company reports.
3. **🐍 A reproducible analysis layer** ([`analysis/`](analysis/)) — pandas + matplotlib scripts that derive the statistics quoted in the case study (trend vs. 2030 target, solar build-out vs. negative-price hours, congestion-cost trajectory).
4. **📄 A written case study** ([`CASE_STUDY.md`](CASE_STUDY.md)) — market context, an E.ON deep dive, and four quantified strategic plays.

> **Independence note:** This is a personal analysis based exclusively on public information. It is not affiliated with, endorsed by, or commissioned by E.ON SE or any other company mentioned. All trademarks belong to their owners.

## Why E.ON as the case

After the 2018–2020 asset swap with RWE, E.ON became Europe's largest distribution system operator and energy retailer — a pure play on exactly the two battlegrounds this analysis covers: **grids** (a €48bn investment programme for 2026–2030, a connection queue of hundreds of GW, a new regulatory framework from the Bundesnetzagentur) and **retail** (mandatory dynamic tariffs, smart-meter rollout, AI-driven customer operations). If you want to understand where the German energy system is going, E.ON's balance sheet is where the theory meets the money.

## The four strategic plays (preview)

| # | Play | The problem it answers |
|---|------|------------------------|
| 1 | **Clear the queue** | >500 GW of storage connection requests nationwide crowd out data centers and industry; maturity-gating and transparent hosting-capacity data turn a queue into a pipeline |
| 2 | **Finance the compounding machine** | Germany's grids need ~€360bn by 2045; utilities can self-fund only a fraction — capital partnerships and regulatory advocacy decide who builds |
| 3 | **Monetize flexibility at the edge** | 573 negative-price hours in 2025 and §14a EnWG make household flexibility (EVs, heat pumps, batteries) a monetizable asset for the first time |
| 4 | **Industrialize AI in operations** | Cost-to-serve, grid planning speed, and a skilled-labor shortage of >200,000 workers make AI adoption an infrastructure question, not an IT project |

Full argumentation with sources: [`CASE_STUDY.md`](CASE_STUDY.md) · interactive version: [live app](https://jeelswami.github.io/energiewende-decoded/).

## Repository structure

```
energiewende-decoded/
├── docs/               # Interactive app (GitHub Pages)
│   ├── index.html      #   structure — all copy rendered from content.js (EN/DE)
│   ├── styles.css      #   design system: validated palette, light/dark
│   ├── app.js          #   hand-rolled SVG chart engine + simulator
│   └── content.js      #   bilingual copy + every dataset with source
├── data/               # CSV datasets + data dictionary with sources
├── analysis/           # pandas/matplotlib: derived stats + figures
├── CASE_STUDY.md       # the written consulting deliverable
└── README.md
```

## Design & engineering choices

- **No dependencies.** Every chart is generated SVG with a small purpose-built engine: crosshair tooltips, keyboard navigation (arrow keys), selective direct labels, and a table-view twin for every chart (WCAG-friendly). No framework, no build step — view source and everything is there.
- **A validated color system.** The palette's categorical slots are checked for color-vision-deficiency separation (OKLab ΔE) in both light and dark mode; sequential scales are single-hue; text never wears data colors.
- **Transparent modelling.** The grid-stress simulator's every coefficient (charger power, coincidence factors, heat-pump loads, capex intensity) is documented in an in-app model card with sources — the same standard I'd apply to a client model.
- **Bilingual by design.** Every string, chart label, and tooltip switches between English and German — because the audience for German energy strategy speaks German.

## Run the analysis

```bash
cd analysis
pip install -r requirements.txt
python energiewende_analysis.py   # prints derived stats, writes figures/
```

## About me

Physics-trained data scientist heading into energy consulting. I like problems where regulation, engineering, and capital meet — which is the German power grid in one sentence. Related work: [EU research-funding dashboard for NRW](https://github.com/JeelSwami/nrw-funding-dashboard) · [materials-informatics ML pipeline](https://github.com/JeelSwami/Materials-Band-Gap-Prediction-ML-) · [German vocabulary trainer I built while working toward C1](https://github.com/JeelSwami/wortschatz-trainer).

📫 jeelswamis@gmail.com · GitHub [@JeelSwami](https://github.com/JeelSwami)
