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
{ "kind": "verse", "number": "२.१", "verseText": "...", "commentary": "..." }
{ "kind": "note", "label": "भूमिका", "text": "..." }
```

`commentary` can be an empty string — a handful of verses in the source
have no separate commentary paragraph. `note` blocks cover both the
labeled "भूमिका" intros and the unlabeled closing/summary paragraph most
chapters end with (`label: null` in that case).

## Regenerating after editing the source .md

Just re-run `npm run build` or `npm run dev` — the prebuild script always
re-parses the source file fresh.

## Audio

Not wired in — no TTS audio exists for this text yet (unlike the sibling
Ram Katha / Bhagwad Gita sites, which have per-chapter .mp3s that were
deliberately left out for repo-size reasons). Revisit if that changes.
