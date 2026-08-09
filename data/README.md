# Data dictionary

Every dataset used in the case study, with its source and known caveats. All figures are the latest available as of **August 2026**. Values were compiled from the sources below in August 2026; the app (`docs/content.js`) embeds the same numbers.

## Files

### `renewables_share.csv` — Renewables share of gross electricity consumption (%)
| Column | Description |
|---|---|
| `year` | Calendar year (2015–2025) |
| `share_pct` | Renewables share of gross electricity consumption, % |

**Sources:** [BMWK / AGEE-Stat time series](https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Downloads/Energie/zeitreihen-zur-entwicklung-der-erneuerbaren-energien-in-deutschland-1990-2024.pdf) (2015–2024), [UBA](https://www.umweltbundesamt.de/themen/erneuerbare-energien-in-deutschland-wachstum-2025), [Agora Energiewende, "Die Energiewende in Deutschland: Stand der Dinge 2025"](https://www.agora-energiewende.de/fileadmin/Projekte/2025/2025-28_DE_JAW25/A-EW_391_Die_Energiewende_in_Deutschland_Stand_der_Dinge_2025_WEB.pdf) (2025: 55.1%).
**Caveat:** distinct from Fraunhofer ISE's "share of public net generation" (55.9% in 2025) — different denominator.

### `generation_mix_2025.csv` — Public net electricity generation, 2025 (TWh)
| Column | Description |
|---|---|
| `source` | Generation technology |
| `twh` | Public net generation, TWh |
| `renewable` | 1 = renewable, 0 = fossil/other |

**Source:** [Fraunhofer ISE Energy-Charts, annual evaluation 2025](https://www.ise.fraunhofer.de/en/press-media/press-releases/2026/german-public-electricity-generation-in-2025-wind-and-solar-power-take-the-lead.html). Total ≈419.5 TWh; solar and biomass figures are public-grid feed-in (totals incl. self-consumption are higher: solar 87 TWh, biomass 41 TWh). `other` is the residual to the reported total.

### `installed_capacity.csv` — Installed capacity, end of year (GW)
| Column | Description |
|---|---|
| `year` | 2018–2025 |
| `solar_gw`, `wind_onshore_gw`, `wind_offshore_gw` | Installed capacity, GW |

**Sources:** Marktstammdatenregister/Bundesnetzagentur-based series via [Photovoltaik in Deutschland](https://de.wikipedia.org/wiki/Photovoltaik_in_Deutschland) and [Windenergie in Deutschland](https://de.wikipedia.org/wiki/Windenergie_in_Deutschland). Battery storage context: ~26 GWh cumulative by end-2025 ([BSW-Solar](https://www.solarwirtschaft.de/2026/01/12/batteriespeicherkapazitaet-binnen-5-jahren-verfuenffacht/)).

### `redispatch.csv` — Congestion management cost (€m)
| Column | Description |
|---|---|
| `year` | 2019–2025 |
| `cost_meur` | Total congestion management (redispatch, countertrading, curtailment compensation), € million |

**Sources:** Bundesnetzagentur figures via [energie-und-management.de](https://www.energie-und-management.de/nachrichten/recht/detail/mehr-redispatchkosten-trotz-stabiler-eingriffe-357846), [iwr.de (2025)](https://www.iwr.de/news/netzengpassmanagement-2025-stromnetz-stabil-kosten-leicht-gestiegen-bei-hohem-ausbau-erneuerbarer-energien-news39599), [energie-chronik.de (2022)](https://www.energie-chronik.de/231009.htm).
**Caveat:** yearly definitions vary slightly (redispatch-only vs. total Netzengpassmanagement); values here are the total-cost series rounded to €0.05bn.

### `negative_prices.csv` — Hours with negative day-ahead prices
| Column | Description |
|---|---|
| `year` | 2019–2025 |
| `hours` | Hours with negative day-ahead wholesale prices (DE-LU bidding zone) |

**Sources:** [FfE, "German electricity prices on the EPEX Spot exchange in 2025"](https://www.ffe.de/en/publications/german-electricity-prices-on-the-epex-spot-exchange-in-2025/), [pv-magazine.de](https://www.pv-magazine.de/2025/08/25/rekord-von-457-negativen-boersenstrompreisstunden-aus-vorjahr-eingestellt/), Fraunhofer ISE.
**Caveats:** 2022 sources range 69–77 h (69 used); 2023 sources range 301–~399 (301 used, Statista-sourced); 2025 sources converge on 573–575 (573 used). A widely-circulated "~1,100 hours in 2025" figure could **not** be confirmed against primary sources and is not used.

### `electrification.csv` — Heat pumps & battery-electric vehicles
| Column | Description |
|---|---|
| `year` | 2020–2025 |
| `heat_pump_sales_k` | Heating heat pumps sold, thousand units ([BWP](https://www.waermepumpe.de/presse/zahlen-daten/absatzzahlen/)) |
| `bev_new_registrations_k` | New BEV passenger-car registrations, thousand ([KBA](https://www.kba.de/DE/Presse/Pressemitteilungen/AlternativeAntriebe/2026/pm03_2026_Antriebe_12_25_komplett.html)) |

**Context:** 2025 heat-pump sales +55% (market share 48.7% — first year ahead of gas boilers); BEV stock passed 2 million on 1 Jan 2026.

### `electricity_prices.csv` — Household electricity price (ct/kWh)
| Column | Description |
|---|---|
| `year` | 2015–2025 |
| `household_ct_kwh` | Average household electricity price, ct/kWh |

**Source:** [BDEW Strompreisanalyse](https://www.bdew.de/service/daten-und-grafiken/bdew-strompreisanalyse/). 2025 network-charge share: ~11 ct/kWh ≈ 28% of the total.

### `eon_financials.csv` — E.ON key figures
Long-format `metric, segment_or_year, value, unit, source` table of E.ON FY2025 reporting: group and segment adjusted EBITDA, investments, the €48bn 2026–2030 plan, guidance/targets, customers, grid length, smart meters, dividend.
**Primary source:** [E.ON FY2025 results (EQS via Investegate, March 2026)](https://www.investegate.co.uk/announcement/eqs/e-on-ag--0mpp/eqs-news-e-on-continues-growth-path-in-2025-/9445200); grid/digital-twin figures per [envelio](https://envelio.com/insights/eon-digital-twin-german-distribution-grid).
**Caveat:** FY2024 group EBITDA (€9.0bn) is derived from the reported +9% FY2025 growth; E.ON does not disclose a consolidated regulated-asset-base € figure.

## Compilation notes

- Figures were researched top-down from primary sources (Bundesnetzagentur/SMARD, Fraunhofer ISE, Agora, BDEW, BWP, KBA, company reporting); trade-press values are used only where the primary PDF is paywalled or unpublished.
- Where sources disagree, the value closest to the primary reporter is used and the range is documented above.
- Derived statistics (trends, correlations, cumulative sums) are computed by [`analysis/energiewende_analysis.py`](../analysis/energiewende_analysis.py) — run it to reproduce every derived number quoted in the case study.
