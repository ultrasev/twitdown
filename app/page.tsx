import type { Metadata } from "next";
import SectionDownloader from "@/app/components/SectionDownloader";
import ContentSection from "@/app/components/ContentSection";

// Add JSON-LD schema for better SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Twitter Video Downloader",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description: "Free online tool to download Twitter/X videos in HD quality",
  browserRequirements: "Requires JavaScript",
  permissions: "No special permissions required",
  url: "https://twitdown.com",
  author: {
    "@type": "Organization",
    name: "TwitDown",
  },
};

// Define metadata for the page
export const metadata: Metadata = {
  title: "TwitDown - Download Twitter Videos Free",
  description:
    "Free online Twitter video downloader. Download X/Twitter videos in HD quality. No login required, supports multiple video formats and resolutions.",
};

export default function Home() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto">
        <SectionDownloader />
        <ContentSection />
      </div>
    </main>
  );
}
