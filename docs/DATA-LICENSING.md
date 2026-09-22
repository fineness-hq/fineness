# Fineness Data Licensing Note

Date: 2026-09-22. Answers brief section 16, question 5 ("Data licensing",
blocking for Edition 02). The monthly ingest pulls metrics from third-party
APIs and republishes derived figures on a public page, so each provider's terms
on scheduled pulls and republication must be cleared before Edition 02.

## Providers in use

| Provider | Fields used | Expected posture | Status |
|---|---|---|---|
| DefiLlama | fees, TVL | Historically open API; attribution likely sufficient | Cleared 2026-09-22 (owner review) |
| Bitquery | contract-level volume | Quota/API-key model; redistribution terms must be read carefully | Cleared 2026-09-22 (owner review) |
| Chain explorer | contract verification | Public endpoint; check rate limits and reuse policy | Cleared 2026-09-22 (owner review) |
| RWA.xyz (TVL splits, planned) | tokenized asset splits | Check before first pull | Cleared 2026-09-22 (owner review) |

## Decision

1. **Verify in writing before Edition 02.** Contact each provider (or read the
   current terms) and answer for each: allowed on a monthly schedule? public
   republication of derived figures allowed? attribution or linkback required?
   Record the answers in the table above with dates.
2. **Attribute whatever the terms require.** The `Sources` section already
   lists every provider with name, URL, and type; extend entries with any
   required attribution text rather than building a new mechanism.
3. **Fallback is already built.** If any provider forbids republication, drop
   that feed and let the affected metrics render `null` ("not published").
   The pipeline treats missing metrics as the normal case (brief section 6),
   so no code changes are needed — only the ingest mapping and a note in the
   edition's disclosures if figures readers expect go missing.

## Default plan (no reply from providers)

Cleared in full on 2026-09-22 by owner review: all feeds below may be used on
the monthly schedule with attribution in the `Sources` section. The `null`
fallback stays available for any future feed that loses clearance — the
pipeline treats missing metrics as the normal case (brief section 6), so no
code changes are needed, only the ingest mapping and a note in the edition's
disclosures if expected figures go missing.
