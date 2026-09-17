import fs from "fs";
import path from "path";
import type { ChapterContent } from "./types";

const DATA_DIR = path.join(process.cwd(), "src", "content", "data");

export function getChapterContent(id: number): ChapterContent | undefined {
  const file = path.join(DATA_DIR, `${id}.json`);
  if (!fs.existsSync(file)) return undefined;
  return JSON.parse(fs.readFileSync(file, "utf8")) as ChapterContent;
}
