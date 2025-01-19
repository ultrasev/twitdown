import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Twitter Video Downloader - TwitDown.com",
  description:
    "Documentation for TwitDown.com, an advanced Twitter video downloader. Download Twitter videos effortlessly with TwitDown.com",
  keywords:
    "twitter video downloader, download twitter videos, twitter video saver, social media tools",
  openGraph: {
    title: "Twitter Video Downloader - TwitDown.com",
    description: "Advanced and user-friendly Twitter video downloader",
    type: "article",
    url: "https://twitdown.com/about",
  },
};

function AboutPage() {
  return (
    <article className="max-w-5xl mx-auto px-16 py-12 min-h-screen rounded-xl text-lg bg-gradient-to-b from-amber-50/50 to-transparent">
      <div className="prose max-w-none">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-stone-800">
            About TwitDown
          </h1>
        </div>

        <p className="text-xl mb-6">
          TwitDown was developed to streamline the process of downloading
          Twitter videos.
        </p>

        <p className="mb-6">
          At its core, it&apos;s an intuitive interface built on top of a
          sophisticated video parsing API. Users simply input a tweet URL to
          receive the video download link, and it&apos;s available at{" "}
          <Link
            href="https://twitdown.com"
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200 underline decoration-2 decoration-blue-200"
          >
            twitdown.com
          </Link>
          .
        </p>

        <p className="mb-8">
          To optimize API utilization and enhance performance, parsed video URLs
          are cached in our database. Subsequent requests for the same video are
          served directly from this cache, significantly reducing response
          times.
        </p>

        <div className="relative rounded-xl overflow-hidden shadow-2xl mb-12">
          <Image
            src="/images/docs/chartflow.png"
            alt="TwitDown system architecture diagram"
            width={1000}
            height={400}
            className="w-full"
            priority
          />
        </div>

        <section id="tech-stack" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 inline-block border-b-4 border-blue-500">
            Technology Stack
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
            {[
              { label: "Frontend", value: "Next.js (React-based framework)" },
              {
                label: "Backend",
                value: "Hono (Lightweight web framework)",
                link: "https://hono.dev/",
              },
              {
                label: "Database",
                value: "PostgreSQL (Relational database)",
                link: "https://www.postgresql.org/",
              },
              {
                label: "Deployment",
                value:
                  "Vercel (Cloud platform for static and serverless deployment)",
                link: "https://vercel.com/",
              },
              {
                label: "Video parse API",
                value: "Twitter API",
                link: "https://developer.twitter.com/en/docs/twitter-api",
              },
              {
                label: "Analytics",
                value: "Umami (Privacy-focused analytics)",
                link: "https://umami.is/",
              },
              {
                label: "Rate limiter",
                value: "Upstash (Serverless Redis service)",
                link: "https://upstash.com/",
              },
            ].map(({ label, value, link }) => (
              <li
                key={label}
                className="flex items-center p-4 rounded-lg bg-white shadow-sm"
              >
                <span className="font-medium text-gray-600 mr-2">{label}:</span>
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    {value}
                  </a>
                ) : (
                  <span>{value}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">
              Hono vs Next.js API Routes: A Comparative Analysis
            </h3>

            <div className="space-y-6">
              <div className="p-6 shadow-sm">
                <p className="mb-4">
                  The project initially utilized Next.js API routes but
                  transitioned to Hono due to its simplicity and elegance:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Familiar paradigm for FastAPI developers - enabling a
                    seamless transition
                  </li>
                  <li>
                    Built-in middleware configuration - offering out-of-the-box
                    functionality
                  </li>
                  <li>Intuitive and clean routing system</li>
                  <li>
                    Simplified implementation of authentication, rate limiting,
                    and other middleware functions
                  </li>
                </ul>
              </div>

              <p>
                For instance, implementing authentication for{" "}
                <code className="px-2 py-1 rounded">/api/v1/download</code>
                is remarkably straightforward with Hono. Here&apos;s an
                illustrative example:
              </p>
            </div>

            <div className="my-8 rounded-lg overflow-hidden bg-gray-50">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                <span className="text-sm font-medium">
                  Hono Route Configuration
                </span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="font-courier">{`import { Hono } from "hono";
import { handle } from "hono/vercel";
import { setupMiddleware } from "../middleware";
import { ApiService } from "../services/api-service";

const app = new Hono().basePath("/api");
// Middleware configuration
setupMiddleware(app);

// Public endpoints
app.get("/hello", (c) => c.json({ message: "Hello, World!" }));

// Protected endpoints
app.get("/analytics", ApiService.handleAnalytics);
app.post("/twitter/parse", ApiService.handleTwitterParse);

export const GET = handle(app);
export const POST = handle(app);`}</code>
              </pre>
            </div>

            <p className="mb-4">
              In contrast, Next.js API routes require more extensive setup for
              middleware:
            </p>
            <div className="p-6 shadow-sm">
              <ul className="list-decimal pl-6 space-y-2">
                <li>Necessity for a separate middleware.ts file</li>
                <li>Custom middleware implementation requirements</li>
                <li>Additional configuration steps in middleware.ts</li>
              </ul>
            </div>
          </div>

          <div className="my-8 rounded-lg overflow-hidden bg-gray-50">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
              <span className="text-sm font-medium">
                Next.js Middleware Configuration
              </span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="font-courier">{`import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "@/lib/middleware/auth";
import { checkRateLimit } from "@/lib/middleware/rate-limit";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/public")) {
    return NextResponse.next();
  }

  // 1. Authentication verification
  const authError = await checkAuth(request);
  if (authError) return authError;

  // 2. Rate limit check for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    const rateLimitError = await checkRateLimit(request);
    if (rateLimitError) return rateLimitError;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};`}</code>
            </pre>
          </div>

          <p className="mb-6">
            This comparison is not to suggest that Hono is inherently superior
            to Next.js; rather, its design philosophy aligns more closely with
            the project&apos;s requirements, offering enhanced code readability
            and maintainability.
          </p>

          <p>
            The TwitDown project is open-source and available on GitHub:{" "}
            <Link
              href="https://github.com/ultrasev/twitdown"
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200 ml-2"
            >
              ultrasev/twitdown
            </Link>
            .
          </p>
        </section>

        <section id="seo" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 inline-block border-b-4 border-blue-500">
            Search Engine Optimization Strategy
          </h2>
          <div className="p-6 shadow-sm space-y-4">
            <p>
              Beyond creating a functional tool for video downloads, this
              project serves as a practical testbed for implementing advanced
              SEO techniques.
            </p>
            <p>
              While developing a website is relatively straightforward,
              achieving high search engine rankings requires meticulous
              optimization. Extensive research into SEO best practices has been
              conducted and implemented across various aspects of the project.
            </p>
            <p>
              Leveraging AI-assisted tools like Cursor, numerous optimizations
              were implemented, including metadata refinement, robots.txt
              configuration, and sitemap.xml generation. Post-launch analysis
              using AITDK revealed promising results, confirming proper
              implementation of titles, descriptions, keywords, OpenGraph
              metadata, and Twitter cards.
            </p>
            <p>
              Additional SEO strategies employed include structured data markup,
              internal link optimization, and targeted keyword research. These
              efforts have shown initial positive impacts on search engine
              rankings.
            </p>
          </div>
        </section>

        <section id="optimization" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 inline-block border-b-4 border-blue-500">
            Future Enhancements
          </h2>
          <div className="p-6 shadow-sm">
            <ul className="list-disc pl-6 space-y-4">
              <li>
                UI design optimization: While AI tools like Cursor provide
                valuable suggestions, there&apos;s significant potential for
                human-driven improvements based on user feedback and usability
                studies.
              </li>
              <li>
                Continued SEO refinement: Plans include strategic promotion on
                platforms like Twitter and Reddit to boost visibility. Ongoing
                experimentation with keyword optimization and content
                descriptions is underway to maximize organic reach.
              </li>
              <li>
                Performance optimization: Continuous monitoring and improvement
                of page load times, server response speeds, and overall
                application performance.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}

export default AboutPage;
