import Link from "next/link";
import type { Chapter } from "@/content/chapters";
import type { ContentBlock } from "@/content/types";
import HeroBanner from "@/components/HeroBanner";
import { SITE_URL } from "@/lib/site";

export default function ChapterPageBody({
  chapter,
  blocks,
  prev,
  next,
}: {
  chapter: Chapter;
  blocks: ContentBlock[];
  prev?: Chapter;
  next?: Chapter;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Chapter",
    name: chapter.title,
    position: chapter.id,
    url: `${SITE_URL}/chapter/${chapter.id}`,
    isPartOf: {
      "@type": "Book",
      name: "अष्टावक्र गीता",
      url: SITE_URL,
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroBanner eyebrow={chapter.subtitle} title={chapter.title} description="" />

      <div className="mt-8 flex flex-col gap-5">
        {blocks.map((block, i) =>
          block.kind === "verse" ? (
            <article
              key={i}
              className="rounded-[20px] border border-border-muted bg-surface p-5 shadow-[var(--shadow)] sm:p-6"
            >
              <span className="font-devanagari inline-block rounded-full bg-orange-900/10 px-3 py-1 text-xs font-bold text-orange-900">
                श्लोक {block.number}
              </span>
              {block.sanskrit && (
                <div className="mt-3 rounded-2xl bg-amber-500/10 px-4 py-3">
                  <p className="text-[0.7rem] font-bold tracking-wide text-orange-900/70 uppercase">
                    मूल श्लोक (संस्कृत)
                  </p>
                  <p className="font-devanagari mt-1 text-[1.05rem] leading-relaxed whitespace-pre-line text-foreground">
                    {block.sanskrit}
                  </p>
                </div>
              )}
              <p className="mt-3 text-[0.7rem] font-bold tracking-wide text-orange-900/70 uppercase">
                भावार्थ
              </p>
              <blockquote
                className="font-devanagari mt-1 border-l-4 border-amber-500/70 pl-4 text-[1.05rem] leading-relaxed font-semibold text-foreground italic"
              >
                {block.verseText}
              </blockquote>
              {block.commentary && (
                <p className="font-devanagari mt-4 text-base leading-relaxed text-foreground/85 whitespace-pre-line">
                  {block.commentary}
                </p>
              )}
            </article>
          ) : (
            <div key={i} className="px-1">
              {block.label && (
                <p className="font-devanagari mb-1.5 text-sm font-bold uppercase tracking-wide text-orange-900/80">
                  {block.label}
                </p>
              )}
              <p className="font-devanagari text-base leading-relaxed text-foreground/85 whitespace-pre-line">
                {block.text}
              </p>
            </div>
          )
        )}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/chapter/${prev.id}`}
            className="font-devanagari rounded-full border border-border-muted bg-surface px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:-translate-y-0.5 hover:brightness-110"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/chapter/${next.id}`}
            className="font-devanagari rounded-full border border-border-muted bg-surface px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:-translate-y-0.5 hover:brightness-110"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
