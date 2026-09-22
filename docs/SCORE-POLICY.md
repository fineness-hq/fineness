# Fineness Score Stability Policy

Date: 2026-09-22. Answers brief section 16, question 2 ("Score stability policy",
blocking for Edition 02). Companion to `DEVELOPER_BRIEF.md` sections 4, 6, and 8.
Where this document conflicts with the brief, the brief wins.

## Principle

**No evidence, no move.** A criterion score (integer 0..10) changes only on the
basis of new public evidence, and that evidence must be cited in the venue's
`rationale` for the edition in which the score moves. Scores measure the market
as observed, never analyst mood.

## Rules

1. **Cited evidence required.** Any moved score carries a citation to a new
   public fact (document, verified contract, completed launch, license,
   incident, disclosure). The citation lives in the moved criterion's
   `rationale` entry. A moved score without a cited reason fails review.
2. **Cap of 1 point.** A single criterion moves at most 1 point per edition
   (±1), except for major events (loss of license, dark interface, loss of
   domain or key control), which may move further with a written reason signed
   by both reviewers.
3. **Unchanged scores stay silent.** A score that does not move needs no new
   justification. The standing rationale carries forward. Analysts must not
   invent reasons to fill the month.
4. **Two sign-offs stand.** Every moved score needs the existing two-reviewer
   sign-off from the runbook (brief section 8, days 4 to 6), recorded in the
   commit message.
5. **Pairing re-reviews follow admission, not scoring.** A venue that fails the
   pairing condition (brief section 7, condition 2) on re-review is struck,
   never scored down. Scoring low what was never in the category corrupts the
   scale.

## Calibration window

Edition 01 listed ten venues because ten were findable ("that is not a
standard", brief section 7). The baseline is therefore still calibrating:

- **Editions 02 and 03:** adjustments of ±1 per criterion per edition are
  allowed on analyst judgement alone, with a written reason but without new
  hard evidence. Mark these rationales with the word `calibration` so readers
  can see the baseline settling.
- **Edition 04 onward:** the full rules above apply. No evidence, no move.

## Worked examples

- Pons publishes a licensed-custodian prospectus: `compliance` 5 → 6, rationale
  cites the prospectus URL and date. Allowed (evidence + within cap).
- Flap has a quiet month with no news: all scores unchanged, no new text
  required. Allowed (rule 3).
- CSL launches its first public market: several criteria move on the launch
  evidence. Allowed, each within cap unless a major event applies.
- Analyst feels Bankr "deserves better traction" with no new volume data:
  rejected. No evidence, no move.

## Enforcement

- Human process first: the day 4 to 6 score review checks every moved score
  against rules 1, 2, and 4.
- Machine assist (non-blocking): `validateEdition` may gain a warning (never a
  hard failure) when a score moves without a rationale change, to flag likely
  oversights during review. Hard failures stay reserved for the existing
  integrity checks (ranges, missing rationale, unknown sourceId).
