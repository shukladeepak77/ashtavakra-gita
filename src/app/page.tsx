import Image from "next/image";
import { chapters } from "@/content/chapters";
import HeroBanner from "@/components/HeroBanner";
import ChapterBubble from "@/components/ChapterBubble";
import ashtavakra from "../../public/images/ashtavakra.png";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-14 pb-8 sm:px-6 sm:pt-20 sm:pb-12">
      <HeroBanner
        eyebrow="॥ जनक-अष्टावक्र संवाद ॥"
        title="अष्टावक्र गीता"
        description="महर्षि अष्टावक्र और राजा जनक का संवाद — आत्मज्ञान पर बीस अध्यायों में सम्पूर्ण विस्तृत हिन्दी व्याख्या, श्लोक-दर-श्लोक। नीचे किसी भी अध्याय पर जाकर पढ़ें।"
      />

      <div
        className="mt-8 rounded-[28px] p-[3px] shadow-[0_24px_60px_rgba(124,45,18,0.35)]"
        style={{
          background: "linear-gradient(135deg, #fbbf24 0%, #ea580c 45%, #7c2d12 100%)",
        }}
      >
        <div className="overflow-hidden rounded-[26px]">
          <Image
            src={ashtavakra}
            alt="जनक-अष्टावक्र संवाद"
            className="h-auto w-full"
            sizes="(min-width: 768px) 700px, 100vw"
            priority
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {chapters.map((chapter) => (
          <ChapterBubble key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </div>
  );
}
