import SectionDownloader from "@/components/SectionDownloader";

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
  },
  description: "Free online tool to download Twitter/X videos in HD quality",
  browserRequirements: "Requires JavaScript",
  permissions: "No special permissions required",
  url: "https://twitdown.com",
  author: {
    "@type": "Organization",
    name: "TwitDown"
  }
};

export default function Home() {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SectionDownloader />

      {/* Main content sections */}
      <div className="max-w-3xl mx-auto mt-20 prose dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-6">
            How to Download Twitter Videos
          </h2>
          <ol className="list-decimal pl-6">
            <li>Copy the Twitter/X video URL you want to download</li>
            <li>Paste the URL in the input box above</li>
            <li>Click the Download button</li>
            <li>Choose your preferred video quality and format</li>
            <li>Click to download your video</li>
          </ol>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">
            Features of Our Twitter Video Downloader
          </h2>
          <ul className="list-disc pl-6">
            <li>Free to use - no registration required</li>
            <li>Support for high-quality video downloads</li>
            <li>Multiple format options available</li>
            <li>Fast and secure downloads</li>
            <li>Works with all Twitter/X videos</li>
            <li>Mobile-friendly interface</li>
          </ul>
        </section>

        {/* New FAQ section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Can I download Twitter videos on mobile devices?
              </h3>
              <p>
                Yes! Our downloader works on all devices including smartphones
                and tablets. The process is the same - just paste the video URL
                and download.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is it free to use?</h3>
              <p>
                Absolutely! Our service is completely free with no hidden
                charges or registration required.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
