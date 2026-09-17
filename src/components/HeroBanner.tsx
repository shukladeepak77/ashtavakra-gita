export default function HeroBanner({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section
      className="rounded-[22px] px-6 py-5 text-center shadow-[0_16px_40px_rgba(124,45,18,0.3)] sm:px-8 sm:py-7"
      style={{
        background:
          "linear-gradient(135deg, #7c2d12 0%, #b45309 55%, #ea580c 100%)",
      }}
    >
      <p className="font-devanagari text-base text-gold sm:text-lg">
        {eyebrow}
      </p>
      <h1 className="font-devanagari mt-1.5 text-2xl font-bold text-white sm:text-3xl">
        {title}
      </h1>
      <p className="mx-auto mt-2 max-w-2xl text-sm text-white/90 sm:text-base">
        {description}
      </p>
    </section>
  );
}
