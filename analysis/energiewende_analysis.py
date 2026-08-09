"""Energiewende, decoded: reproducible analysis layer.

Reads the sourced datasets in ../data and produces the derived statistics
quoted in the case study, plus publication-quality figures in ./figures.

Run:
    cd analysis
    python energiewende_analysis.py
"""

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

DATA = Path(__file__).parent.parent / "data"
FIGS = Path(__file__).parent / "figures"
FIGS.mkdir(exist_ok=True)

# Palette (validated categorical slots + chrome, light mode)
BLUE, ORANGE, AQUA = "#2a78d6", "#eb6834", "#1baf7a"
INK, INK2, MUTED, GRID = "#0b0b0b", "#52514e", "#898781", "#e1e0d9"

plt.rcParams.update({
    "font.family": "sans-serif",
    "font.size": 10,
    "axes.edgecolor": GRID,
    "axes.linewidth": 0.8,
    "axes.grid": True,
    "grid.color": GRID,
    "grid.linewidth": 0.6,
    "axes.axisbelow": True,
    "text.color": INK,
    "axes.labelcolor": INK2,
    "xtick.color": MUTED,
    "ytick.color": MUTED,
    "figure.facecolor": "#fcfcfb",
    "axes.facecolor": "#fcfcfb",
    "savefig.dpi": 200,
    "savefig.bbox": "tight",
})


def spine_cleanup(ax):
    for side in ("top", "right"):
        ax.spines[side].set_visible(False)


def cagr(first, last, years):
    return (last / first) ** (1 / years) - 1


