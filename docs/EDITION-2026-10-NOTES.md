# Edition 2026-10 — Admission and Score Review Notes

Date: 2026-09-22. Runbook days 2–6 evidence for the October register.
Data cut (`dataAsOf`): 2026-09-22. Snapshot: `data/snapshots/2026-09-22.json`.

## Dating decision

This run executes the October edition early on September 22 with figures
researched that day. The header records the honest cut date (`2026-09-22`)
rather than an October date. No figure is forward-dated; every metric below
cites a report published on or before the cut.

## Admission review (brief section 7, all four conditions at cut date)

| Venue | C1 verified contract | C2 RWA pairing | C3 live market | C4 reachable domain | Verdict |
|---|---|---|---|---|---|
| long-xyz | yes (factory, explorer) | yes, tokenized-equity pairs | yes, >$1B cumulative | yes, long.xyz | retain |
| pons | yes | yes, stock pairs (~$174M, 310 pairs) | yes, >$12B cumulative | yes, pons.markets | retain |
| stonkfun | yes | yes, xStocks quote assets | yes, live launches | yes, stonkfun.xyz | retain |
| pools-trade | yes | yes, inventory-index vaults | yes, live pools | yes, pools.trade | retain |
| flap | yes (portal 0x2660…, docs) | yes, stock quote + dividends | yes, live since Jul 2026 | yes, flap.sh | retain |
| pair | yes (V5 proxy, registry) | yes, multipool stock pairs | yes, $26M first 5 days | yes, pair.fund | retain |
| bankr | yes | yes, stock-pairing on Robinhood Chain | yes, live launches | yes, bankr.bot | retain |
| cardpad | yes (filed) | claimed collectible vaults | none verifiable | cardpad.io not confirmed reachable | retain, flagged |
| factory-new | yes (tokens on explorer) | synthetic game tokens only | thin (50+ transfers) | yes, factorynew.app + factorynew.xyz | retain |
| csl | yes (filed) | none shown | none | csl.markets not confirmed reachable | retain, flagged |

No additions: o1.exchange surfaced in research (67.2% RWA ratio per AiCoin)
but no verified contract evidence was collected this run — watchlist, not
admitted. No strikes: cardpad and csl fail to show activity but neither meets
a strike trigger (no confirmed dark interface, no domain loss on record).
Striking on absence of evidence alone would violate the standard itself.

## Score review (SCORE-POLICY.md, calibration window Editions 02–03)

| Venue | Move | Cited evidence | Expected fineness |
|---|---|---|---|
| pons asset 5 → 6 | +1 | Stock-pair lineup expansion (UPS, SNAP, LULU, PFE, JNJ, Sep 4) [calibration] | 745 |
| stonkfun transparency 6 → 7 | +1 | Public developer API docs plus third-party coverage Sep 14–16 [calibration] | 615 |
| flap asset 8 → 7 | −1 |Exposure, not custody: dividends/quote use stock tokens without ownership [calibration] | 560 |
| flap durability 6 → 7 | +1 | Live since Jan 2024 (BNB) and Jul 2026 (Robinhood Chain), still shipping [calibration] | 560 |
| pair asset 7 → 6 | −1 | Premise correction: no custody or redemption; pools state allocations are not backing [calibration] | 555 |
| pair traction 3 → 4 | +1 | $26M volume and 160k trades in first five days after Aug 26 launch [calibration] | 555 |
| pair transparency 7 → 8 | +1 | On-chain registry, open-source contracts, AWS partnership [calibration] | 555 |
| bankr transparency 6 → 7 | +1 | Public docs, Dune metrics dashboard, open skill repositories [calibration] | 470 |
| factory-new durability 2 → 3 | +1 | Live radar plus explorer-listed tokens (sDOTA, sCS2) with transfers [calibration] | 350 |
| long-xyz, pools-trade, cardpad, csl | none | No new evidence; standing rationale carries forward | 720 / 590 / 425 / 220 |

PAIR thesis and pairing corrected to the verified reality (multipool RWA
launchpad; synthetic exposure without custody or redemption; custodian
PAIR Labs; links pair.fund). All moves within the ±1 cap; every moved score
carries changed rationale text, so `warnScoreMoves` stays silent.

## Resulting register

pons 745 (1) · long-xyz 720 (2) · stonkfun 615 (3) · pools-trade 590 (4) ·
flap 560 (5) · pair 555 (6) · bankr 470 (7) · cardpad 425 (8) ·
factory-new 350 (9) · csl 220 (10).

Headline events: leadership change (Pons takes rank 1, +30 fineness).
Peak 745 — still nothing clears 18 karat, so the standing headline stands.
