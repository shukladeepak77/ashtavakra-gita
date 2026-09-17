# Where the content comes from

All 20 chapters, verse-by-verse with commentary, come from a single source
file: `../Ashtavakra/Ashtavakra-Gita-Sampoorna-Vyakhya.md` (outside this
repo) — 298 shlokas total, each with a quoted verse and (usually) a
commentary paragraph explaining it, grouped under a "भूमिका" intro per
chapter.

`scripts/generate-ashtavakra-content.js` parses that markdown file at
build time (runs automatically before `dev`/`build`) and writes
`src/content/data/N.json` per chapter — see the long comment at the top of
that script for the exact parsing rules, including how chapter 18 (100
verses, split across four "(भाग N)" parts in the source) gets merged into
one chapter here. `src/content/chapters.ts` holds the chapter titles
(taken from the source's own "## अध्याय N: Title" headings, with the
"(भाग ...)" suffix stripped for chapter 18) — all 20 are complete, unlike
the sibling Bhagwad Gita site.

## Content shape

Each chapter's JSON is `{ id, blocks }`, where `blocks` is an ordered list
of either:

```json
{ "kind": "verse", "number": "२.१", "sanskrit": "...", "verseText": "...", "commentary": "..." }
{ "kind": "note", "label": "भूमिका", "text": "..." }
```

`commentary` can be an empty string — a handful of verses in the source
have no separate commentary paragraph. `note` blocks cover both the
labeled "भूमिका" intros and the unlabeled closing/summary paragraph most
chapters end with (`label: null` in that case).

## Sanskrit text

`src/content/sanskrit.json` (`{ "chapter.verse": "..." }`, e.g. `"18.100"`)
holds the original Sanskrit for all 298 verses — extracted once from
[shlokam.org's Ashtavakra Gita page](https://shlokam.org/text/ashtavakra-gita.htm)
(public-domain source text only; shlokam.org's own translation/commentary
was not used). It's committed directly to this repo, unlike the Hindi
source .md, since it's small and self-contained. `chapter.verse` numbering
matches the source .md's own "श्लोक N.M" numbering exactly (verified:
identical per-chapter verse counts across both sources for all 20
chapters) — `generate-ashtavakra-content.js` converts each verse's
Devanagari number to this key to look up its Sanskrit text.

To re-extract (e.g. if shlokam.org's markup changes or new verses are
added): fetch the page, then adapt the one-off Python parser described in
the commit that added sanskrit.json — it's not part of the regular build
pipeline since it only needs to run once.

## Regenerating after editing the source .md

Just re-run `npm run build` or `npm run dev` — the prebuild script always
re-parses the source file fresh.

## Audio

Not wired in — no TTS audio exists for this text yet (unlike the sibling
Ram Katha / Bhagwad Gita sites, which have per-chapter .mp3s that were
deliberately left out for repo-size reasons). Revisit if that changes.
