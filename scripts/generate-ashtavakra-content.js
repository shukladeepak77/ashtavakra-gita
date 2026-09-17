// Parses ../Ashtavakra/Ashtavakra-Gita-Sampoorna-Vyakhya.md into
// src/content/data/N.json (one file per chapter, N = 1..20).
//
// Source structure: repeated "# अष्टावक्र गीता — विस्तृत व्याख्या" page
// headers (decorative, discarded) followed by "## अध्याय N: Title"
// chapter headings. Chapter 18 is split across four consecutive "##
// अध्याय १८: परम शान्ति (भाग N — श्लोक ...)" headings in the source (it
// has 100 verses, far more than any other chapter) — these are merged
// into one chapter 18 here, in file order, with the "(भाग ...)" suffix
// stripped from the title (see chapters.ts).
//
// Within a chapter, content is "---"-separated segments. Each segment is
// either a verse ("**श्लोक N.M**" then a "> quoted verse" line then a
// commentary paragraph) or a note (any other bold-labeled or unlabeled
// prose section, e.g. "**भूमिका**") — see types.ts's ContentBlock. This
// generic split is what lets chapter 18's four merged parts (each with
// their own भूमिका) work without special-casing: every भूमिका just
// becomes another note block in that chapter's block list.
const fs = require("fs");
const path = require("path");

const SOURCE_FILE = path.join(
  __dirname, "..", "..", "..", "Ashtavakra", "Ashtavakra-Gita-Sampoorna-Vyakhya.md"
);
const DATA_DIR = path.join(__dirname, "..", "src", "content", "data");

const DEVANAGARI_DIGITS = "०१२३४५६७८९";
function devanagariToInt(s) {
  return parseInt(
    [...s].map((ch) => {
      const i = DEVANAGARI_DIGITS.indexOf(ch);
      return i === -1 ? ch : String(i);
    }).join(""),
    10
  );
}

function parseSegment(raw) {
  const text = raw.trim();
  if (!text) return null;

  const verseMatch = text.match(/^\*\*श्लोक ([^*]+)\*\*\s*\n+>\s*(.+)\n*([\s\S]*)$/);
  if (verseMatch) {
    return {
      kind: "verse",
      number: verseMatch[1].trim(),
      verseText: verseMatch[2].trim(),
      commentary: verseMatch[3].trim(),
    };
  }

  const labelMatch = text.match(/^\*\*([^*]+)\*\*\s*\n+([\s\S]+)$/);
  if (labelMatch) {
    return { kind: "note", label: labelMatch[1].trim(), text: labelMatch[2].trim() };
  }

  return { kind: "note", label: null, text };
}

const raw = fs.readFileSync(SOURCE_FILE, "utf8");

// Drop the decorative repeated page-header lines before splitting.
const cleaned = raw
  .split("\n")
  .filter((line) => line.trim() !== "# अष्टावक्र गीता — विस्तृत व्याख्या")
  .join("\n");

const chapterSplit = cleaned.split(/\n(?=## अध्याय )/);

const chaptersById = new Map();
for (const chunk of chapterSplit) {
  const headingMatch = chunk.match(/^## अध्याय ([०-९]+)[:：]?\s*(.*)/);
  if (!headingMatch) continue; // preamble before the first "##" heading

  const id = devanagariToInt(headingMatch[1]);
  const body = chunk.slice(headingMatch[0].length);

  const segments = body
    .split(/\n---\n/)
    .map(parseSegment)
    .filter(Boolean);

  if (!chaptersById.has(id)) chaptersById.set(id, []);
  chaptersById.get(id).push(...segments);
}

fs.mkdirSync(DATA_DIR, { recursive: true });
let verseCount = 0;
for (const [id, blocks] of chaptersById) {
  fs.writeFileSync(path.join(DATA_DIR, `${id}.json`), JSON.stringify({ id, blocks }, null, 2));
  verseCount += blocks.filter((b) => b.kind === "verse").length;
}
console.log(`${chaptersById.size} chapter(s), ${verseCount} verse(s) written to src/content/data/`);
