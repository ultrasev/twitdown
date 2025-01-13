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
  "name": "X/Twitter Video Downloader - Download Twitter Videos Free",
  "description": "Free online Twitter video downloader. Download X/Twitter videos in HD quality. No login required, supports multiple video formats and resolutions.",
  "applicationCategory": "DownloadApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export const metadata: Metadata = {
  title: {
    default: "X/Twitter Video Downloader - Download Twitter Videos Free",
    template: "%s | Twitter Video Downloader"
  },
  description: "Download Twitter/X videos in HD quality for free. No registration required. Support multiple video formats and resolutions. Fast and easy to use.",
  keywords: [
    "twitter video downloader",
    "x video downloader",
    "download twitter videos",
    "twitter video download",
    "x.com video downloader",
    "twitter mp4 download",
    "download x videos",
    "twitter video saver"
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "X/Twitter Video Downloader - Download Twitter Videos Free",
    description: "Download Twitter/X videos in HD quality for free. No registration required.",
    type: "website",
    locale: "en_US",
    url: "https://twitdown.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "X/Twitter Video Downloader - Download Twitter Videos Free",
    description: "Download Twitter/X videos in HD quality for free. No registration required.",
  },
  alternates: {
    canonical: "https://twitdown.com"
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <PageHeader />
          {children}
          <FooterMain />
        </div>
      </body>
    </html>
  );
}
