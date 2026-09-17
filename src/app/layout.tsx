import type { Metadata } from "next";
import Script from "next/script";
import { Tiro_Devanagari_Hindi, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_OG_IMAGE,
  GA_MEASUREMENT_ID,
} from "@/lib/site";

const tiroDevanagari = Tiro_Devanagari_Hindi({
  variable: "--font-tiro-devanagari",
  subsets: ["devanagari", "latin"],
  weight: "400",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  subsets: ["devanagari", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — विस्तृत हिन्दी व्याख्या`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "अष्टावक्र गीता",
    "जनक अष्टावक्र संवाद",
    "आत्मज्ञान",
    "Ashtavakra Gita",
    "Ashtavakra",
    "Janak Ashtavakra",
    "Advaita",
  ],
  category: "religion",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — विस्तृत हिन्दी व्याख्या`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 675,
        alt: "जनक-अष्टावक्र संवाद",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — विस्तृत हिन्दी व्याख्या`,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "Ashtavakra Gita",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "hi",
  };

  return (
    <html
      lang="hi"
      className={`${tiroDevanagari.variable} ${notoSansDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
