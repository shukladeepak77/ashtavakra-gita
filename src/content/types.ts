export type ContentBlock =
  | { kind: "note"; label: string | null; text: string }
  | { kind: "verse"; number: string; verseText: string; commentary: string };

export type ChapterContent = {
  id: number;
  blocks: ContentBlock[];
};
