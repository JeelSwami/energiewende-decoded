/* ============================================================
   Energiewende, decoded. Content layer.
   All copy (EN/DE), every dataset, every source.
   Compiled by Jeel Swami, August 2026. Data belongs to the
   original publishers credited in the source register.
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
    // Installed capacity GW, end of year (Marktstammdatenregister/BNetzA based)
    capacity: {
      years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
      solar: [45.4, 49.4, 54.6, 60.3, 67.8, 83.2, 99.9, 117.7],
      windOn: [52.6, 53.2, 54.2, 55.9, 58.0, 61.0, 63.6, 68.2],
      windOff: [6.4, 7.5, 7.9, 7.9, 8.2, 8.5, 9.2, 9.6],
    },
    // Congestion management cost, billion euros (Bundesnetzagentur, via trade press)
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

    // Peer comparison, fiscal 2025, from each company's own reporting
    peers: {
      ebitda2025: [
        { name: "E.ON", v: 9.8 },
        { name: "RWE", v: 5.1 },
        { name: "EnBW", v: 5.1 },
      ],
      invest2025: [
        { name: "RWE", v: 11.0 },
        { name: "E.ON", v: 8.5 },
        { name: "EnBW", v: 7.6 },
      ],
      rwe: { years: ["2024", "2025"], ebitda: [5.7, 5.1], ni: [2.3, 1.8] },
      enbw: { labels: ["2025", "2030t"], actual: [5.1, null], target: [null, 6.2] },
      sw: [
        { key: "heat", v: 91 },
        { key: "electricity", v: 66 },
        { key: "gas", v: 65 },
      ],
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
      players: "The players",
      eon: "E.ON in detail",
      simulator: "Load model",
      plays: "What follows",
      method: "Method",
      faq: "FAQ",
    },
    hero: {
      kicker: "An independent study · Germany · August 2026",
      title: "The <em>grid</em> decade",
      sub: "In 2025, renewable sources covered a record 55.1 percent of German electricity demand. In the same year, wholesale prices were negative for 573 hours, and battery projects totalling more than 500&nbsp;GW stood in grid connection queues. This study works through that paradox with sourced data, an interactive load model, and four strategic questions facing the utility at the centre of it: E.ON.",
      badge1: "🇩🇪 Bilingual EN/DE",
      badge2: "📊 Every figure sourced",
      badge3: "🧮 Assumptions written down",
      badge4: "🛠 Plain HTML, no libraries",
      disclaimer: "This is an independent analysis by Jeel Swami, based only on public information. It is not affiliated with, endorsed by, or commissioned by E.ON SE or any other company named here. Figures are the latest available in August 2026; the full source register is under Method. Free for study and research use, see the licence note in the footer. This is educational research on companies and markets; it is not investment advice and not an investment recommendation in the sense of EU market rules, and it makes no statement about any company's shares.",
    },
    transition: {
      kicker: "01 · The transition in numbers",
      title: "A success story that outran its infrastructure",
      lede: "The build-out of renewable generation delivered. Wind and solar now produce more electricity in Germany than the fossil fleet does. The system around the new generators, meaning grids, storage and flexible demand, was designed for a different century. The data shows both halves of that story.",
      insights: [
        {
          title: "Solar doubled, and its market value fell",
          body: "Installed solar capacity passed <strong>100 GW</strong> in 2025, roughly twice the fleet of 2020. Its market value moved the other way: the German solar capture price fell below <strong>20 €/MWh</strong> in May 2025, 37 percent lower than a year earlier. Adding capacity without flexibility erodes the business case of every additional panel.",
        },
        {
          title: "The 80 percent question",
          body: "The target for 2030 is <strong>80 percent renewables</strong> in gross electricity consumption. The trend from 2015 to 2025 added about 2.4 percentage points a year; getting from 55.1 to 80 percent needs about 5. That is <strong>double the historical pace</strong>, and this time the constraint is not building generators but connecting and integrating them.",
        },
        {
          title: "Hydrogen will not carry this decade",
          body: "Germany has <strong>181 MW</strong> of electrolysis capacity in operation, against a target of 10 GW by 2030 that is now being scaled back. Whatever flexibility the system needs before 2030 will have to come from batteries, demand response and grids.",
        },
      ],
    },
    bottleneck: {
      kicker: "02 · The new bottleneck",
      title: "Negative prices, congestion costs, and a 500 GW queue",
      lede: "Three symptoms show where the system now binds. Prices turn negative when solar peaks. Managing congestion costs billions each year. And the connection queue has detached itself from physical reality, while the real demand wave of heat pumps, electric cars and data centres is only beginning.",
      prose: "<p>By late 2025, grid connection requests for large battery storage exceeded <strong>500 GW</strong> nationwide. A BDEW survey of four transmission and 17 large distribution operators counted more than <strong>720 GW</strong>. The national peak load is roughly 80 GW, and only about 2.5 GW of large storage was actually in operation. Most of the queue consists of speculative options rather than projects, and real, financeable load waits behind it: at E.ON's distribution subsidiary Mitnetz Strom alone, 90 data centre requests add up to <strong>16.8 GW</strong>.</p><p>The remedies are known and contested. A maturity test for the queue (the Reifegradverfahren), the Bundesnetzagentur's new NEST framework for grid returns from December 2025, a federal subsidy of 6.5 billion euros that lowers 2026 transmission charges by about 57 percent, and the debate over stretching grid cost recovery across decades under the name Amortisationskonto. Each of these is an open construction site where careful analysis is scarce. That, frankly, is what makes this corner of the sector so interesting to work in.</p>",
    },
    eon: {
      kicker: "04 · The worked example",
      title: "E.ON: the clearest expression of the grid decade",
      lede: "Since the asset swap with RWE, completed in 2020, E.ON operates grids and retail and no longer runs large-scale generation. Europe's largest distribution operator and energy retailer is in effect a bet that Germany solves its grid problem. The 2025 results suggest the bet is working. The constraints explain why it still needs help. I use E.ON as the worked example because it is the purest expression of the grid decade; the section above shows how the same questions land for its peers.",
      prose: "<p><strong>What could stop the machine?</strong> Four things. Regulatory returns, if the NEST framework prices equity too thinly. The queue, because connection chaos consumes engineering capacity and political goodwill. Financing, because 48 billion euros over five years lands in a sector whose financing gap KfW and PwC estimate at 346 billion euros. And the commoditisation of retail, because mandatory dynamic tariffs make the cost of serving a customer, rather than the brand, the deciding variable. Each of these constraints leads to one of the questions in the next section.</p>",
      insights: [
        {
          title: "A connection every seven seconds",
          body: "E.ON's digital twin of its German grid, built with the Cologne company envelio, covers <strong>700,000 km</strong> of network and 55 million components and assesses more than <strong>410,000</strong> connection requests a year automatically. Its chief executive Leonhard Birnbaum expects that by 2030 the company will need to make \"one connection every seven seconds of a working day\" (interview with Eurelectric).",
        },
        {
          title: "Ahead of the smart meter curve",
          body: "E.ON was the first German utility past <strong>1 million</strong> installed smart meters, a rollout rate of about 30 percent at its distribution operators against the statutory minimum of 20 percent for the end of 2025. Nearly half of all smart meters in Germany sit in E.ON grid areas. Metering is the substrate on which §14a flexibility and dynamic tariffs run.",
        },
        {
          title: "Data centres, from constraint to product",
          body: "Frankfurt's grid is effectively full. E.ON's partnership with CyrusOne, announced in June 2025, adds <strong>61 MW</strong> of local generation to the FRA7 campus by 2029. Turning connection scarcity into an infrastructure product is a template worth watching as computing demand grows.",
        },
      ],
    },
    players: {
      kicker: "03 · The players",
      title: "Four business models, one transition",
      lede: "The asset swap between E.ON and RWE, completed in 2020, split Germany's two former giants along the value chain. EnBW stayed integrated, Vattenfall narrowed its German footprint, and roughly 1,500 municipal utilities kept the customer relationships. The same policy shocks land differently on each model, which is what makes the comparison instructive. Select a company; every figure comes from public reporting.",
      selectorLabel: "Select a company",
      labels: { model: "Business model", bet: "The bet", risk: "The main risk" },
      note: "Comparability: EBITDA values are each company's own adjusted EBITDA for fiscal 2025; investment values are gross investment as reported for 2025. Vattenfall reports at group level in Swedish kronor and publishes no separate German totals, and the municipal utilities are separate companies, so both are omitted from the euro comparisons rather than estimated. Company names are used only to identify the companies; this study is independent of all of them and uses no logos or brand assets.",
      compare: {
        ebitdaTitle: "Same year, different machines",
        ebitdaSub: "Adjusted EBITDA, fiscal 2025, billion euros",
        ebitdaNote: "Source: company reporting for fiscal 2025. Adjusted EBITDA as defined by each company.",
        investTitle: "Who invested how much in 2025",
        investSub: "Gross investment as reported, billion euros",
        investNote: "Source: company reporting for fiscal 2025. RWE's figure is gross investment before divestments and farm-downs.",
      },
      charts: {
        eonTitle: "Adjusted EBITDA by segment, 2025, billion euros",
        rweTitle: "RWE, reported results, billion euros",
        rweEbitda: "Adjusted EBITDA",
        rweNi: "Adjusted net income",
        enbwTitle: "EnBW, adjusted EBITDA, billion euros",
        enbwActual: "Reported",
        enbwTarget: "2030 ambition, midpoint",
        swTitle: "Municipal utilities, retail market shares, percent",
        heat: "Heat",
        electricity: "Electricity",
        gas: "Gas",
      },
      companies: {
        eon: {
          name: "E.ON",
          model: "Regulated distribution grids and energy retail across Europe, with no large-scale generation of its own. Europe's largest distribution operator, examined in depth in the next section.",
          bet: "That regulated grid investment compounds: 48 billion euros of planned investment for 2026 to 2030, aimed at about 13 billion euros of EBITDA by 2030.",
          risk: "Regulatory returns and financing headroom. The connection queue consumes engineering capacity and political goodwill.",
          tiles: [
            { label: "Adjusted EBITDA, 2025", value: "€9.8", unit: "bn", delta: "+9% on 2024" },
            { label: "Investment, 2025", value: "€8.5", unit: "bn" },
            { label: "Retail customers", value: "46.8", unit: "m" },
            { label: "German grid", value: "700k", unit: "km" },
          ],
          srcNote: "Figures: E.ON full year 2025 results (EQS/Investegate, March 2026).",
        },
        rwe: {
          name: "RWE",
          model: "Generation and trading: Europe's third-largest renewables operator and the number two in offshore wind, with no grids and no mass-market retail. The other half of the 2020 asset swap.",
          bet: "That building flexible generation and renewables earns more than it costs: 35 billion euros of net investment planned to 2031, toward a portfolio of 65 GW.",
          risk: "Merchant exposure. Capture prices, negative hours and policy shifts feed straight into earnings, which eased from 2024 to 2025.",
          tiles: [
            { label: "Adjusted EBITDA, 2025", value: "€5.1", unit: "bn", delta: "5.7 in 2024" },
            { label: "Adjusted net income, 2025", value: "€1.8", unit: "bn", delta: "2.3 in 2024" },
            { label: "Gross investment, 2025", value: "€11", unit: "bn" },
            { label: "Portfolio target, 2031", value: "65", unit: "GW" },
          ],
          srcNote: "Figures: RWE full year 2025 reporting and investor communications.",
        },
        enbw: {
          name: "EnBW",
          model: "The integrated exception: a transmission operator (TransnetBW), distribution grids (Netze BW), generation and retail under one, largely publicly owned, roof.",
          bet: "That integration pays through the transition: record gross investment of 7.6 billion euros in 2025, 87 percent of it into growth, toward an EBITDA ambition of 5.8 to 6.6 billion euros by 2030.",
          risk: "The equity constraint. A capital increase of about 3.1 billion euros was already needed to fund the programme.",
          tiles: [
            { label: "Adjusted EBITDA, 2025", value: "€5.1", unit: "bn", delta: "+3% on 2024" },
            { label: "Grids segment EBITDA", value: "≈€2.7", unit: "bn", delta: "+20% on 2024" },
            { label: "Gross investment, 2025", value: "€7.6", unit: "bn", delta: "+22% on 2024" },
            { label: "Capital increase", value: "≈€3.1", unit: "bn" },
          ],
          srcNote: "Figures: EnBW fiscal 2025 reporting. The 2030 ambition of 5.8 to 6.6 billion euros is charted at its midpoint.",
        },
        vattenfall: {
          name: "Vattenfall · Germany",
          model: "The focused guest: owned by the Swedish state, in Germany now renewables and retail after selling the Berlin heat business to the State of Berlin in 2024.",
          bet: "That offshore wind and two retail strongholds carry the German business: more than 5 billion euros of investment in Germany to 2028, with the 1.6 GW Nordlicht wind farms approved in early 2025.",
          risk: "Concentration. After the heat exit, the German footprint rests on a few large projects and the Berlin and Hamburg retail books.",
          tiles: [
            { label: "Investment in Germany to 2028", value: ">€5", unit: "bn" },
            { label: "Nordlicht 1 and 2, approved 2025", value: "1.6", unit: "GW" },
            { label: "Berlin heat sale, closed 2024", value: "≈€1.4", unit: "bn" },
          ],
          srcNote: "Figures: Vattenfall press releases, 2024 and 2025. Group results are reported in Swedish kronor, so no euro chart is shown here.",
        },
        stadtwerke: {
          name: "Stadtwerke",
          model: "Not one company but roughly 1,500: municipal utilities that hold the customer relationships of the German energy system, the largest of them, in Cologne and Munich, the size of mid-cap utilities.",
          bet: "Proximity. Around two thirds of electricity and gas retail and 91 percent of heat, the sector where the transition is hardest and local trust matters most.",
          risk: "Thin equity. Municipal owners draw dividends while grids and heat networks need transformation capital; a structural financing problem, and a large advisory market.",
          tiles: [
            { label: "VKU member companies", value: "1,592", unit: "" },
            { label: "Sector revenue, 2022", value: "€194", unit: "bn" },
            { label: "Employees", value: "≈309", unit: "k" },
            { label: "Heat market share", value: "91", unit: "%" },
          ],
          srcNote: "Figures: VKU statistics (2022) and trade reporting on retail market shares.",
        },
      },
    },
    sim: {
      kicker: "05 · An interactive load model",
      title: "How much new load hits the grid by 2030?",
      lede: "How much additional peak load reaches German distribution grids by 2030, and roughly what does absorbing it cost? Move the levers or pick a scenario. Every coefficient is documented in the model card below. The model is deliberately simple; its purpose is to show which lever dominates, not to forecast.",
      scenarios: "Scenarios",
      scenarioNames: { base: "Base case", policy: "Policy targets", slow: "Slow lane" },
      params: {
        ev: { label: "Additional battery-electric cars by 2030", unit: "m", hint: "Germany had about 1.8 million BEVs in 2025. The former political goal was 15 million by 2030." },
        hp: { label: "Additional heat pumps by 2030", unit: "m", hint: "Sales peaked at about 356,000 a year in 2023. The political ambition was 500,000 a year." },
        dc: { label: "Additional data centre load by 2030", unit: "GW", hint: "Bitkom expects IT connection capacity to grow from 2.7 to about 4.8 GW by 2030." },
        flex: { label: "Share of new loads actively managed", unit: "%", hint: "Smart charging and §14a control reduce how much load coincides." },
      },
      out: {
        peak: "Additional peak load",
        energy: "Additional annual demand",
        capex: "Implied distribution investment",
        capexUnit: "bn €",
        peakNote: "contribution to added peak",
        takeaway: "This scenario adds <strong>{peak} GW</strong> of coincident peak load, about <strong>{share} percent</strong> of today's national peak of roughly 79 GW. Absorbing it implies distribution investment on the order of <strong>{capex} billion euros</strong>. Flexibility is the cheapest lever on this board: it lowers the peak without lowering demand.",
      },
      contrib: { ev: "Electric vehicles", hp: "Heat pumps", dc: "Data centres" },
      modelCardTitle: "Model card: every assumption, with its source",
      modelCardBody: "<p><strong>Peak load.</strong> <code>ΔP = N_EV · 11 kW · g_EV + N_HP · 2.8 kW · g_HP + P_DC · 0.9</code>. The coincidence factor for electric cars is g_EV = 0.20 for uncontrolled home charging, reduced by up to 60 percent as the managed share rises (smart charging; Consentec 2020, Probst 2014). The electrical design load of a heat pump is about 2.8 kW (air to water, including auxiliary heating; ZVEI 2023), with g_HP = 0.75 in a cold spell, reducible by up to 40 percent through §14a control. The law guarantees a minimum of 4.2 kW, so this flexibility is bounded. Data centres run nearly flat, with a load factor of 0.9.</p><p><strong>Energy.</strong> An electric car needs about 2.5 MWh a year (roughly 14,000 km at 18 kWh per 100 km). A heat pump needs about 4.5 MWh a year (typical values from BWP). Data centres are assumed at 0.8 utilisation across 8,760 hours.</p><p><strong>Investment proxy.</strong> About 2.8 billion euros per GW of added coincident peak, derived from the BDEW and ZVEI estimate of 323 billion euros of distribution grid investment to 2045, spread across the load and generation it has to integrate. This is an order of magnitude, not a price: actual cost depends on local headroom, on simultaneity with solar feed-in, and on how much reinforcement digital operation avoids.</p><p><strong>Limits.</strong> The model is static, national and linear. It has no regional resolution, no solar feed-in peaks (which are what actually size many rural grids), and no price feedback. It answers one question honestly: which lever moves the number.</p>",
    },
    plays: {
      kicker: "06 · What follows",
      title: "Four questions, four answers",
      lede: "What I would argue to a management board, with the caveat that an outside analyst always sees less than the people in the room. Each recommendation answers a measured problem from the sections above and names the indicators I would track.",
      items: [
        {
          tag: "1 · Networks",
          title: "Gate the queue by maturity, not by arrival time",
          body: "More than 500 GW of storage connection requests are pending nationwide; E.ON alone reports about 330 GW. Queues run on the principle of first come, first served now hold data centres and industry behind projects that exist only on paper. The remedy is procedural: assess the queue by project maturity (secured land, permits, financing) against published criteria, charge refundable reservation fees so that speculation carries a price, publish hosting capacity maps from the digital twin so that developers can find feasible nodes themselves, and offer curtailable connection agreements as a fast lane.",
          kpi: "Indicators: median time to a connection offer · share of the queue with demonstrated maturity · GW of flexible connection contracts signed",
        },
        {
          tag: "2 · Capital",
          title: "Treat the investment programme as a portfolio",
          body: "E.ON plans 48 billion euros of investment between 2026 and 2030, in a sector whose financing gap KfW and PwC put at 346 billion euros by 2045. EnBW has already needed a capital increase of 3.1 billion euros; the constraint is real. Running the programme as a capital allocation portfolio means recycling capital through minority stakes in mature grid assets, supporting instruments that stretch cost recovery across generations (the Amortisationskonto debate), and arguing the NEST equity return case with quantified evidence rather than lobbying prose.",
          kpi: "Indicators: FFO to net debt within the rating corridor · realised asset base growth against plan · spread of allowed return over cost of capital",
        },
        {
          tag: "3 · Retail and flexibility",
          title: "Make household flexibility a product",
          body: "573 negative price hours in 2025, control rights under §14a EnWG, time variable network charges and mandatory dynamic tariffs together make household flexibility a tradable quantity for the first time. A bundle of dynamic tariff, wallbox, heat pump and home battery can shift consumption into cheap hours and sell the aggregated flexibility into congestion management. Retail then stops being a shrinking commodity business and becomes the platform through which the system reaches households.",
          kpi: "Indicators: MW of §14a-controlled load under management · smart meter penetration against the 20 to 95 percent trajectory · churn in flexibility bundles against commodity contracts",
        },
        {
          tag: "4 · Operations",
          title: "Apply AI where it defers capital spending",
          body: "Three applications hold up under scrutiny. Probabilistic load flow on the digital twin turns planning cycles of months into days and defers physical reinforcement. Assistance for the field force matters in a country with more than 18,000 unfilled electrician positions. And the existing customer service automation, running at roughly 70 percent, can be extended into tariff advice, which has become a data problem customers cannot solve alone. All of this has to operate within the NIS2 and KRITIS rules; cybersecurity has been a board-level duty in Germany since December 2025.",
          kpi: "Indicators: planning cycle time · investment deferred per euro of digital spending · cost to serve per customer · automation rate with a customer satisfaction floor",
        },
      ],
    },
    method: {
      kicker: "07 · Method",
      title: "How this study was built",
      lede: "Built the way I believe an analysis should be: every figure traceable to a primary source, every derived statistic reproducible from code, every model assumption written down.",
      prose: "<p>All quantitative claims trace to the source register below. Wherever possible I used primary publishers: Bundesnetzagentur and SMARD, Fraunhofer ISE, Agora Energiewende, BDEW, KBA, KfW, and company reporting. Derived statistics, such as the trend against the 80 percent target, the correlation between solar capacity and negative price hours, and cumulative congestion costs, are computed in the repository's <a href='https://github.com/JeelSwami/energiewende-decoded/tree/main/analysis' target='_blank' rel='noopener'>Python analysis layer</a>. The datasets ship as CSV files with a data dictionary that also records where sources disagree. Where figures for 2026 were not yet published, the latest full year values are used and labelled as such.</p><p>The site itself is plain HTML, CSS and JavaScript. The charts are hand-written SVG with keyboard navigation and a table view for every figure, and the colour system is validated for colour vision deficiency in both light and dark mode. This work is free to use for study and research with attribution; commercial use requires my permission, and the underlying data remains the property of its original publishers. This study is educational research, not investment advice and not an investment recommendation. The site sets no cookies and runs no tracking; it stores only your language and theme choice in your browser, and it is hosted on GitHub Pages, whose servers process technical access logs.</p>",
      sourcesTitle: "Source register",
    },
    faq: {
      kicker: "08 · Questions researchers ask",
      title: "A short FAQ",
      lede: "Questions I have been asked, or asked myself, while compiling this study. If yours is missing, write to me.",
      items: [
        {
          q: "Where does the data come from, and may I reuse it?",
          a: "<p>Every figure traces to the source register above, and the compiled CSV files in the repository name their source per dataset. The underlying data belongs to its original publishers. My compilation, text and code are free to use for study, teaching and research with attribution; commercial use requires my written permission. If you republish any of the primary data, credit the original publisher, not me.</p>",
        },
        {
          q: "Why do electricity prices go negative at all?",
          a: "<p>Day-ahead prices fall below zero when inflexible generation plus supported renewable feed-in exceeds demand and export capacity at once. Plants that receive support payments, or that are expensive to ramp down, keep producing even when they must pay to do so. Germany recorded 573 such hours in 2025. Since the Solarspitzengesetz of early 2025, new solar plants receive no support during negative price hours, which strengthens the case for storage and for shifting demand.</p>",
        },
        {
          q: "Agora reports 55.1 percent renewables for 2025, Fraunhofer 55.9. Which is right?",
          a: "<p>Both, because they answer different questions. 55.1 percent is the renewable share of gross electricity consumption, the metric behind the 80 percent target for 2030 (AGEE-Stat, Agora). 55.9 percent is the renewable share of public net electricity generation, which excludes industrial self-supply and uses a different denominator (Fraunhofer ISE Energy-Charts). Mixing the two is one of the most common errors in writing about the Energiewende, which is why this site states its metric on every chart.</p>",
        },
        {
          q: "What is redispatch, and why does it cost billions?",
          a: "<p>When the grid cannot physically carry what the market has scheduled, operators pay plants on one side of a bottleneck to produce less and plants on the other side to produce more. Consumers pay for both interventions through network charges. Between 2019 and 2025 this congestion management cost Germany about 18 billion euros, 3.1 billion of it in 2025 alone. It is the clearest price tag on the gap between where generation was built and where the grid can move it.</p>",
        },
        {
          q: "What does §14a EnWG actually change?",
          a: "<p>Since January 2024, distribution operators may temporarily reduce the draw of controllable devices, such as heat pumps, wallboxes and home batteries, when the local grid is stressed, but never below a guaranteed 4.2 kW. In exchange, the affected customers pay reduced network charges, and a further module introduces time variable charges. For anyone researching household flexibility, this paragraph is currently the most interesting natural experiment in Germany.</p>",
        },
        {
          q: "How seriously should I take the load model?",
          a: "<p>As an order-of-magnitude tool, not a forecast. It is a static linear model with sourced coefficients and documented limits, and its purpose is to show which lever dominates the load picture. For real grid planning you would need regional resolution, solar feed-in peaks and probabilistic coincidence, which is what the distribution operators' own digital twins provide. The model card lists every assumption so you can disagree with them precisely.</p>",
        },
        {
          q: "Where should a researcher start with primary German energy data?",
          a: "<p>Four portals cover most needs. SMARD (smard.de) publishes the Bundesnetzagentur's market data. Energy-Charts (energy-charts.info) from Fraunhofer ISE covers generation, capacity and prices with a good API. The Marktstammdatenregister lists every registered generation asset in the country. Destatis provides the official statistics. For synthesis, Agora Energiewende's annual review is the best single document, and the data folder of this repository records which source each chart uses.</p>",
        },
      ],
    },
    ack: {
      kicker: "09 · Acknowledgements",
      title: "Credit where it is due",
      body: "<p>This study stands on the public work of the institutions that measure Germany's energy system and publish what they find. For data and analyses I thank the <strong>Bundesnetzagentur</strong> and its SMARD platform, <strong>Fraunhofer ISE</strong> and the Energy-Charts team, <strong>Agora Energiewende</strong>, <strong>BDEW</strong>, the <strong>Bundesverband Wärmepumpe</strong>, the <strong>Kraftfahrt-Bundesamt</strong>, the <strong>FfE</strong> in Munich, <strong>AGEE-Stat</strong> at the BMWK, the <strong>Umweltbundesamt</strong>, and <strong>KfW Research</strong> together with <strong>PwC</strong>.</p><p>The load model's coefficients rest on work by <strong>Consentec</strong>, the <strong>ZVEI</strong>, and the dissertation of <strong>A. Probst</strong> at the University of Stuttgart. Company information comes from <strong>E.ON SE</strong> investor relations, <strong>envelio</strong>, <strong>Eurelectric</strong> and <strong>CyrusOne</strong>; sector studies from <strong>Roland Berger</strong>, <strong>BCG</strong> and <strong>McKinsey</strong>. Where primary documents were paywalled or not yet published, the reporting of <strong>Clean Energy Wire</strong>, <strong>pv magazine</strong>, <strong>ESS News</strong>, <strong>ZfK</strong> and <strong>Tagesspiegel Background</strong> filled the gaps.</p><p>Any errors of compilation or interpretation are mine alone.</p>",
    },
    about: {
      kicker: "10 · About",
      title: "About the author",
      name: "Jeel Swami",
      p1: "I am a physicist working in data science, on my way into the energy field. The problems that hold my attention are the ones where regulation, engineering and capital meet, and the German power grid is exactly such a problem.",
      p2: "My research background is in computational and experimental condensed matter physics: I studied the electronic and magnetic properties of correlated perovskite materials, and continued with postdoctoral research on materials for energy science. Since then my work has moved to the intersection of physics, data and AI, training and evaluating models for scientific reasoning. This project applies the habits of that training to energy strategy. Sourced data, reproducible analysis, and models whose assumptions are written down where everyone can check them.",
      p3: "I work in English and German, and I built my own vocabulary trainer on the way to C1. If this study is useful for your research or your team, I would be glad to hear from you.",
      link1: "<strong>This project</strong> · <a href='https://github.com/JeelSwami/energiewende-decoded' target='_blank' rel='noopener'>github.com/JeelSwami/energiewende-decoded</a>",
      link2: "<strong>EU research funding in NRW</strong> · <a href='https://github.com/JeelSwami/nrw-funding-dashboard' target='_blank' rel='noopener'>an interactive dashboard from CORDIS and Eurostat data</a>",
      link3: "<strong>Materials informatics</strong> · <a href='https://github.com/JeelSwami/Materials-Band-Gap-Prediction-ML-' target='_blank' rel='noopener'>band gap prediction from atomic descriptors</a>",
      link4: "<strong>Contact</strong> · <a href='mailto:jeel.swami@outlook.com'>jeel.swami@outlook.com</a> · <a href='https://github.com/JeelSwami' target='_blank' rel='noopener'>@JeelSwami</a>",
    },
    footer: {
      left: "© 2026 Jeel Swami · CC BY-NC 4.0 · Free for study and research with attribution; commercial use requires permission. The data remains the property of its original publishers.",
      right: "Data status: August 2026 · Built by hand with plain HTML, SVG and JavaScript.",
    },
    charts: {
      resShare: {
        title: "Renewable share of electricity consumption",
        sub: "Share of gross electricity consumption, Germany, in percent, against the 80 percent target for 2030",
        note: "Source: BMWK/AGEE-Stat and UBA via Agora Energiewende annual reviews; the 2025 value follows Agora, \"Die Energiewende in Deutschland: Stand der Dinge 2025\".",
      },
      genMix: {
        title: "Where German electricity came from in 2025",
        sub: "Public net electricity generation, TWh",
        note: "Source: Fraunhofer ISE Energy-Charts, annual evaluation 2025. Total of about 419.5 TWh public net generation; renewable share of this metric 55.9 percent.",
        renewable: "Renewable",
        fossil: "Fossil and other",
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
        title: "Installed capacity since 2018",
        sub: "Gigawatts installed at the end of each year",
        note: "Source: Marktstammdatenregister and Bundesnetzagentur figures, via Fraunhofer ISE Energy-Charts.",
        solar: "Solar PV",
        windOn: "Wind onshore",
        windOff: "Wind offshore",
      },
      redispatch: {
        title: "The cost of congestion",
        sub: "Congestion management (redispatch and related measures), billion euros per year",
        note: "Source: Bundesnetzagentur congestion management reports. The 2019 to 2025 total is 18.4 billion euros, computed in the repository's analysis layer.",
      },
      negPrices: {
        title: "Hours below zero",
        sub: "Hours with negative day-ahead wholesale prices per year",
        note: "Source: Fraunhofer ISE and FfE, EPEX day-ahead data. The correlation with installed solar capacity is Pearson r = 0.82; see the analysis folder.",
      },
      heatPumps: {
        title: "Heat pump sales: slump and recovery",
        sub: "Heating heat pumps sold in Germany, thousand units per year",
        note: "Source: Bundesverband Wärmepumpe (BWP). In 2025, sales reached 299,000 (+55 percent) and heat pumps outsold gas boilers for the first time.",
      },
      ev: {
        title: "New electric car registrations",
        sub: "Newly registered battery-electric cars in Germany, thousands per year",
        note: "Source: Kraftfahrt-Bundesamt (KBA). The BEV stock passed 2 million on 1 January 2026.",
      },
      eonSegments: {
        title: "E.ON in 2025: earnings by segment",
        sub: "Adjusted EBITDA by segment, billion euros",
        note: "Source: E.ON full year 2025 results (EQS/Investegate, March 2026). Investment in 2025: networks 7.0, retail about 0.5, infrastructure solutions about 0.9 billion euros.",
        networks: "Energy Networks",
        retail: "Energy Retail",
        eis: "Infrastructure Solutions",
      },
      eonPath: {
        title: "E.ON's earnings path to 2030",
        sub: "Group adjusted EBITDA, billion euros: reported figures and company targets",
        note: "Source: E.ON full year 2025 results and guidance. 2026e is the guidance midpoint; 2028t and 2030t are company targets (above 11.3, about 13 billion euros).",
        actual: "Reported",
        target: "Guidance / target",
      },
    },
    kpis: {
      hero: [
        { label: "Renewable share of demand, 2025", value: "55.1", unit: "%" },
        { label: "Hours with negative prices, 2025", value: "573", unit: "h", delta: "a record; 457 in 2024" },
        { label: "Grid investment need to 2045", value: "€360+", unit: "bn", delta: "BNetzA-based estimate" },
        { label: "Battery projects queuing for connection", value: ">500", unit: "GW", delta: "against a peak load near 80 GW" },
      ],
      bottleneck: [
        { label: "Storage requests (BDEW survey, 2025)", value: ">720", unit: "GW" },
        { label: "Large storage actually operating", value: "≈2.5", unit: "GW", delta: "end of 2025" },
        { label: "Data centre requests at one E.ON DSO", value: "16.8", unit: "GW", delta: "Mitnetz Strom, 90 projects" },
        { label: "Distribution investment need by 2033", value: "≈€110", unit: "bn" },
      ],
      eon: [
        { label: "Adjusted EBITDA, 2025", value: "€9.8", unit: "bn", delta: "+9% against 2024", deltaGood: true },
        { label: "Investment plan, 2026 to 2030", value: "€48", unit: "bn" },
        { label: "Retail customers in Europe", value: "46.8", unit: "m" },
        { label: "German grid operated", value: "700k", unit: "km", delta: "about 110 GW of renewables connected" },
      ],
    },
  };

  const de = {
    ui: {
      navLabel: "Abschnitte",
      themeToggle: "Dunkelmodus umschalten",
      tableView: "Tabellenansicht",
      chartKeyHint: "Diagramm: mit den Pfeiltasten durch die Werte navigieren",
    },
    nav: {
      transition: "Die Wende",
      bottleneck: "Der Engpass",
      players: "Die Akteure",
      eon: "E.ON im Detail",
      simulator: "Lastmodell",
      plays: "Was folgt",
      method: "Methodik",
      faq: "FAQ",
    },
    hero: {
      kicker: "Eine unabhängige Studie · Deutschland · August 2026",
      title: "Das Jahrzehnt <em>der Netze</em>",
      sub: "2025 deckten erneuerbare Quellen einen Rekordanteil von 55,1 Prozent des deutschen Strombedarfs. Im selben Jahr waren die Großhandelspreise 573 Stunden lang negativ, und Batterieprojekte mit zusammen über 500&nbsp;GW standen in den Netzanschluss-Warteschlangen. Diese Studie arbeitet dieses Paradox auf: mit belegten Daten, einem interaktiven Lastmodell und vier strategischen Fragen an das Unternehmen in der Mitte des Geschehens, E.ON.",
      badge1: "🇩🇪 Zweisprachig DE/EN",
      badge2: "📊 Jede Zahl belegt",
      badge3: "🧮 Annahmen offengelegt",
      badge4: "🛠 Reines HTML, keine Bibliotheken",
      disclaimer: "Dies ist eine unabhängige Analyse von Jeel Swami, ausschließlich auf Basis öffentlicher Informationen. Sie ist mit E.ON SE oder anderen genannten Unternehmen weder verbunden noch von ihnen beauftragt oder autorisiert. Die Zahlen sind die im August 2026 jeweils aktuellsten; das vollständige Quellenverzeichnis steht unter Methodik. Frei für Studium und Forschung, siehe Lizenzhinweis im Fußbereich. Dies ist bildende Forschung zu Unternehmen und Märkten; sie ist keine Anlageberatung und keine Anlageempfehlung im Sinne des EU-Marktmissbrauchsrechts und trifft keine Aussage über Aktien der genannten Unternehmen.",
    },
    transition: {
      kicker: "01 · Die Wende in Zahlen",
      title: "Eine Erfolgsgeschichte, die ihrer Infrastruktur davongelaufen ist",
      lede: "Der Ausbau der erneuerbaren Erzeugung hat geliefert. Wind und Solar erzeugen in Deutschland inzwischen mehr Strom als der fossile Kraftwerkspark. Das System um die neuen Anlagen herum, also Netze, Speicher und flexible Nachfrage, stammt aus einem anderen Jahrhundert. Die Daten zeigen beide Hälften dieser Geschichte.",
      insights: [
        {
          title: "Solar verdoppelt, Marktwert gefallen",
          body: "Die installierte Solarleistung überschritt 2025 die Marke von <strong>100 GW</strong>, etwa das Doppelte des Bestands von 2020. Ihr Marktwert bewegte sich in die Gegenrichtung: Der deutsche Solar-Capture-Preis fiel im Mai 2025 unter <strong>20 €/MWh</strong>, 37 Prozent weniger als ein Jahr zuvor. Zubau ohne Flexibilität untergräbt das Geschäftsmodell jedes weiteren Moduls.",
        },
        {
          title: "Die 80-Prozent-Frage",
          body: "Das Ziel für 2030 lautet <strong>80 Prozent Erneuerbare</strong> am Bruttostromverbrauch. Der Trend von 2015 bis 2025 brachte etwa 2,4 Prozentpunkte pro Jahr; von 55,1 auf 80 Prozent braucht es etwa 5. Das ist <strong>das doppelte historische Tempo</strong>, und der Engpass ist diesmal nicht der Bau von Anlagen, sondern ihr Anschluss und ihre Integration.",
        },
        {
          title: "Wasserstoff trägt dieses Jahrzehnt nicht",
          body: "Deutschland hat <strong>181 MW</strong> Elektrolyseleistung in Betrieb, bei einem Ziel von 10 GW bis 2030, das derzeit zurückgenommen wird. Die Flexibilität, die das System vor 2030 braucht, müssen Batterien, Lastmanagement und Netze liefern.",
        },
      ],
    },
    bottleneck: {
      kicker: "02 · Der neue Engpass",
      title: "Negative Preise, Redispatch-Kosten und eine 500-GW-Warteschlange",
      lede: "Drei Symptome zeigen, wo das System heute klemmt. Die Preise werden negativ, wenn die Solareinspeisung ihren Höchststand erreicht. Das Engpassmanagement kostet jedes Jahr Milliarden. Und die Anschluss-Warteschlange hat sich von der physischen Realität gelöst, während die eigentliche Nachfragewelle aus Wärmepumpen, Elektroautos und Rechenzentren erst beginnt.",
      prose: "<p>Ende 2025 überstiegen die Netzanschlussbegehren für Großbatteriespeicher bundesweit <strong>500 GW</strong>. Eine BDEW-Abfrage bei vier Übertragungs- und 17 großen Verteilnetzbetreibern zählte mehr als <strong>720 GW</strong>. Die Jahreshöchstlast liegt bei rund 80 GW, tatsächlich in Betrieb waren nur etwa 2,5 GW Großspeicher. Der größte Teil der Warteschlange besteht aus spekulativen Optionen, nicht aus Projekten, und dahinter wartet reale, finanzierbare Last: Allein bei der E.ON-Tochter Mitnetz Strom summieren sich 90 Rechenzentrums-Anfragen auf <strong>16,8 GW</strong>.</p><p>Die Auswege sind bekannt und umstritten. Ein Reifegradverfahren für die Warteschlange, der neue NEST-Regulierungsrahmen der Bundesnetzagentur vom Dezember 2025, ein Bundeszuschuss von 6,5 Milliarden Euro, der die Übertragungsnetzentgelte 2026 um rund 57 Prozent senkt, und die Debatte über ein Amortisationskonto, das die Netzkosten über Jahrzehnte streckt. Jeder dieser Punkte ist eine offene Baustelle, auf der sorgfältige Analyse knapp ist. Genau das macht diese Ecke der Branche so interessant.</p>",
    },
    eon: {
      kicker: "04 · Das Fallbeispiel",
      title: "E.ON: der klarste Ausdruck des Netz-Jahrzehnts",
      lede: "Seit dem 2020 vollzogenen Asset-Tausch mit RWE betreibt E.ON Netze und Vertrieb und keine Großerzeugung mehr. Europas größter Verteilnetzbetreiber und Energievertrieb ist damit faktisch eine Wette darauf, dass Deutschland sein Netzproblem löst. Die Zahlen für 2025 sprechen dafür, dass die Wette aufgeht. Die Engpässe erklären, warum sie trotzdem Unterstützung braucht. E.ON dient in dieser Studie als Fallbeispiel, weil das Unternehmen der reinste Ausdruck des Netz-Jahrzehnts ist; der Abschnitt darüber zeigt, wie dieselben Fragen bei den anderen Modellen ankommen.",
      prose: "<p><strong>Was könnte die Maschine stoppen?</strong> Vier Dinge. Die regulatorische Verzinsung, falls der NEST-Rahmen Eigenkapital zu knapp vergütet. Die Warteschlange, weil Anschlusschaos Ingenieurkapazität und politisches Kapital bindet. Die Finanzierung, weil 48 Milliarden Euro in fünf Jahren auf eine Branche treffen, deren Finanzierungslücke KfW und PwC auf 346 Milliarden Euro beziffern. Und die Kommodifizierung des Vertriebs, weil verpflichtende dynamische Tarife die Servicekosten je Kunde zur entscheidenden Größe machen, nicht die Marke. Jeder dieser Engpässe führt zu einer der Fragen im nächsten Abschnitt.</p>",
      insights: [
        {
          title: "Alle sieben Sekunden ein Anschluss",
          body: "E.ONs digitaler Zwilling des deutschen Netzes, gebaut mit dem Kölner Unternehmen envelio, umfasst <strong>700.000 km</strong> Netz und 55 Millionen Betriebsmittel und bewertet über <strong>410.000</strong> Anschlussbegehren pro Jahr automatisiert. Vorstandschef Leonhard Birnbaum erwartet, dass das Unternehmen bis 2030 „alle sieben Sekunden eines Arbeitstags einen Anschluss“ herstellen muss (Gespräch mit Eurelectric).",
        },
        {
          title: "Vorsprung beim Smart Meter",
          body: "E.ON war der erste deutsche Versorger mit über <strong>1 Million</strong> installierten intelligenten Messsystemen, eine Rollout-Quote von rund 30 Prozent bei den eigenen Verteilnetzbetreibern gegenüber den gesetzlichen 20 Prozent zum Jahresende 2025. Fast die Hälfte aller Smart Meter in Deutschland steht in E.ON-Netzgebieten. Die Messtechnik ist die Grundlage, auf der §14a-Flexibilität und dynamische Tarife überhaupt laufen.",
        },
        {
          title: "Rechenzentren: aus dem Engpass wird ein Produkt",
          body: "Frankfurts Netz ist praktisch voll. E.ONs im Juni 2025 angekündigte Partnerschaft mit CyrusOne bringt bis 2029 <strong>61 MW</strong> lokale Erzeugung an den FRA7-Campus. Anschlussknappheit in ein Infrastrukturprodukt zu verwandeln, ist eine Blaupause, die man im Blick behalten sollte, während der Rechenbedarf wächst.",
        },
      ],
    },
    players: {
      kicker: "03 · Die Akteure",
      title: "Vier Geschäftsmodelle, eine Wende",
      lede: "Der 2020 vollzogene Asset-Tausch zwischen E.ON und RWE hat die beiden früheren Riesen entlang der Wertschöpfungskette geteilt. EnBW blieb integriert, Vattenfall verkleinerte seinen deutschen Fußabdruck, und rund 1.500 Stadtwerke behielten die Kundenbeziehungen. Dieselben politischen Schocks treffen jedes Modell anders, und genau das macht den Vergleich lehrreich. Wählen Sie ein Unternehmen; jede Zahl stammt aus öffentlicher Berichterstattung.",
      selectorLabel: "Unternehmen wählen",
      labels: { model: "Geschäftsmodell", bet: "Die Wette", risk: "Das Hauptrisiko" },
      note: "Zur Vergleichbarkeit: EBITDA-Werte sind das jeweils selbst definierte bereinigte EBITDA für das Geschäftsjahr 2025; Investitionswerte sind die berichteten Bruttoinvestitionen 2025. Vattenfall berichtet auf Konzernebene in schwedischen Kronen und veröffentlicht keine separaten Deutschland-Summen, und die Stadtwerke sind eigenständige Unternehmen; beide werden in den Euro-Vergleichen daher weggelassen statt geschätzt. Unternehmensnamen dienen nur der Identifikation; diese Studie ist von allen genannten Unternehmen unabhängig und verwendet keine Logos oder Markenzeichen.",
      compare: {
        ebitdaTitle: "Gleiches Jahr, verschiedene Maschinen",
        ebitdaSub: "Bereinigtes EBITDA, Geschäftsjahr 2025, Milliarden Euro",
        ebitdaNote: "Quelle: Unternehmensberichterstattung zum Geschäftsjahr 2025. Bereinigtes EBITDA nach jeweils eigener Definition.",
        investTitle: "Wer 2025 wie viel investiert hat",
        investSub: "Berichtete Bruttoinvestitionen, Milliarden Euro",
        investNote: "Quelle: Unternehmensberichterstattung zum Geschäftsjahr 2025. Der RWE-Wert ist die Bruttoinvestition vor Verkäufen und Farm-downs.",
      },
      charts: {
        eonTitle: "Bereinigtes EBITDA nach Segment, 2025, Milliarden Euro",
        rweTitle: "RWE, berichtete Ergebnisse, Milliarden Euro",
        rweEbitda: "Bereinigtes EBITDA",
        rweNi: "Bereinigter Konzernüberschuss",
        enbwTitle: "EnBW, bereinigtes EBITDA, Milliarden Euro",
        enbwActual: "Berichtet",
        enbwTarget: "Ambition 2030, Mittelwert",
        swTitle: "Stadtwerke, Marktanteile im Vertrieb, Prozent",
        heat: "Wärme",
        electricity: "Strom",
        gas: "Gas",
      },
      companies: {
        eon: {
          name: "E.ON",
          model: "Regulierte Verteilnetze und Energievertrieb in Europa, ohne eigene Großerzeugung. Europas größter Verteilnetzbetreiber, im nächsten Abschnitt im Detail betrachtet.",
          bet: "Dass sich regulierte Netzinvestitionen verzinsen: 48 Milliarden Euro geplante Investitionen für 2026 bis 2030, mit dem Ziel von rund 13 Milliarden Euro EBITDA im Jahr 2030.",
          risk: "Regulatorische Verzinsung und Finanzierungsspielraum. Die Anschluss-Warteschlange bindet Ingenieurkapazität und politisches Kapital.",
          tiles: [
            { label: "Bereinigtes EBITDA 2025", value: "9,8", unit: "Mrd. €", delta: "+9 % gegenüber 2024" },
            { label: "Investitionen 2025", value: "8,5", unit: "Mrd. €" },
            { label: "Vertriebskunden", value: "46,8", unit: "Mio." },
            { label: "Netz in Deutschland", value: "700 Tsd.", unit: "km" },
          ],
          srcNote: "Zahlen: E.ON Jahresergebnis 2025 (EQS/Investegate, März 2026).",
        },
        rwe: {
          name: "RWE",
          model: "Erzeugung und Handel: Europas drittgrößter Betreiber von Erneuerbaren und die Nummer zwei bei Offshore-Wind, ohne Netze und ohne Massenkundenvertrieb. Die andere Hälfte des Asset-Tauschs von 2020.",
          bet: "Dass der Bau flexibler Erzeugung und Erneuerbarer mehr einbringt, als er kostet: 35 Milliarden Euro Nettoinvestitionen bis 2031, hin zu einem Portfolio von 65 GW.",
          risk: "Marktpreisrisiko. Capture-Preise, Negativstunden und Politikwechsel schlagen direkt auf das Ergebnis durch, das von 2024 auf 2025 nachgab.",
          tiles: [
            { label: "Bereinigtes EBITDA 2025", value: "5,1", unit: "Mrd. €", delta: "5,7 im Jahr 2024" },
            { label: "Bereinigter Überschuss 2025", value: "1,8", unit: "Mrd. €", delta: "2,3 im Jahr 2024" },
            { label: "Bruttoinvestitionen 2025", value: "11", unit: "Mrd. €" },
            { label: "Portfolioziel 2031", value: "65", unit: "GW" },
          ],
          srcNote: "Zahlen: RWE Jahresberichterstattung 2025 und Investorenkommunikation.",
        },
        enbw: {
          name: "EnBW",
          model: "Die integrierte Ausnahme: Übertragungsnetz (TransnetBW), Verteilnetze (Netze BW), Erzeugung und Vertrieb unter einem weitgehend öffentlichen Dach.",
          bet: "Dass sich Integration durch die Wende trägt: Rekord-Bruttoinvestitionen von 7,6 Milliarden Euro im Jahr 2025, davon 87 Prozent in Wachstum, hin zu einer EBITDA-Ambition von 5,8 bis 6,6 Milliarden Euro für 2030.",
          risk: "Die Eigenkapitalgrenze. Für das Programm war bereits eine Kapitalerhöhung von rund 3,1 Milliarden Euro nötig.",
          tiles: [
            { label: "Bereinigtes EBITDA 2025", value: "5,1", unit: "Mrd. €", delta: "+3 % gegenüber 2024" },
            { label: "EBITDA Netzsegment", value: "≈2,7", unit: "Mrd. €", delta: "+20 % gegenüber 2024" },
            { label: "Bruttoinvestitionen 2025", value: "7,6", unit: "Mrd. €", delta: "+22 % gegenüber 2024" },
            { label: "Kapitalerhöhung", value: "≈3,1", unit: "Mrd. €" },
          ],
          srcNote: "Zahlen: EnBW Geschäftsjahr 2025. Die Ambition von 5,8 bis 6,6 Milliarden Euro für 2030 ist mit ihrem Mittelwert dargestellt.",
        },
        vattenfall: {
          name: "Vattenfall · Deutschland",
          model: "Der fokussierte Gast: im Eigentum des schwedischen Staates, in Deutschland nach dem Verkauf des Berliner Wärmegeschäfts an das Land Berlin 2024 nur noch Erneuerbare und Vertrieb.",
          bet: "Dass Offshore-Wind und zwei Vertriebshochburgen das Deutschlandgeschäft tragen: über 5 Milliarden Euro Investitionen in Deutschland bis 2028, mit der Anfang 2025 beschlossenen Errichtung der 1,6-GW-Windparks Nordlicht.",
          risk: "Konzentration. Nach dem Wärme-Ausstieg ruht der deutsche Fußabdruck auf wenigen Großprojekten und den Vertriebsbeständen in Berlin und Hamburg.",
          tiles: [
            { label: "Investitionen in Deutschland bis 2028", value: ">5", unit: "Mrd. €" },
            { label: "Nordlicht 1 und 2, beschlossen 2025", value: "1,6", unit: "GW" },
            { label: "Verkauf Berliner Wärme, 2024", value: "≈1,4", unit: "Mrd. €" },
          ],
          srcNote: "Zahlen: Vattenfall-Pressemitteilungen 2024 und 2025. Konzernergebnisse werden in schwedischen Kronen berichtet, daher hier kein Euro-Diagramm.",
        },
        stadtwerke: {
          name: "Stadtwerke",
          model: "Kein einzelnes Unternehmen, sondern rund 1.500: kommunale Versorger, die die Kundenbeziehungen des deutschen Energiesystems halten; die größten, in Köln und München, haben die Größe mittlerer Versorger.",
          bet: "Nähe. Rund zwei Drittel des Strom- und Gasvertriebs und 91 Prozent der Wärme, also des Sektors, in dem die Wende am schwersten ist und lokales Vertrauen am meisten zählt.",
          risk: "Dünnes Eigenkapital. Kommunale Eigentümer entnehmen Dividenden, während Netze und Wärmenetze Transformationskapital brauchen; ein strukturelles Finanzierungsproblem, und ein großer Beratungsmarkt.",
          tiles: [
            { label: "VKU-Mitgliedsunternehmen", value: "1.592", unit: "" },
            { label: "Branchenumsatz 2022", value: "194", unit: "Mrd. €" },
            { label: "Beschäftigte", value: "≈309", unit: "Tsd." },
            { label: "Marktanteil Wärme", value: "91", unit: "%" },
          ],
          srcNote: "Zahlen: VKU-Statistik (2022) und Fachberichterstattung zu Marktanteilen im Vertrieb.",
        },
      },
    },
    sim: {
      kicker: "05 · Ein interaktives Lastmodell",
      title: "Wie viel neue Last trifft das Netz bis 2030?",
      lede: "Wie viel zusätzliche Spitzenlast erreicht die deutschen Verteilnetze bis 2030, und was kostet es ungefähr, sie aufzunehmen? Bewegen Sie die Regler oder wählen Sie ein Szenario. Jeder Koeffizient ist in der Modellkarte dokumentiert. Das Modell ist bewusst einfach; sein Zweck ist zu zeigen, welcher Hebel dominiert, nicht zu prognostizieren.",
      scenarios: "Szenarien",
      scenarioNames: { base: "Basisszenario", policy: "Politische Ziele", slow: "Langsamer Pfad" },
      params: {
        ev: { label: "Zusätzliche E-Autos bis 2030", unit: "Mio.", hint: "2025 waren etwa 1,8 Millionen BEV zugelassen. Das frühere politische Ziel lautete 15 Millionen bis 2030." },
        hp: { label: "Zusätzliche Wärmepumpen bis 2030", unit: "Mio.", hint: "Der Absatz erreichte 2023 mit etwa 356.000 pro Jahr seinen Höchststand. Die politische Ambition lag bei 500.000 pro Jahr." },
        dc: { label: "Zusätzliche Rechenzentrumslast bis 2030", unit: "GW", hint: "Bitkom erwartet einen Anstieg der IT-Anschlussleistung von 2,7 auf etwa 4,8 GW bis 2030." },
        flex: { label: "Anteil aktiv gesteuerter neuer Lasten", unit: "%", hint: "Gesteuertes Laden und §14a-Steuerung verringern die Gleichzeitigkeit der Last." },
      },
      out: {
        peak: "Zusätzliche Spitzenlast",
        energy: "Zusätzlicher Jahresverbrauch",
        capex: "Implizierter Verteilnetz-Invest",
        capexUnit: "Mrd. €",
        peakNote: "Beitrag zur zusätzlichen Spitzenlast",
        takeaway: "Dieses Szenario erzeugt <strong>{peak} GW</strong> zusätzliche gleichzeitige Spitzenlast, rund <strong>{share} Prozent</strong> der heutigen Jahreshöchstlast von etwa 79 GW. Sie aufzunehmen erfordert Verteilnetz-Investitionen in der Größenordnung von <strong>{capex} Milliarden Euro</strong>. Flexibilität ist der günstigste Hebel auf diesem Brett: Sie senkt die Spitze, ohne den Verbrauch zu senken.",
      },
      contrib: { ev: "Elektrofahrzeuge", hp: "Wärmepumpen", dc: "Rechenzentren" },
      modelCardTitle: "Modellkarte: jede Annahme, mit Quelle",
      modelCardBody: "<p><strong>Spitzenlast.</strong> <code>ΔP = N_EV · 11 kW · g_EV + N_WP · 2,8 kW · g_WP + P_RZ · 0,9</code>. Der Gleichzeitigkeitsfaktor für E-Autos beträgt g_EV = 0,20 bei ungesteuertem Heimladen und sinkt mit steigendem Steuerungsanteil um bis zu 60 Prozent (gesteuertes Laden; Consentec 2020, Probst 2014). Die elektrische Auslegungsleistung einer Wärmepumpe liegt bei etwa 2,8 kW (Luft-Wasser, inklusive Zusatzheizung; ZVEI 2023), mit g_WP = 0,75 bei Kältewelle, per §14a-Steuerung um bis zu 40 Prozent reduzierbar. Das Gesetz garantiert eine Mindestleistung von 4,2 kW, die Flexibilität ist also begrenzt. Rechenzentren laufen nahezu konstant, mit einem Lastfaktor von 0,9.</p><p><strong>Energie.</strong> Ein E-Auto braucht etwa 2,5 MWh pro Jahr (rund 14.000 km bei 18 kWh je 100 km). Eine Wärmepumpe braucht etwa 4,5 MWh pro Jahr (Richtwerte des BWP). Rechenzentren sind mit 0,8 Auslastung über 8.760 Stunden angesetzt.</p><p><strong>Investitions-Näherung.</strong> Etwa 2,8 Milliarden Euro je GW zusätzlicher gleichzeitiger Spitzenlast, abgeleitet aus der BDEW/ZVEI-Schätzung von 323 Milliarden Euro Verteilnetz-Investitionsbedarf bis 2045, verteilt auf die zu integrierende Last und Erzeugung. Das ist eine Größenordnung, kein Preis: Die tatsächlichen Kosten hängen von lokalen Reserven, der Gleichzeitigkeit mit der Solareinspeisung und dem durch digitale Betriebsführung vermiedenen Ausbau ab.</p><p><strong>Grenzen.</strong> Das Modell ist statisch, national und linear. Es kennt keine regionale Auflösung, keine Solareinspeisespitzen (die viele ländliche Netze tatsächlich dimensionieren) und keine Preisrückkopplung. Es beantwortet ehrlich genau eine Frage: welcher Hebel die Zahl bewegt.</p>",
    },
    plays: {
      kicker: "06 · Was folgt",
      title: "Vier Fragen, vier Antworten",
      lede: "Was ich einem Vorstand vortragen würde, mit dem Vorbehalt, dass ein externer Analyst immer weniger sieht als die Menschen im Raum. Jede Empfehlung beantwortet ein gemessenes Problem aus den vorigen Abschnitten und benennt die Kennzahlen, die ich verfolgen würde.",
      items: [
        {
          tag: "1 · Netze",
          title: "Die Warteschlange nach Reife ordnen, nicht nach Eingangsdatum",
          body: "Bundesweit sind über 500 GW Speicher-Anschlussbegehren anhängig; E.ON allein meldet etwa 330 GW. Warteschlangen nach dem Windhundprinzip halten inzwischen Rechenzentren und Industrie hinter Projekten fest, die nur auf dem Papier existieren. Die Abhilfe ist prozedural: die Warteschlange nach Projektreife prüfen (gesicherte Fläche, Genehmigungen, Finanzierung) mit veröffentlichten Kriterien, rückzahlbare Reservierungsgebühren erheben, damit Spekulation einen Preis bekommt, Kapazitätskarten aus dem digitalen Zwilling veröffentlichen, damit Entwickler machbare Netzknoten selbst finden, und abregelbare Anschlussverträge als Überholspur anbieten.",
          kpi: "Kennzahlen: Median-Zeit bis zum Anschlussangebot · Anteil der Warteschlange mit nachgewiesener Reife · GW abgeschlossener flexibler Anschlussverträge",
        },
        {
          tag: "2 · Kapital",
          title: "Das Investitionsprogramm als Portfolio führen",
          body: "E.ON plant 48 Milliarden Euro Investitionen zwischen 2026 und 2030, in einer Branche, deren Finanzierungslücke KfW und PwC auf 346 Milliarden Euro bis 2045 beziffern. EnBW hat bereits eine Kapitalerhöhung von 3,1 Milliarden Euro gebraucht; die Knappheit ist real. Das Programm als Kapitalallokations-Portfolio zu führen heißt: Kapital über Minderheitsbeteiligungen an reifen Netzen recyceln, Instrumente unterstützen, die die Kostendeckung über Generationen strecken (die Debatte um das Amortisationskonto), und die NEST-Eigenkapitalfrage mit quantifizierter Evidenz führen statt mit Lobbyprosa.",
          kpi: "Kennzahlen: FFO zu Nettoverschuldung im Rating-Korridor · realisiertes Wachstum der Anlagenbasis gegen Plan · Abstand der regulatorischen Verzinsung zu den Kapitalkosten",
        },
        {
          tag: "3 · Vertrieb und Flexibilität",
          title: "Haushaltsflexibilität zum Produkt machen",
          body: "573 Negativpreis-Stunden im Jahr 2025, Steuerungsrechte nach §14a EnWG, zeitvariable Netzentgelte und verpflichtende dynamische Tarife machen Haushaltsflexibilität erstmals zu einer handelbaren Größe. Ein Bündel aus dynamischem Tarif, Wallbox, Wärmepumpe und Heimspeicher kann Verbrauch in günstige Stunden verschieben und die aggregierte Flexibilität ins Engpassmanagement verkaufen. Der Vertrieb hört dann auf, ein schrumpfendes Commodity-Geschäft zu sein, und wird zur Plattform, über die das System die Haushalte erreicht.",
          kpi: "Kennzahlen: MW gesteuerter §14a-Last im Portfolio · Smart-Meter-Quote gegen den Pfad von 20 zu 95 Prozent · Kündigungsquote der Flex-Bündel gegen Commodity-Verträge",
        },
        {
          tag: "4 · Betrieb",
          title: "KI dort einsetzen, wo sie Investitionen aufschiebt",
          body: "Drei Anwendungen halten einer Prüfung stand. Probabilistische Lastflussrechnung auf dem digitalen Zwilling verkürzt Planungszyklen von Monaten auf Tage und schiebt physischen Ausbau auf. Unterstützung für den Außendienst zählt in einem Land mit über 18.000 unbesetzten Elektriker-Stellen. Und die bestehende Kundenservice-Automatisierung von rund 70 Prozent lässt sich in die Tarifberatung erweitern, die zu einem Datenproblem geworden ist, das Kunden allein nicht lösen können. All das muss innerhalb der NIS2- und KRITIS-Regeln arbeiten; Cybersicherheit ist in Deutschland seit Dezember 2025 Vorstandspflicht.",
          kpi: "Kennzahlen: Planungszykluszeit · aufgeschobener Invest je Euro Digitalausgaben · Servicekosten je Kunde · Automatisierungsquote mit einer Untergrenze für Kundenzufriedenheit",
        },
      ],
    },
    method: {
      kicker: "07 · Methodik",
      title: "Wie diese Studie entstanden ist",
      lede: "Gebaut, wie eine Analyse meiner Überzeugung nach gebaut sein sollte: jede Zahl auf eine Primärquelle zurückführbar, jede abgeleitete Statistik aus Code reproduzierbar, jede Modellannahme offengelegt.",
      prose: "<p>Alle quantitativen Aussagen führen auf das Quellenverzeichnis unten zurück. Wo immer möglich habe ich Primärquellen verwendet: Bundesnetzagentur und SMARD, Fraunhofer ISE, Agora Energiewende, BDEW, KBA, KfW und Unternehmensberichte. Abgeleitete Statistiken, etwa der Trend gegen das 80-Prozent-Ziel, die Korrelation zwischen Solarleistung und Negativpreis-Stunden und die kumulierten Redispatch-Kosten, werden in der <a href='https://github.com/JeelSwami/energiewende-decoded/tree/main/analysis' target='_blank' rel='noopener'>Python-Analyseschicht</a> des Repositories berechnet. Die Datensätze liegen als CSV-Dateien mit einem Datenwörterbuch bei, das auch festhält, wo Quellen voneinander abweichen. Wo Zahlen für 2026 noch nicht veröffentlicht waren, werden die letzten Ganzjahreswerte verwendet und entsprechend gekennzeichnet.</p><p>Die Seite selbst besteht aus reinem HTML, CSS und JavaScript. Die Diagramme sind von Hand geschriebenes SVG mit Tastaturnavigation und einer Tabellenansicht für jede Abbildung, und das Farbsystem ist für Farbfehlsichtigkeit in Hell- und Dunkelmodus geprüft. Diese Arbeit ist für Studium und Forschung mit Namensnennung frei nutzbar; kommerzielle Nutzung erfordert meine Zustimmung, und die zugrunde liegenden Daten bleiben Eigentum ihrer ursprünglichen Herausgeber. Diese Studie ist bildende Forschung, keine Anlageberatung und keine Anlageempfehlung. Die Seite setzt keine Cookies und kein Tracking ein; sie speichert nur Ihre Sprach- und Themenwahl im Browser und wird auf GitHub Pages gehostet, dessen Server technische Zugriffsprotokolle verarbeiten.</p>",
      sourcesTitle: "Quellenverzeichnis",
    },
    faq: {
      kicker: "08 · Fragen aus der Forschung",
      title: "Ein kurzes FAQ",
      lede: "Fragen, die mir beim Erstellen dieser Studie gestellt wurden oder die ich mir selbst gestellt habe. Fehlt Ihre, schreiben Sie mir.",
      items: [
        {
          q: "Woher stammen die Daten, und darf ich sie weiterverwenden?",
          a: "<p>Jede Zahl führt auf das Quellenverzeichnis oben zurück, und die CSV-Dateien im Repository benennen die Quelle je Datensatz. Die zugrunde liegenden Daten gehören ihren ursprünglichen Herausgebern. Meine Zusammenstellung, Texte und Code sind für Studium, Lehre und Forschung mit Namensnennung frei; kommerzielle Nutzung erfordert meine schriftliche Zustimmung. Wer Primärdaten weiterveröffentlicht, nennt bitte den ursprünglichen Herausgeber, nicht mich.</p>",
        },
        {
          q: "Warum werden Strompreise überhaupt negativ?",
          a: "<p>Day-Ahead-Preise fallen unter null, wenn unflexible Erzeugung plus geförderte erneuerbare Einspeisung gleichzeitig Nachfrage und Exportkapazität übersteigen. Anlagen, die Förderzahlungen erhalten oder deren Drosselung teuer ist, speisen auch dann ein, wenn sie dafür zahlen müssen. Deutschland verzeichnete 2025 573 solcher Stunden. Seit dem Solarspitzengesetz von Anfang 2025 erhalten neue Solaranlagen in Negativpreis-Stunden keine Förderung mehr, was die Argumente für Speicher und Lastverschiebung stärkt.</p>",
        },
        {
          q: "Agora meldet 55,1 Prozent Erneuerbare für 2025, Fraunhofer 55,9. Was stimmt?",
          a: "<p>Beides, denn die Zahlen beantworten verschiedene Fragen. 55,1 Prozent ist der Erneuerbaren-Anteil am Bruttostromverbrauch, die Messgröße hinter dem 80-Prozent-Ziel für 2030 (AGEE-Stat, Agora). 55,9 Prozent ist der Erneuerbaren-Anteil an der öffentlichen Nettostromerzeugung, die die industrielle Eigenversorgung ausklammert und einen anderen Nenner verwendet (Fraunhofer ISE Energy-Charts). Beide zu vermischen ist einer der häufigsten Fehler in Texten über die Energiewende; deshalb benennt diese Seite bei jedem Diagramm ihre Messgröße.</p>",
        },
        {
          q: "Was ist Redispatch, und warum kostet es Milliarden?",
          a: "<p>Wenn das Netz nicht transportieren kann, was der Markt eingeplant hat, bezahlen die Netzbetreiber Kraftwerke auf der einen Seite des Engpasses für weniger Erzeugung und Anlagen auf der anderen Seite für mehr. Beide Eingriffe bezahlen die Verbraucher über die Netzentgelte. Zwischen 2019 und 2025 kostete dieses Engpassmanagement Deutschland rund 18 Milliarden Euro, davon 3,1 Milliarden allein 2025. Es ist das deutlichste Preisschild an der Lücke zwischen dem Ort der Erzeugung und der Transportfähigkeit des Netzes.</p>",
        },
        {
          q: "Was ändert §14a EnWG konkret?",
          a: "<p>Seit Januar 2024 dürfen Verteilnetzbetreiber die Leistungsaufnahme steuerbarer Geräte wie Wärmepumpen, Wallboxen und Heimspeicher bei lokaler Netzüberlastung vorübergehend reduzieren, aber nie unter garantierte 4,2 kW. Im Gegenzug zahlen die betroffenen Kunden reduzierte Netzentgelte, und ein weiteres Modul führt zeitvariable Entgelte ein. Für die Forschung zu Haushaltsflexibilität ist dieser Paragraf derzeit das interessanteste natürliche Experiment in Deutschland.</p>",
        },
        {
          q: "Wie ernst darf ich das Lastmodell nehmen?",
          a: "<p>Als Werkzeug für Größenordnungen, nicht als Prognose. Es ist ein statisches lineares Modell mit belegten Koeffizienten und dokumentierten Grenzen, und sein Zweck ist zu zeigen, welcher Hebel das Lastbild dominiert. Für echte Netzplanung bräuchte man regionale Auflösung, Solareinspeisespitzen und probabilistische Gleichzeitigkeit, also das, was die digitalen Zwillinge der Netzbetreiber leisten. Die Modellkarte nennt jede Annahme, damit man ihr präzise widersprechen kann.</p>",
        },
        {
          q: "Wo beginnt man als Forscherin oder Forscher mit deutschen Energiedaten?",
          a: "<p>Vier Portale decken die meisten Bedürfnisse ab. SMARD (smard.de) veröffentlicht die Marktdaten der Bundesnetzagentur. Energy-Charts (energy-charts.info) vom Fraunhofer ISE liefert Erzeugung, Leistung und Preise mit einer guten Schnittstelle. Das Marktstammdatenregister verzeichnet jede registrierte Erzeugungsanlage des Landes. Destatis liefert die amtliche Statistik. Für die Synthese ist der Jahresrückblick von Agora Energiewende das beste Einzeldokument, und der Datenordner dieses Repositories hält fest, welche Quelle jedes Diagramm verwendet.</p>",
        },
      ],
    },
    ack: {
      kicker: "09 · Danksagung",
      title: "Anerkennung, wo sie hingehört",
      body: "<p>Diese Studie steht auf der öffentlichen Arbeit der Institutionen, die das deutsche Energiesystem vermessen und ihre Ergebnisse veröffentlichen. Für Daten und Analysen danke ich der <strong>Bundesnetzagentur</strong> und ihrer Plattform SMARD, dem <strong>Fraunhofer ISE</strong> und dem Energy-Charts-Team, <strong>Agora Energiewende</strong>, dem <strong>BDEW</strong>, dem <strong>Bundesverband Wärmepumpe</strong>, dem <strong>Kraftfahrt-Bundesamt</strong>, der <strong>FfE</strong> in München, <strong>AGEE-Stat</strong> beim BMWK, dem <strong>Umweltbundesamt</strong> sowie <strong>KfW Research</strong> und <strong>PwC</strong>.</p><p>Die Koeffizienten des Lastmodells beruhen auf Arbeiten von <strong>Consentec</strong>, dem <strong>ZVEI</strong> und der Dissertation von <strong>A. Probst</strong> an der Universität Stuttgart. Unternehmensinformationen stammen von der Investor-Relations-Seite der <strong>E.ON SE</strong>, von <strong>envelio</strong>, <strong>Eurelectric</strong> und <strong>CyrusOne</strong>; Branchenstudien von <strong>Roland Berger</strong>, <strong>BCG</strong> und <strong>McKinsey</strong>. Wo Primärdokumente hinter Bezahlschranken lagen oder noch nicht erschienen waren, haben die Berichte von <strong>Clean Energy Wire</strong>, <strong>pv magazine</strong>, <strong>ESS News</strong>, <strong>ZfK</strong> und <strong>Tagesspiegel Background</strong> die Lücken gefüllt.</p><p>Fehler in Zusammenstellung oder Interpretation gehen allein auf mich.</p>",
    },
    about: {
      kicker: "10 · Über mich",
      title: "Über den Autor",
      name: "Jeel Swami",
      p1: "Ich bin Physiker und arbeite in der Datenanalyse, auf dem Weg in die Energiewirtschaft. Mich halten die Probleme fest, in denen Regulierung, Technik und Kapital aufeinandertreffen, und das deutsche Stromnetz ist genau so ein Problem.",
      p2: "Mein Forschungshintergrund liegt in der rechnergestützten und experimentellen Festkörperphysik: Ich habe die elektronischen und magnetischen Eigenschaften korrelierter Perowskit-Materialien untersucht und anschließend als Postdoc zu Materialien für die Energiewissenschaft geforscht. Seither liegt meine Arbeit an der Schnittstelle von Physik, Daten und KI, wo ich Modelle für wissenschaftliches Denken trainiere und bewerte. Dieses Projekt überträgt die Gewohnheiten aus dieser Ausbildung auf Energiestrategie. Belegte Daten, reproduzierbare Analysen und Modelle, deren Annahmen dort stehen, wo jeder sie prüfen kann.",
      p3: "Ich arbeite auf Deutsch und Englisch und habe mir auf dem Weg zu C1 einen eigenen Vokabeltrainer gebaut. Wenn diese Studie für Ihre Forschung oder Ihr Team nützlich ist, freue ich mich über eine Nachricht.",
      link1: "<strong>Dieses Projekt</strong> · <a href='https://github.com/JeelSwami/energiewende-decoded' target='_blank' rel='noopener'>github.com/JeelSwami/energiewende-decoded</a>",
      link2: "<strong>EU-Forschungsförderung in NRW</strong> · <a href='https://github.com/JeelSwami/nrw-funding-dashboard' target='_blank' rel='noopener'>ein interaktives Dashboard aus CORDIS- und Eurostat-Daten</a>",
      link3: "<strong>Materialinformatik</strong> · <a href='https://github.com/JeelSwami/Materials-Band-Gap-Prediction-ML-' target='_blank' rel='noopener'>Bandlücken-Vorhersage aus Atomdeskriptoren</a>",
      link4: "<strong>Kontakt</strong> · <a href='mailto:jeel.swami@outlook.com'>jeel.swami@outlook.com</a> · <a href='https://github.com/JeelSwami' target='_blank' rel='noopener'>@JeelSwami</a>",
    },
    footer: {
      left: "© 2026 Jeel Swami · CC BY-NC 4.0 · Frei für Studium und Forschung mit Namensnennung; kommerzielle Nutzung nur mit Zustimmung. Die Daten bleiben Eigentum ihrer ursprünglichen Herausgeber.",
      right: "Datenstand: August 2026 · Von Hand gebaut, mit reinem HTML, SVG und JavaScript.",
    },
    charts: {
      resShare: {
        title: "Erneuerbaren-Anteil am Stromverbrauch",
        sub: "Anteil am Bruttostromverbrauch, Deutschland, in Prozent, gegen das 80-Prozent-Ziel für 2030",
        note: "Quelle: BMWK/AGEE-Stat und UBA über die Jahresauswertungen von Agora Energiewende; der Wert für 2025 folgt Agora, „Die Energiewende in Deutschland: Stand der Dinge 2025“.",
      },
      genMix: {
        title: "Woher der deutsche Strom 2025 kam",
        sub: "Öffentliche Nettostromerzeugung, TWh",
        note: "Quelle: Fraunhofer ISE Energy-Charts, Jahresauswertung 2025. Insgesamt rund 419,5 TWh öffentliche Nettoerzeugung; Erneuerbaren-Anteil an dieser Messgröße 55,9 Prozent.",
        renewable: "Erneuerbar",
        fossil: "Fossil und Sonstige",
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
        title: "Installierte Leistung seit 2018",
        sub: "Gigawatt, jeweils zum Jahresende",
        note: "Quelle: Marktstammdatenregister und Bundesnetzagentur, über Fraunhofer ISE Energy-Charts.",
        solar: "Photovoltaik",
        windOn: "Wind an Land",
        windOff: "Wind auf See",
      },
      redispatch: {
        title: "Was Engpässe kosten",
        sub: "Engpassmanagement (Redispatch und verwandte Maßnahmen), Milliarden Euro pro Jahr",
        note: "Quelle: Engpassmanagement-Berichte der Bundesnetzagentur. Die Summe 2019 bis 2025 beträgt 18,4 Milliarden Euro, berechnet in der Analyseschicht des Repositories.",
      },
      negPrices: {
        title: "Stunden unter null",
        sub: "Stunden mit negativen Day-Ahead-Großhandelspreisen pro Jahr",
        note: "Quelle: Fraunhofer ISE und FfE, EPEX-Day-Ahead-Daten. Die Korrelation mit der installierten Solarleistung beträgt Pearson r = 0,82; siehe den Analyseordner.",
      },
      heatPumps: {
        title: "Wärmepumpen-Absatz: Einbruch und Erholung",
        sub: "Verkaufte Heizungswärmepumpen in Deutschland, Tausend Stück pro Jahr",
        note: "Quelle: Bundesverband Wärmepumpe (BWP). 2025 erreichte der Absatz 299.000 Stück (+55 Prozent); erstmals wurden mehr Wärmepumpen als Gaskessel verkauft.",
      },
      ev: {
        title: "Neuzulassungen von Elektroautos",
        sub: "Neu zugelassene batterieelektrische Pkw in Deutschland, Tausend pro Jahr",
        note: "Quelle: Kraftfahrt-Bundesamt (KBA). Der BEV-Bestand überschritt zum 1. Januar 2026 die Marke von 2 Millionen.",
      },
      eonSegments: {
        title: "E.ON 2025: Ergebnis nach Segment",
        sub: "Bereinigtes EBITDA nach Segment, Milliarden Euro",
        note: "Quelle: E.ON Jahresergebnis 2025 (EQS/Investegate, März 2026). Investitionen 2025: Netze 7,0, Vertrieb etwa 0,5, Infrastructure Solutions etwa 0,9 Milliarden Euro.",
        networks: "Energienetze",
        retail: "Energievertrieb",
        eis: "Infrastructure Solutions",
      },
      eonPath: {
        title: "E.ONs Ergebnispfad bis 2030",
        sub: "Bereinigtes Konzern-EBITDA, Milliarden Euro: berichtete Werte und Unternehmensziele",
        note: "Quelle: E.ON Jahresergebnis 2025 und Guidance. 2026e ist die Mitte der Guidance; 2028t und 2030t sind Unternehmensziele (über 11,3 bzw. etwa 13 Milliarden Euro).",
        actual: "Berichtet",
        target: "Guidance / Ziel",
      },
    },
    kpis: {
      hero: [
        { label: "Erneuerbaren-Anteil am Verbrauch 2025", value: "55,1", unit: "%" },
        { label: "Stunden mit Negativpreisen 2025", value: "573", unit: "h", delta: "Rekord; 457 im Jahr 2024" },
        { label: "Netzinvestitionsbedarf bis 2045", value: "360+", unit: "Mrd. €", delta: "BNetzA-basierte Schätzung" },
        { label: "Batterieprojekte in der Warteschlange", value: ">500", unit: "GW", delta: "bei einer Höchstlast nahe 80 GW" },
      ],
      bottleneck: [
        { label: "Speicher-Anfragen (BDEW-Abfrage 2025)", value: ">720", unit: "GW" },
        { label: "Großspeicher tatsächlich in Betrieb", value: "≈2,5", unit: "GW", delta: "Ende 2025" },
        { label: "Rechenzentrums-Anfragen bei einem E.ON-VNB", value: "16,8", unit: "GW", delta: "Mitnetz Strom, 90 Projekte" },
        { label: "Verteilnetz-Investitionsbedarf bis 2033", value: "≈110", unit: "Mrd. €" },
      ],
      eon: [
        { label: "Bereinigtes EBITDA 2025", value: "9,8", unit: "Mrd. €", delta: "+9 % gegenüber 2024", deltaGood: true },
        { label: "Investitionsplan 2026 bis 2030", value: "48", unit: "Mrd. €" },
        { label: "Vertriebskunden in Europa", value: "46,8", unit: "Mio." },
        { label: "Betriebenes Netz in Deutschland", value: "700 Tsd.", unit: "km", delta: "rund 110 GW Erneuerbare angeschlossen" },
      ],
    },
  };

  /* ---------------- charts ---------------- */

  function charts(h) {
    const t = h.t;
    const specs = [];

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

    specs.push({
      id: "chart-gen-mix",
      titleKey: "charts.genMix.title",
      subKey: "charts.genMix.sub",
      noteKey: "charts.genMix.note",
      render: h.hbars({
        items: D.genMix.map((g) => ({
          label: t("charts.genMix." + g.key), value: g.twh,
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
        rows: D.genMix.map((g) => [t("charts.genMix." + g.key), h.fmt(g.twh, 1)]),
      },
    });

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

    specs.push({
      id: "chart-peer-ebitda",
      titleKey: "players.compare.ebitdaTitle",
      subKey: "players.compare.ebitdaSub",
      noteKey: "players.compare.ebitdaNote",
      render: h.hbars({
        items: D.peers.ebitda2025.map((d) => ({ label: d.name, value: d.v, colorIdx: 0, note: "EBITDA" })),
        unit: t("sim.out.capexUnit"), dec: 1,
        ariaLabel: t("players.compare.ebitdaTitle"),
      }),
      table: {
        headers: ["", t("sim.out.capexUnit")],
        rows: D.peers.ebitda2025.map((d) => [d.name, h.fmt(d.v, 1)]),
      },
    });

    specs.push({
      id: "chart-peer-invest",
      titleKey: "players.compare.investTitle",
      subKey: "players.compare.investSub",
      noteKey: "players.compare.investNote",
      render: h.hbars({
        items: D.peers.invest2025.map((d) => ({ label: d.name, value: d.v, colorIdx: 0, note: "" })),
        unit: t("sim.out.capexUnit"), dec: 1,
        ariaLabel: t("players.compare.investTitle"),
      }),
      table: {
        headers: ["", t("sim.out.capexUnit")],
        rows: D.peers.invest2025.map((d) => [d.name, h.fmt(d.v, 1)]),
      },
    });

    return specs;
  }

  /* ---------------- company panels ---------------- */

  function players(h) {
    const t = h.t;
    const ids = ["eon", "rwe", "enbw", "vattenfall", "stadtwerke"];
    const charts = {
      eon: {
        title: t("players.charts.eonTitle"),
        render: h.hbars({
          items: D.eonSegments.map((s) => ({ label: t("charts.eonSegments." + s.key), value: s.ebitda, colorIdx: 0, note: "EBITDA" })),
          unit: t("sim.out.capexUnit"), dec: 2,
          ariaLabel: t("players.charts.eonTitle"),
        }),
      },
      rwe: {
        title: t("players.charts.rweTitle"),
        render: h.columns({
          labels: D.peers.rwe.years,
          series: [
            { name: t("players.charts.rweEbitda"), values: D.peers.rwe.ebitda, colorIdx: 0 },
            { name: t("players.charts.rweNi"), values: D.peers.rwe.ni, colorIdx: 1 },
          ],
          unit: t("sim.out.capexUnit"), dec: 1,
          ariaLabel: t("players.charts.rweTitle"),
        }),
      },
      enbw: {
        title: t("players.charts.enbwTitle"),
        render: h.columns({
          labels: D.peers.enbw.labels,
          series: [
            { name: t("players.charts.enbwActual"), values: D.peers.enbw.actual, colorIdx: 0 },
            { name: t("players.charts.enbwTarget"), values: D.peers.enbw.target, colorIdx: 2 },
          ],
          unit: t("sim.out.capexUnit"), dec: 1,
          ariaLabel: t("players.charts.enbwTitle"),
        }),
      },
      vattenfall: null,
      stadtwerke: {
        title: t("players.charts.swTitle"),
        render: h.hbars({
          items: D.peers.sw.map((d) => ({ label: t("players.charts." + d.key), value: d.v, colorIdx: 0, note: "" })),
          unit: "%", dec: 0, maxVal: 100,
          ariaLabel: t("players.charts.swTitle"),
        }),
      },
    };
    return {
      companies: ids.map((id) => {
        const c = t("players.companies." + id);
        return {
          id,
          name: c.name,
          model: c.model,
          bet: c.bet,
          risk: c.risk,
          tiles: c.tiles,
          srcNote: c.srcNote,
          chart: charts[id],
        };
      }),
    };
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

  /* ---------------- load model ---------------- */

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
      const gHP = 0.75 * (1 - 0.4 * flex);        // cold-spell coincidence, bounded by §14a
      const evGW = s.ev * 11 * gEV;               // millions × kW gives GW
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
    { name: "Bundesnetzagentur / SMARD: annual electricity market data", url: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2026/20260104_SMARD.html", desc: { en: "generation, consumption, prices", de: "Erzeugung, Verbrauch, Preise" } },
    { name: "Agora Energiewende: Die Energiewende in Deutschland, Stand der Dinge 2025", url: "https://www.agora-energiewende.de/fileadmin/Projekte/2025/2025-28_DE_JAW25/A-EW_391_Die_Energiewende_in_Deutschland_Stand_der_Dinge_2025_WEB.pdf", desc: { en: "annual review: renewables share, emissions, policy", de: "Jahresauswertung: EE-Anteil, Emissionen, Politik" } },
    { name: "Fraunhofer ISE: Energy-Charts", url: "https://www.energy-charts.info/", desc: { en: "public net electricity generation and installed capacity", de: "öffentliche Nettostromerzeugung und installierte Leistung" } },
    { name: "Fraunhofer ISE: public electricity generation 2025", url: "https://www.ise.fraunhofer.de/en/press-media/press-releases/2026/german-public-electricity-generation-in-2025-wind-and-solar-power-take-the-lead.html", desc: { en: "the 2025 generation mix; wind and solar in the lead", de: "Erzeugungsmix 2025; Wind und Solar erstmals vorn" } },
    { name: "FfE: German electricity prices on the EPEX Spot exchange in 2025", url: "https://www.ffe.de/en/publications/german-electricity-prices-on-the-epex-spot-exchange-in-2025/", desc: { en: "573 negative-price hours in 2025, a record", de: "573 Negativpreis-Stunden 2025, ein Rekord" } },
    { name: "BMWK / AGEE-Stat: renewables time series", url: "https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Downloads/Energie/zeitreihen-zur-entwicklung-der-erneuerbaren-energien-in-deutschland-1990-2024.pdf", desc: { en: "renewables share of gross consumption, 2015 to 2024", de: "EE-Anteil am Bruttostromverbrauch, 2015 bis 2024" } },
    { name: "BWP: heat pump sales statistics", url: "https://www.waermepumpe.de/presse/zahlen-daten/absatzzahlen/", desc: { en: "annual heat pump sales; 299,000 in 2025", de: "Wärmepumpen-Absatz; 299.000 im Jahr 2025" } },
    { name: "KBA: battery-electric vehicle registrations", url: "https://www.kba.de/DE/Presse/Pressemitteilungen/AlternativeAntriebe/2026/pm03_2026_Antriebe_12_25_komplett.html", desc: { en: "new BEV registrations; stock above 2 million on 1 Jan 2026", de: "BEV-Neuzulassungen; Bestand über 2 Mio. am 1.1.2026" } },
    { name: "BDEW: Strompreisanalyse, January 2026", url: "https://www.bdew.de/service/daten-und-grafiken/bdew-strompreisanalyse/", desc: { en: "household electricity price and its components", de: "Haushaltsstrompreis und seine Bestandteile" } },
    { name: "Bundesnetzagentur: NEST determinations, December 2025", url: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2025/20251210_NEST.html", desc: { en: "the new framework for grid regulation and returns", de: "der neue Rahmen für Netzregulierung und -verzinsung" } },
    { name: "Bundesnetzagentur: equity returns on new investments, January 2024", url: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2024/20240124_EKZins.html", desc: { en: "base rate plus 3 percent risk premium on new grid capex", de: "Basiszins plus 3 Prozent Risikoprämie für neue Netzinvestitionen" } },
    { name: "E.ON: full year 2025 results (EQS via Investegate)", url: "https://www.investegate.co.uk/announcement/eqs/e-on-ag--0mpp/eqs-news-e-on-continues-growth-path-in-2025-/9445200", desc: { en: "EBITDA of 9.8 billion euros, segments, the 48 billion plan, dividend", de: "EBITDA 9,8 Mrd. €, Segmente, der 48-Mrd.-Plan, Dividende" } },
    { name: "E.ON: half year 2025 results overview (Investing.com)", url: "https://www.investing.com/news/company-news/eon-h1-2025-slides-13-ebitda-growth-driven-by-network-expansion-guidance-confirmed-93CH-4187088", desc: { en: "targets for 2028, asset base, dividend policy", de: "Ziele 2028, Anlagenbasis, Dividendenpolitik" } },
    { name: "RWE: full year 2025 results", url: "https://www.renewable-energy-industry.com/countries/article-7294-rwe-at-the-upper-end-of-its-2025-ebitda-and-profit-guidance-eur35-billion-for-wind-power-solar-and-flexible-power-plants-by-2031", desc: { en: "EBITDA 5.1 billion euros; 35 billion of net investment to 2031", de: "EBITDA 5,1 Mrd. €; 35 Mrd. Nettoinvestitionen bis 2031" } },
    { name: "RWE: half year 2025 press release", url: "https://www.rwe.com/en/press/rwe-ag/2025-08-14-rwe-delivers-a-good-financial-performance-in-the-first-half-of-2025/", desc: { en: "portfolio and investment programme", de: "Portfolio und Investitionsprogramm" } },
    { name: "EnBW: fiscal year 2025 results", url: "https://www.enbw.com/press/enbw-2025-fiscal-year.html", desc: { en: "EBITDA 5.1 billion euros; record investment of 7.6 billion; capital increase", de: "EBITDA 5,1 Mrd. €; Rekordinvestitionen 7,6 Mrd.; Kapitalerhöhung" } },
    { name: "Vattenfall: sale of the Berlin heat business", url: "https://group.vattenfall.com/press-and-media/pressreleases/2024/vattenfall-completes-sale-of-its-heat-business-in-germany-to-the-state-of-berlin/", desc: { en: "closed May 2024", de: "vollzogen im Mai 2024" } },
    { name: "Baltic Wind: Vattenfall's investment in Germany", url: "https://balticwind.eu/vattenfall-bets-on-offshore-and-invests-e5-billion-in-germanys-energy-transition/", desc: { en: "more than 5 billion euros to 2028; Nordlicht 1 and 2", de: "über 5 Mrd. € bis 2028; Nordlicht 1 und 2" } },
    { name: "VKU and trade reporting: the municipal utilities", url: "https://energiemarie.de/stromanbieter/stadtwerke", desc: { en: "member statistics and retail market shares", de: "Mitgliederstatistik und Marktanteile im Vertrieb" } },
    { name: "envelio: E.ON's digital twin of the German distribution grid", url: "https://envelio.com/insights/eon-digital-twin-german-distribution-grid", desc: { en: "700,000 km, 55 million components, 410,000 requests a year", de: "700.000 km, 55 Mio. Betriebsmittel, 410.000 Anträge pro Jahr" } },
    { name: "Enlit: E.ON reaches one million smart meters", url: "https://www.enlit.world/library/eon-first-energy-company-to-reach-one-million-smart-meters-in-germany", desc: { en: "first German utility past one million smart meters", de: "erster deutscher Versorger über eine Million Smart Meter" } },
    { name: "pv magazine: smart meter rollout passes the 20 percent mark", url: "https://www.pv-magazine.de/2025/12/29/smart-meter-rollout-erreicht-20-prozent-marke-bei-pflichteinbaufaellen/", desc: { en: "Germany-wide rollout status at the end of 2025", de: "bundesweiter Rollout-Stand Ende 2025" } },
    { name: "Eurelectric: grid connections and the queue", url: "https://www.eurelectric.org/in-detail/what-are-grid-connections-and-how-europe-can-fix-the-queue/", desc: { en: "5.7 million connections 2024 to 2030; the Birnbaum interview", de: "5,7 Mio. Anschlüsse 2024 bis 2030; das Birnbaum-Gespräch" } },
    { name: "CyrusOne and E.ON: Frankfurt data centre partnership", url: "https://www.cyrusone.com/resources/press-releases/cyrusone-and-e.on-announce-strategic-partnership-to-overcome-data-center-grid-capacity-constraints-for-customers-in-europe", desc: { en: "61 MW of on-site generation for FRA7 by 2029", de: "61 MW lokale Erzeugung für FRA7 bis 2029" } },
    { name: "pv magazine: battery connection requests exceed 500 GW", url: "https://www.pv-magazine.com/2025/09/02/germany-battery-storage-grid-connection-requests-exceed-500-gw/", desc: { en: "the storage queue against a peak load near 80 GW", de: "die Speicher-Warteschlange bei einer Höchstlast nahe 80 GW" } },
    { name: "ESS News: BDEW survey counts over 720 GW of requests", url: "https://www.ess-news.com/2026/02/20/too-many-batteries-not-enough-grid-germanys-battery-storage-sector-wants-fixes-for-connection-waits/", desc: { en: "the queue reform debate and the Reifegradverfahren", de: "die Reformdebatte und das Reifegradverfahren" } },
    { name: "stadt-und-werk: data centre requests at Mitnetz", url: "https://www.stadt-und-werk.de/k21-meldungen/anschluss-von-rechenzentrum/", desc: { en: "90 requests totalling 16.8 GW at one E.ON DSO", de: "90 Anfragen mit 16,8 GW bei einem E.ON-VNB" } },
    { name: "Clean Energy Wire: grid investment to 2045 estimated at 651 billion euros", url: "https://www.cleanenergywire.org/news/electricity-grid-upgrades-will-cost-germany-650-billion-euros-2045-report", desc: { en: "transmission 328 plus distribution 323 billion euros", de: "Übertragung 328 plus Verteilung 323 Mrd. €" } },
    { name: "Clean Energy Wire: distribution operators need 110 billion euros by 2033", url: "https://www.cleanenergywire.org/news/germany-must-invest-eu110-bln-expanding-electricity-local-distribution-grids-2033-agency", desc: { en: "distribution grid needs following BNetzA", de: "Verteilnetzbedarf laut BNetzA" } },
    { name: "BDEW: Starke Netze", url: "https://www.bdew.de/energie/starke-netze-starke-zukunft/", desc: { en: "323 billion euros to 2045; the km build-out figures", de: "323 Mrd. € bis 2045; die km-Ausbauzahlen" } },
    { name: "KfW Research and PwC: the utilities' financing gap", url: "https://www.kfw.de/%C3%9Cber-die-KfW/Newsroom/Aktuelles/Pressemitteilungen-Details_869248.html", desc: { en: "535 billion euros of need, a 346 billion gap by 2045", de: "535 Mrd. € Bedarf, 346 Mrd. € Lücke bis 2045" } },
    { name: "Bundesregierung: the 2026 transmission fee subsidy", url: "https://www.bundesregierung.de/breg-de/aktuelles/niedrigere-netzentgelte-2382396", desc: { en: "6.5 billion euros; average transmission charge down 57 percent", de: "6,5 Mrd. €; Übertragungsnetzentgelt im Schnitt 57 Prozent niedriger" } },
    { name: "S&P Global: German solar capture price below 20 €/MWh", url: "https://www.spglobal.com/commodity-insights/en/news-research/latest-news/electric-power/061025-german-solar-capture-price-sinks-below-eur20mwh-in-may-as-cannibalization-deflates-value", desc: { en: "the erosion of solar market value", de: "die Erosion des Solar-Marktwerts" } },
    { name: "Clean Energy Wire: the electrolysis ramp-up lags", url: "https://www.cleanenergywire.org/news/ramp-germanys-green-hydrogen-electrolyser-capacity-continues-lag-behind", desc: { en: "181 MW installed against a 10 GW target", de: "181 MW installiert bei einem 10-GW-Ziel" } },
    { name: "ESIG: Germany's §14a EnWG explained", url: "https://www.esig.energy/germanys-paragraph-14a-enwg/", desc: { en: "controlling loads down to a guaranteed 4.2 kW", de: "Steuerung von Lasten bis zu garantierten 4,2 kW" } },
    { name: "Bitkom: data centres in Germany", url: "https://www.bitkom.org/Presse/Presseinformation/Rechenzentren-Deutschland-KI-treibt-Wachstum", desc: { en: "IT capacity from 2.7 to about 4.8 GW by 2030", de: "IT-Anschlussleistung von 2,7 auf etwa 4,8 GW bis 2030" } },
    { name: "IEA: Energy and AI", url: "https://www.iea.org/reports/energy-and-ai/executive-summary", desc: { en: "global data centre demand near 945 TWh by 2030", de: "globale Rechenzentrums-Nachfrage nahe 945 TWh bis 2030" } },
    { name: "Roland Berger: The golden age of the utility", url: "https://www.rolandberger.com/en/Insights/Publications/The-golden-age-of-the-utility.html", desc: { en: "only 55 percent of top utilities can finance the transformation", de: "nur 55 Prozent der Top-Versorger können die Transformation finanzieren" } },
    { name: "BCG: Europe's electricity TSOs and their capital challenge", url: "https://www.bcg.com/publications/2025/navigating-growth-capital-challenges-and-strategic-decisions-for-europes-electricity-tsos", desc: { en: "345 billion euros of capex on a 175 billion asset base", de: "345 Mrd. € Capex auf 175 Mrd. € Anlagenbasis" } },
    { name: "McKinsey, via Clean Energy Wire: right-sizing the build-out", url: "https://www.cleanenergywire.org/news/reduced-electricity-demand-could-slash-germanys-transition-investments-2035-report", desc: { en: "demand realism could cut system investment by up to 45 percent", de: "Nachfragerealismus könnte Systeminvestitionen um bis zu 45 Prozent senken" } },
    { name: "Consentec: heat pumps and e-mobility in distribution grids (et, 2020)", url: "https://consentec.de/app/uploads/2024/02/PDF_et_12_2020_S.41-44.pdf", desc: { en: "coincidence factors used in the load model", de: "Gleichzeitigkeitsfaktoren des Lastmodells" } },
    { name: "ZVEI: heat pump guide, 2023", url: "https://www.zvei.org/fileadmin/user_upload/Presse_und_Medien/Publikationen/2023/Februar/ZVEI-Leitfaden_Waermepumpe/ZVEI-Leitfaden_Waermepumpen_Langversion_final_02-2023.pdf", desc: { en: "electrical connection loads of heat pumps", de: "elektrische Anschlussleistungen von Wärmepumpen" } },
    { name: "Probst: e-mobility in distribution grids (dissertation, Stuttgart)", url: "https://www.ieh.uni-stuttgart.de/dokumente/dissertationen/Diss_Probst.pdf", desc: { en: "modelling the coincidence of EV charging", de: "Modellierung der Ladegleichzeitigkeit von E-Autos" } },
    { name: "Bundesnetzagentur: 2023 electricity market review", url: "https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2024/20240103_SMARD.html", desc: { en: "the national peak load near 79 GW", de: "die Jahreshöchstlast nahe 79 GW" } },
    { name: "European Commission: merger decision M.8871, E.ON and innogy", url: "https://ec.europa.eu/competition/mergers/cases/decisions/m8871_2573_3.pdf", desc: { en: "the E.ON and RWE asset swap, 2018 to 2020", de: "der Asset-Tausch von E.ON und RWE, 2018 bis 2020" } },
  ];

  window.CONTENT = { i18n: { en, de }, charts, kpiRows, players, sim, sources };
})();
