# Design Decision — 1:1 TeraWallet Visual Parity

Date: 2026-09-22. Ordered rebuild of the Fineness visual layer to 1:1 parity
with the TeraWallet reference. Content (venues, scores, copy) stays Fineness.
Layout, font, color, and animation match the reference exactly.

This decision overrides brief sections 11 (palette and typography) in
`docs/superpowers/specs/2026-09-22-fineness-v1-design.md` and
`DEVELOPER_BRIEF.md` v1.0 for the visual layer only. Scoring, data, routes,
and editorial rules are unchanged.

## Old vs new

| Area | Old (brief) | New (Tera reference) |
|------|-------------|----------------------|
| Background | `#f7f3f3` ground, `#fbf7f7` surface-2, `#f4e9ea` tint | `#f2f0ee` bg, `#fff` sections, `#dedcda` / `#dbdbd3` / `#f3f0f5` lavender alt, `#1d2b23` / `#18251e` dark |
| Text | `#1e1416` / `#4b3b3b` / `#7e6e71` | `#000` light / `#fff` dark, `#4a4948` / `#3d3b3b` / `#616060` secondary, `#9e9e9e` tertiary, `#c5c2bd` / `#c0bab6` / `#cccbc4` faint |
| Brand | Maroon `#7a1f2b` / `#56141d` | Olive `#768143`, gold `#b8a371`, action orange `#e65800` / `#e75800` with 3px left borders on menu/service lists |
| Borders | `#e3d9da` / `#ccbcbe` | `#d2ceca`, `#cfcecc80`, `#cfc9c5`, `#c5c2bd` |
| Display font | Archivo headings, Newsreader prose | Inter 400/500/700 display/body, h1 58-75px, h2 42-52px, body 15-18px, small 12-14px, tight tracking |
| Mono font | IBM Plex Mono everywhere | Geist Mono 500/700 numbers/eyebrows/buttons/labels, IBM Plex Mono 11px uppercase only for preloader readout |
| Layout | Max-w-5xl sticky masthead | Breakpoints 809.98px/1199px/1439.98px, centered PageContentWrapper, Stack gaps 10-60px, hero gaps 100px, fixed NavigationContainer, hero eyebrow+H1+sub+CTA+visual, footer line-grid with Menu+Service+Form+Logo block |
| Motion | 0.6s ease-out reveal, 30s marquee, accordion entries | Reveal opacity 0, 1.1s `[0.16,0.33,0.3,1.01]` delay 0.2s, letters stagger 65-70ms `[0.2,0.7,0.25,1]` 0.7s, no marquee (static LogoRow), no menu accordion (static stacks) |
| Preloader | 600ms maroon bar | Staged 20/40/60/80/100, 1250ms fallback, 6000ms deadline, exit opacity 0.22s + translateY -12px 0.3s, shutters -101% 0.65s `[0.76,0,0.24,1]` stagger 65ms, remove 950ms, sessionStorage `fineness-preloader-v1` (ported from `tera-preloader-v1`), `?intro=1` replay, Esc skip, Tab trap, orbit 2.8s + float 2.4s |

## What did not change

Scoring engine, edition data, `?w=` server parse before first paint with
replaceState and reset banner, JSON routes and rewrite, venue history and
sparkline, validateEdition, deltas, no-JS SSR full content, keyboard nav,
320-1920px zero horizontal page scroll with overflow-x clip and inner-scroll
tables. Grade bands stay semantic green/amber/brown/red, remapped onto Tera
border and text treatments. Maroon never grades.
