import { Metadata } from "next";
import SectionDownloader from "@/components/SectionDownloader";

// Define metadata for better SEO
export const metadata: Metadata = {
  title: "Twitter Video Downloader - Download Twitter/X Videos in HD",
  description: "Download Twitter/X videos in HD quality instantly. Free, no registration needed, works on all devices. Save and share your favorite Twitter videos hassle-free.",
  keywords:
    "twitter video downloader, x video downloader, twitter download, social media downloader",
  openGraph: {
    title: "Twitter Video Downloader - Download Twitter/X Videos in HD",
    description: "Download Twitter/X videos in HD quality instantly. Free, no registration needed, works on all devices. Save and share your favorite Twitter videos hassle-free.",
    type: "website",
    url: "https://twitdown.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Twitter Video Downloader",
      },
    ],
    siteName: "TwitDown",
  },
  twitter: {
    card: "summary_large_image",
    site: "@twitdown",
    creator: "@twitdown",
    images: ["/og-image.png"],
    title: "Twitter Video Downloader - Download Twitter/X Videos in HD",
    description: "Download Twitter/X videos in HD quality instantly. Free, no registration needed, works on all devices. Save and share your favorite Twitter videos hassle-free.",
  },
};

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

export default function Home() {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SectionDownloader />

      {/* Main content with adjusted width */}
      <div className="max-w-3xl mx-auto mt-20 space-y-16">
        {/* How-to Section */}
        <section className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-6">
          <h2 className="text-2xl font-bold mb-6">
            How to Download Twitter Videos
          </h2>
          <ol className="space-y-4">
            {[
              "Copy the Twitter/X video URL you want to download",
              "Paste the URL in the input box above",
              "Click the Download button",
              "Choose your preferred video quality",
              "Download your video",
            ].map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="font-semibold">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Features Section */}
        <section className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-6">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Free to use - no registration required",
              "High-quality video downloads",
              "Mobile-friendly interface",
              "Fast and secure downloads",
              "Works with all Twitter/X videos",
              "Multiple format options",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-blue-500">•</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-6">
          <h2 className="text-2xl font-bold mb-6">FAQ</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I download Twitter videos on mobile devices?",
                a: "Yes! Our downloader works on all devices including smartphones and tablets.",
              },
              {
                q: "Is it free to use?",
                a: "Absolutely! Our service is completely free with no hidden charges or registration required.",
              },
            ].map((faq, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
