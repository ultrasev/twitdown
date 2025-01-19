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

const howToSteps = [
  "Copy the Twitter/X video URL you want to download",
  "Paste the URL in the input box above",
  "Click the Download button",
  "Choose your preferred video quality",
  "Download your video",
];

const features = [
  "Free to use - no registration required",
  "High-quality video downloads",
  "Mobile-friendly interface",
  "Fast and secure downloads",
  "Works with all Twitter/X videos",
  "Multiple format options",
];

const faqs = [
  {
    q: "Can I download Twitter videos on mobile devices?",
    a: "Yes! Our downloader works on all devices including smartphones and tablets.",
  },
  {
    q: "Is it free to use?",
    a: "Absolutely! Our service is completely free with no hidden charges or registration required.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto">
        <SectionDownloader />
        <ContentSection
          howToSteps={howToSteps}
          features={features}
          faqs={faqs}
        />
      </div>
    </main>
  );
}
