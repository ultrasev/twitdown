import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About TwitDown - Twitter Video Downloader",
  description:
    "Learn about TwitDown, a simple and efficient Twitter video downloader tool.",
  openGraph: {
    title: "About TwitDown - Twitter Video Downloader",
    description: "Simple and efficient Twitter video downloader",
    type: "article",
    url: "https://twitdown.com/about",
  },
};

function AboutPage() {
  return (
    <article className="max-w-5xl mx-auto px-8 py-16 min-h-screen">
      <div className="prose max-w-none bg-stone-50 p-16 rounded-lg border border-stone-200 shadow-sm">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-stone-800 mb-6">
            About TwitDown
          </h1>
          <div className="w-32 h-1 bg-stone-300 mx-auto"></div>
        </div>

        <div className="space-y-10 text-stone-700 font-serif">
          <p className="text-xl leading-relaxed">
            Welcome to{" "}
            <Link href="/" className="text-stone-800 font-serif text-pink-500">
              TwitDown
            </Link>{" "}
            - your go-to solution for saving Twitter content. Our platform makes
            it effortless to download and preserve your favorite Twitter videos
            and GIFs on any device.
          </p>

          <p className="text-lg leading-relaxed">
            While TwitDown works seamlessly with public tweets, please note that
            content from private or protected accounts isn&apos;t accessible
            through our service. This limitation helps us respect user privacy
            and Twitter&apos;s platform policies.
          </p>

          <p className="text-lg leading-relaxed">
            All media content is served directly from Twitter&apos;s official
            content delivery network. We do not store or host any copyrighted
            materials on our servers, ensuring full compliance with content
            ownership rights and platform policies.
          </p>

          <p className="text-lg leading-relaxed">
            As Twitter evolves, so does{" "}
            <Link href="/" className="text-stone-800 font-serif text-pink-500">
              TwitDown
            </Link>
            . We&apos;re dedicated to maintaining a reliable service despite
            platform changes. When issues arise, our team works promptly to
            restore full functionality, ensuring you can always access your
            favorite content.
          </p>

          <p className="text-lg leading-relaxed">
            Have questions or running into trouble? We value your input and are
            here to help. Drop us an email, and we&apos;ll get back to you
            promptly.
          </p>

          <div className="text-center mt-16">
            <p className="italic text-xl text-stone-600">
              We appreciate your trust in TwitDown
            </p>
            <div className="w-16 h-0.5 bg-stone-300 mx-auto mt-6"></div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default AboutPage;
