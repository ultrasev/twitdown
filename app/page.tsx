import SectionDownloader from "@/components/SectionDownloader";

export const metadata = {
  title: "Download Twitter Videos Free - HD Quality Twitter Video Downloader",
  description: "Download Twitter/X videos in high quality for free. Easy to use, no registration needed. Support for all video formats and resolutions. Fast and secure downloads.",
};

export default function Home() {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <SectionDownloader />

      {/* Add SEO-friendly content */}
      <section className="mt-20 prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">How to Download Twitter Videos</h2>
        <ol className="list-decimal pl-6">
          <li>Copy the Twitter/X video URL you want to download</li>
          <li>Paste the URL in the input box above</li>
          <li>Click the Download button</li>
          <li>Choose your preferred video quality and format</li>
          <li>Click to download your video</li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-4">Features of Our Twitter Video Downloader</h2>
        <ul className="list-disc pl-6">
          <li>Free to use - no registration required</li>
          <li>Support for high-quality video downloads</li>
          <li>Multiple format options available</li>
          <li>Fast and secure downloads</li>
          <li>Works with all Twitter/X videos</li>
          <li>Mobile-friendly interface</li>
        </ul>
      </section>
    </main>
  );
}
