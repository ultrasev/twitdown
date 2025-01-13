export const metadata = {
  title: "Terms of Service - TwitDown Twitter Video Downloader",
  description:
    "Terms and conditions for using TwitDown - Your trusted Twitter video downloader service.",
};

export default function Terms() {
  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose dark:prose-invert max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using TwitDown, you accept and agree to be bound by
            these Terms of Service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
          <p>
            TwitDown provides a service that allows users to download videos
            from Twitter/X for personal use only. We do not host any videos; we
            simply facilitate the download of publicly available content.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
          <ul>
            <li>You agree to use the service only for lawful purposes</li>
            <li>
              You are responsible for ensuring you have the right to download
              content
            </li>
            <li>You will not use the service to infringe on any copyrights</li>
            <li>You will not attempt to abuse, hack, or disrupt our service</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p>
            Users must respect intellectual property rights when using our
            service. Downloaded content should only be used in accordance with
            Twitter&apos;s terms of service and applicable copyright laws.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Disclaimer of Warranties
          </h2>
          <p>
            The service is provided &quot;as is&quot; without any warranties. We
            do not guarantee uninterrupted access to the service or that it will
            be free from errors.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Limitation of Liability
          </h2>
          <p>
            TwitDown shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of or
            inability to use the service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of the service after changes constitutes acceptance of the new
            terms.
          </p>
        </section>

        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400 text-center">
            For questions about our terms, contact us at:{" "}
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
  );
}
