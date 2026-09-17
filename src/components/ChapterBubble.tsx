import Link from "next/link";
import type { Chapter } from "@/content/chapters";
import { bubbleColors, bubbleStyle } from "@/lib/bubble";

export default function ChapterBubble({
  chapter,
  active = false,
}: {
  chapter: Chapter;
  active?: boolean;
}) {
  const color = bubbleColors[(chapter.id - 1) % bubbleColors.length];

  if (!chapter.available) {
    return (
      <div
        className="relative flex items-center gap-3 overflow-hidden rounded-2xl border border-dashed border-foreground/20 bg-foreground/5 px-4 py-3 opacity-60"
        aria-label={`${chapter.title} — जल्द आ रहा है`}
      >
        <span className="font-devanagari flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-sm font-extrabold text-foreground/60">
          {chapter.id}
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-semibold uppercase tracking-wide text-foreground/50">
            {chapter.subtitle}
          </span>
          <span className="font-devanagari block truncate text-base font-bold text-foreground/60">
            {chapter.title}
          </span>
        </span>
        <span className="font-devanagari ml-auto shrink-0 rounded-full bg-foreground/10 px-2.5 py-1 text-[10px] font-bold text-foreground/60">
          जल्द ही
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/chapter/${chapter.id}`}
      style={bubbleStyle(color, active)}
      className="group relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/40 to-transparent"
      />
      <span className="font-devanagari relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-extrabold text-white ring-1 ring-white/40">
        {chapter.id}
      </span>
      <span className="relative min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wide text-white/75">
          {chapter.subtitle}
        </span>
        <span className="font-devanagari block truncate text-lg font-extrabold text-yellow-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          {chapter.title}
        </span>
      </span>
    </Link>
  );
}
