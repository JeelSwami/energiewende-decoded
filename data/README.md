# Data dictionary

Every dataset used in the study, with its source and its known caveats. All figures are the latest available as of **August 2026**; I compiled them in August 2026 from the sources below, and the app (`docs/content.js`) embeds the same numbers. The data belongs to its original publishers. If you reuse it, credit them; if you reuse my compilation commercially, ask me first (see [LICENSE](../LICENSE)).

## Files

### `renewables_share.csv`: renewable share of gross electricity consumption (%)
| Column | Description |
|---|---|
| `year` | Calendar year, 2015 to 2025 |
| `share_pct` | Renewable share of gross electricity consumption, percent |

**Sources:** [BMWK / AGEE-Stat time series](https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Downloads/Energie/zeitreihen-zur-entwicklung-der-erneuerbaren-energien-in-deutschland-1990-2024.pdf) for 2015 to 2024, [UBA](https://www.umweltbundesamt.de/themen/erneuerbare-energien-in-deutschland-wachstum-2025), and [Agora Energiewende, "Die Energiewende in Deutschland: Stand der Dinge 2025"](https://www.agora-energiewende.de/fileadmin/Projekte/2025/2025-28_DE_JAW25/A-EW_391_Die_Energiewende_in_Deutschland_Stand_der_Dinge_2025_WEB.pdf) for the 2025 value of 55.1 percent.
**Caveat:** this metric is distinct from Fraunhofer ISE's share of public net generation (55.9 percent in 2025), which uses a different denominator. The FAQ of the study explains the difference.

### `generation_mix_2025.csv`: public net electricity generation, 2025 (TWh)
| Column | Description |
|---|---|
| `source` | Generation technology |
| `twh` | Public net generation, TWh |
| `renewable` | 1 = renewable, 0 = fossil or other |

**Source:** [Fraunhofer ISE Energy-Charts, annual evaluation 2025](https://www.ise.fraunhofer.de/en/press-media/press-releases/2026/german-public-electricity-generation-in-2025-wind-and-solar-power-take-the-lead.html). The total is about 419.5 TWh. Solar and biomass values are public grid feed-in; totals including self-consumption are higher (solar 87 TWh, biomass 41 TWh). The `other` row is the residual to the reported total.

### `installed_capacity.csv`: installed capacity at the end of each year (GW)
| Column | Description |
|---|---|
| `year` | 2018 to 2025 |
| `solar_gw`, `wind_onshore_gw`, `wind_offshore_gw` | Installed capacity, GW |

**Sources:** Marktstammdatenregister and Bundesnetzagentur figures as compiled in [Photovoltaik in Deutschland](https://de.wikipedia.org/wiki/Photovoltaik_in_Deutschland) and [Windenergie in Deutschland](https://de.wikipedia.org/wiki/Windenergie_in_Deutschland). For context, cumulative battery storage reached about 26 GWh by the end of 2025 ([BSW-Solar](https://www.solarwirtschaft.de/2026/01/12/batteriespeicherkapazitaet-binnen-5-jahren-verfuenffacht/)).

### `redispatch.csv`: congestion management cost (million euros)
| Column | Description |
|---|---|
| `year` | 2019 to 2025 |
| `cost_meur` | Total congestion management (redispatch, countertrading, curtailment compensation), million euros |

**Sources:** Bundesnetzagentur figures via [energie-und-management.de](https://www.energie-und-management.de/nachrichten/recht/detail/mehr-redispatchkosten-trotz-stabiler-eingriffe-357846), [iwr.de for 2025](https://www.iwr.de/news/netzengpassmanagement-2025-stromnetz-stabil-kosten-leicht-gestiegen-bei-hohem-ausbau-erneuerbarer-energien-news39599), and [energie-chronik.de for 2022](https://www.energie-chronik.de/231009.htm).
**Caveat:** the yearly definitions vary slightly between redispatch-only and total congestion management; this series is the total cost, rounded to 50 million euros.

### `negative_prices.csv`: hours with negative day-ahead prices
| Column | Description |
|---|---|
| `year` | 2019 to 2025 |
| `hours` | Hours with negative day-ahead wholesale prices, DE-LU bidding zone |

**Sources:** [FfE, "German electricity prices on the EPEX Spot exchange in 2025"](https://www.ffe.de/en/publications/german-electricity-prices-on-the-epex-spot-exchange-in-2025/), [pv-magazine.de](https://www.pv-magazine.de/2025/08/25/rekord-von-457-negativen-boersenstrompreisstunden-aus-vorjahr-eingestellt/), and Fraunhofer ISE.
**Caveats:** sources for 2022 range from 69 to 77 hours (69 used); sources for 2023 range from 301 to about 399 (301 used); sources for 2025 converge on 573 to 575 (573 used). A widely circulated figure of about 1,100 hours for 2025 could **not** be confirmed against primary sources and is not used here.

### `electrification.csv`: heat pumps and battery-electric cars
| Column | Description |
|---|---|
| `year` | 2020 to 2025 |
| `heat_pump_sales_k` | Heating heat pumps sold, thousand units ([BWP](https://www.waermepumpe.de/presse/zahlen-daten/absatzzahlen/)) |
| `bev_new_registrations_k` | New BEV passenger car registrations, thousand ([KBA](https://www.kba.de/DE/Presse/Pressemitteilungen/AlternativeAntriebe/2026/pm03_2026_Antriebe_12_25_komplett.html)) |

**Context:** heat pump sales rose 55 percent in 2025 to 299,000 units, outselling gas boilers for the first time. The BEV stock passed 2 million on 1 January 2026.

### `electricity_prices.csv`: household electricity price (ct/kWh)
| Column | Description |
|---|---|
| `year` | 2015 to 2025 |
| `household_ct_kwh` | Average household electricity price, ct/kWh |

**Source:** [BDEW Strompreisanalyse](https://www.bdew.de/service/daten-und-grafiken/bdew-strompreisanalyse/). In 2025 network charges made up about 11 ct/kWh, roughly 28 percent of the total.

### `peer_companies.csv`: the peer comparison
A long-format table (`company, metric, value, unit, fiscal_year, source`) behind the company-selector section: adjusted EBITDA and investment for fiscal 2025 (E.ON, RWE, EnBW), RWE's 2024 comparatives and 2031 targets, EnBW's 2030 ambition and capital increase, Vattenfall's German investment figures, and the municipal-utilities statistics (VKU, 2022).
**Comparability caveats:** adjusted EBITDA follows each company's own definition; investment values are gross as reported; Vattenfall reports at group level in Swedish kronor and publishes no separate German totals, so it is omitted from euro comparisons rather than estimated; the Stadtwerke rows describe roughly 1,500 separate companies in aggregate.
**Sources:** [RWE FY2025](https://www.renewable-energy-industry.com/countries/article-7294-rwe-at-the-upper-end-of-its-2025-ebitda-and-profit-guidance-eur35-billion-for-wind-power-solar-and-flexible-power-plants-by-2031), [EnBW fiscal 2025](https://www.enbw.com/press/enbw-2025-fiscal-year.html), [Vattenfall Berlin heat sale](https://group.vattenfall.com/press-and-media/pressreleases/2024/vattenfall-completes-sale-of-its-heat-business-in-germany-to-the-state-of-berlin/), [Baltic Wind on Vattenfall's German investment](https://balticwind.eu/vattenfall-bets-on-offshore-and-invests-e5-billion-in-germanys-energy-transition/), [VKU/trade reporting](https://energiemarie.de/stromanbieter/stadtwerke), plus the E.ON sources above.

### `eon_financials.csv`: E.ON key figures
A long-format table (`metric, segment_or_year, value, unit, source`) of E.ON's 2025 reporting: group and segment adjusted EBITDA, investments, the 48 billion euro plan for 2026 to 2030, guidance and targets, customers, grid length, smart meters, and the dividend.
**Primary source:** [E.ON full year 2025 results, EQS via Investegate, March 2026](https://www.investegate.co.uk/announcement/eqs/e-on-ag--0mpp/eqs-news-e-on-continues-growth-path-in-2025-/9445200); grid and digital twin figures follow [envelio](https://envelio.com/insights/eon-digital-twin-german-distribution-grid).
**Caveat:** the 2024 group EBITDA of 9.0 billion euros is derived from the reported 9 percent growth in 2025. E.ON does not disclose a consolidated regulated asset base figure in euros.

## Compilation notes

- I worked top-down from primary publishers (Bundesnetzagentur and SMARD, Fraunhofer ISE, Agora, BDEW, BWP, KBA, company reporting) and used trade press values only where the primary document was paywalled or not yet published.
- Where sources disagree, I used the value closest to the primary reporter and documented the range above rather than hiding it.
- Derived statistics (trends, correlations, cumulative sums) are computed by [`analysis/energiewende_analysis.py`](../analysis/energiewende_analysis.py); running it reproduces every derived number quoted in the study.