def main() -> None:
    res = pd.read_csv(DATA / "renewables_share.csv")
    cap = pd.read_csv(DATA / "installed_capacity.csv")
    red = pd.read_csv(DATA / "redispatch.csv")
    neg = pd.read_csv(DATA / "negative_prices.csv")
    elec = pd.read_csv(DATA / "electrification.csv")

    print("=" * 64)
    print("Derived statistics (quoted in the case study)")
    print("=" * 64)

    # --- 1. Renewables trajectory vs the 80 %-by-2030 target -----------
    y0, y1 = res.iloc[0], res.iloc[-1]
    n_years = int(y1.year - y0.year)
    slope = np.polyfit(res.year, res.share_pct, 1)[0]
    print(f"\nRenewables share: {y0.share_pct:.1f}% ({y0.year:.0f}) -> "
          f"{y1.share_pct:.1f}% ({y1.year:.0f})")
    print(f"Linear trend: {slope:.2f} pp/year")
    need = (80 - y1.share_pct) / (2030 - y1.year)
    print(f"Required to hit 80% by 2030: {need:.2f} pp/year "
          f"({need / slope:.1f}x the historical pace)")

    # --- 2. Solar build-out vs negative price hours --------------------
    m = cap.merge(neg, on="year")
    r = np.corrcoef(m.solar_gw, m.hours)[0, 1]
    print(f"\nSolar capacity CAGR {cap.year.iloc[0]:.0f}-{cap.year.iloc[-1]:.0f}: "
          f"{cagr(cap.solar_gw.iloc[0], cap.solar_gw.iloc[-1], len(cap) - 1):.1%}")
    print(f"Pearson r (installed solar GW vs negative-price hours): {r:.3f}")

    # --- 3. Redispatch: system friction cost ---------------------------
    total_cost = red.cost_meur.sum() / 1000
    print(f"\nCumulative redispatch/congestion cost "
          f"{red.year.iloc[0]:.0f}-{red.year.iloc[-1]:.0f}: EUR {total_cost:.1f} bn")

    # --- 4. Electrification momentum -----------------------------------
    hp_peak = elec.heat_pump_sales_k.max()
    hp_last = elec.heat_pump_sales_k.iloc[-1]
    print(f"\nHeat-pump sales: peak {hp_peak:.0f}k, latest {hp_last:.0f}k "
          f"({(hp_last - hp_peak) / hp_peak:+.0%} vs peak)")
    print(f"BEV new registrations: {elec.bev_new_registrations_k.iloc[0]:.0f}k "
          f"({elec.year.iloc[0]:.0f}) -> {elec.bev_new_registrations_k.iloc[-1]:.0f}k "
          f"({elec.year.iloc[-1]:.0f})")

    # ================= figures =================

    # Fig 1: renewables share vs target
    fig, ax = plt.subplots(figsize=(7, 4))
    ax.plot(res.year, res.share_pct, color=BLUE, lw=2, marker="o", ms=4,
            markerfacecolor=BLUE, markeredgecolor="#fcfcfb", markeredgewidth=1.2)
    ax.axhline(80, color=MUTED, lw=1)
    ax.text(res.year.iloc[0], 80.8, "80 % target (2030)", color=MUTED, fontsize=9)
    trend_x = np.array([res.year.iloc[0], 2030])
    coef = np.polyfit(res.year, res.share_pct, 1)
    ax.plot(trend_x, np.polyval(coef, trend_x), color=BLUE, lw=1, alpha=0.4, ls=(0, (4, 3)))
    ax.set_title("Renewables share of gross electricity consumption, Germany",
                 loc="left", fontsize=11, color=INK, pad=12)
    ax.set_ylabel("%")
    ax.set_ylim(0, 100)
    spine_cleanup(ax)
    fig.savefig(FIGS / "fig1_renewables_share.png")

    # Fig 2: solar capacity vs negative-price hours
    fig, axes = plt.subplots(1, 2, figsize=(9, 3.6))
    axes[0].plot(m.year, m.solar_gw, color=BLUE, lw=2, marker="o", ms=4,
                 markerfacecolor=BLUE, markeredgecolor="#fcfcfb", markeredgewidth=1.2)
    axes[0].set_title("Installed solar PV (GW)", loc="left", fontsize=10, color=INK)
    axes[1].bar(m.year, m.hours, color=ORANGE, width=0.55)
    axes[1].set_title("Hours with negative day-ahead prices", loc="left", fontsize=10, color=INK)
    for ax_ in axes:
        spine_cleanup(ax_)
    fig.suptitle(f"Same system, two curves. Pearson r = {r:.2f}",
                 x=0.01, ha="left", fontsize=11, color=INK)
    fig.tight_layout(rect=(0, 0, 1, 0.92))
    fig.savefig(FIGS / "fig2_solar_vs_negative_prices.png")

    # Fig 3: redispatch cost
    fig, ax = plt.subplots(figsize=(7, 4))
    ax.bar(red.year, red.cost_meur / 1000, color=BLUE, width=0.55)
    ax.set_title("Congestion management (redispatch etc.) cost, EUR bn",
                 loc="left", fontsize=11, color=INK, pad=12)
    spine_cleanup(ax)
    fig.savefig(FIGS / "fig3_redispatch_cost.png")

    # Fig 4: electrification momentum
    fig, ax = plt.subplots(figsize=(7, 4))
    ax.plot(elec.year, elec.heat_pump_sales_k, color=BLUE, lw=2, marker="o", ms=4,
            markerfacecolor=BLUE, markeredgecolor="#fcfcfb", markeredgewidth=1.2,
            label="Heat-pump sales (k units/yr)")
    ax.plot(elec.year, elec.bev_new_registrations_k, color=ORANGE, lw=2, marker="o", ms=4,
            markerfacecolor=ORANGE, markeredgecolor="#fcfcfb", markeredgewidth=1.2,
            label="New BEV registrations (k/yr)")
    ax.legend(frameon=False, fontsize=9)
    ax.set_title("Electrification of heat and transport",
                 loc="left", fontsize=11, color=INK, pad=12)
    spine_cleanup(ax)
    fig.savefig(FIGS / "fig4_electrification.png")

    print(f"\nFigures written to {FIGS}/")


if __name__ == "__main__":
    main()
