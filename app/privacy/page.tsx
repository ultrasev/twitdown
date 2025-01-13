const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy - TwitDown",
  "description": "Privacy policy for TwitDown - Learn how we handle and protect your information.",
  "publisher": {
    "@type": "Organization",
    "name": "TwitDown",
    "url": "https://twitdown.com"
  }
};

export const metadata = {
  title: "Privacy Policy - TwitDown Twitter Video Downloader",
  description:
    "Privacy policy for TwitDown - Learn how we handle and protect your information when using our Twitter video downloader service.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container mx-auto px-4 py-8">
        <article className="prose dark:prose-invert max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </header>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Information We Don&apos;t Collect</h2>
            <p>
              TwitDown is committed to your privacy. We do not collect, store, or
              share any personal information. When you use our service:
            </p>
            <ul>
              <li>We don&apos;t require user registration</li>
              <li>We don&apos;t store your Twitter video URLs</li>
              <li>We don&apos;t track your download history</li>
              <li>We don&apos;t maintain any user databases</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How We Process Videos</h2>
            <p>When you paste a Twitter video URL:</p>
            <ul>
              <li>The URL is processed temporarily to fetch the video</li>
              <li>No video content is stored on our servers</li>
              <li>All processing is done in real-time</li>
              <li>Data is cleared immediately after your download completes</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Cookies and Analytics</h2>
            <p>
              We use minimal technical cookies that are necessary for the website to
              function. We may use anonymous analytics to improve our service, but
              this data cannot identify individual users.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p>
              Our service interacts with Twitter&apos;s platform to fetch videos.
              This interaction is governed by Twitter&apos;s terms of service and
              privacy policy.
            </p>
          </section>

          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400 text-center">
              For questions about our privacy policy, contact us at:{" "}
              <a
                href="mailto:support@twitdown.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                support@twitdown.com
              </a>
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
