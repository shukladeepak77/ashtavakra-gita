import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { chapters, getChapterById } from "@/content/chapters";
import { getChapterContent } from "@/content/getChapterContent";
import ChapterPageBody from "@/components/ChapterPageBody";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/site";

export async function generateStaticParams() {
  return chapters.filter((c) => c.available).map((c) => ({ id: String(c.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const chapter = getChapterById(Number(id));
  if (!chapter) return {};
  const url = `${SITE_URL}/chapter/${chapter.id}`;
  return {
    title: `${chapter.subtitle} — ${chapter.title}`,
    alternates: { canonical: `/chapter/${chapter.id}` },
    openGraph: {
      type: "article",
      url,
      title: chapter.title,
      images: [{ url: SITE_OG_IMAGE, width: 1200, height: 675, alt: chapter.title }],
    },
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  const chapter = getChapterById(numId);
  if (!chapter) notFound();

  const content = getChapterContent(numId);
  if (!chapter.available || !content) {
    notFound();
  }

  const index = chapters.findIndex((c) => c.id === numId);
  const prev = index > 0 ? chapters[index - 1] : undefined;
  const next = index < chapters.length - 1 ? chapters[index + 1] : undefined;

  return <ChapterPageBody chapter={chapter} blocks={content.blocks} prev={prev} next={next} />;
}
