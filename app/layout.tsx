import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageHeader from "@/components/PageHeader";
import FooterMain from "@/components/FooterMain";

const inter = Inter({ subsets: ["latin"] });
export const runtime = "edge";

// Define structured data for JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "X/Twitter Video Downloader - Download Twitter Videos Free",
  description:
    "Free online Twitter video downloader. Download X/Twitter videos in HD quality. No login required, supports multiple video formats and resolutions.",
  applicationCategory: "DownloadApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export const metadata: Metadata = {
  title: "TwitDown - Download Twitter Videos Free",
  description:
    "Free online Twitter video downloader. Download X/Twitter videos in HD quality. No login required, supports multiple video formats and resolutions.",
  keywords: [
    "twitter video downloader",
    "x video downloader",
    "x.com video downloader",
    "twitter mp4 download",
    "download x videos",
    "twitter video saver",
  ],
  authors: [{ name: "@twitdown" }],
  openGraph: {
    type: "website",
    url: "https://twitdown.com",
    title: "TwitDown - Download Twitter Videos Free",
    description:
      "Free online Twitter video downloader. Download X/Twitter videos in HD quality. No login required, supports multiple video formats and resolutions.",
    images: [
      {
        url: "https://twitdown.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TwitDown - Download Twitter Videos Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TwitDown - Download Twitter Videos Free",
    description:
      "Download Twitter/X videos in HD quality for free. No registration required.",
    images: ["https://twitdown.com/og-image.png"],
  },
  alternates: {
    canonical: "https://twitdown.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            src="https://umamidata.vercel.app/script.js"
            data-website-id="1f38e5c7-1b48-43a9-a35c-c677bd671a9c"
          ></script>
        )}
        <div className="min-h-screen flex flex-col">
          <PageHeader />
          {children}
          <FooterMain />
        </div>
      </body>
    </html>
  );
}
