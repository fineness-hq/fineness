# AI Analyst and Editor

Date: 2026-09-22. The monthly run needs no human hands: an LLM proposes
scores and admission verdicts, and code enforces the guardrails. The model
proposes; code disposes.

## Wiring

- Credentials: `LLM_API_URL`, `LLM_API_KEY`, `LLM_MODEL` from the
  environment. Locally they load from the project's own `.env.local`
  (gitignored, never committed; override path with `LLM_ENV_FILE`). In CI
  they come from secrets. Keys never enter this repo.
- Upstream: OpenAI-compatible chat completions, temperature 0, 120s timeout.
- Prompt: previous edition (scores, rationale, thesis, pairing, facts) plus
  fresh snapshot metrics plus the ±1-cap and cited-evidence rules.
- Response budget 12000 tokens: full-register JSON gets clipped below that,
  and a clipped reply voids the whole review by design.

## Guardrails (all in code, none by trust)

1. Unknown venue ids in the reply are ignored; missing venues carry forward.
2. Scores clamp to integers 0..10 and at most ±1 from the previous value.
3. A moved score applies only with rewritten, non-empty rationale text.
4. Admission verdicts limited to retain/strike; new venues become watchlist
   notes because full records cannot be fabricated.
5. Garbage or truncated replies (after one retry) resolve to null, and the
   run carries the previous edition unchanged.
6. `validateEdition` still hard-fails the run on bad ranges, missing
   rationale, or unknown sourceIds. `warnScoreMoves` prints any residual
   policy smell.

## Proven runs

- 2026-10 (2026-09-22): AI review applied, scores moved inside the ±1
  calibration cap with rewritten rationale (`tests/edition-2026-10.test.ts`).
  Earlier 2026-11 trial runs were removed; their provenance dates were
  unpublishable, so no record is kept.
