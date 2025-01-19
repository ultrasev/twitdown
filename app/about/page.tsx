import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Twitter Video Downloader - TwitDown.com",
  description:
    "Documentation for TwitDown.com, an easy-to-use Twitter video downloader. Download Twitter videos instantly with TwitDown.com",
  keywords:
    "twitter video downloader, download twitter videos, twitter video saver",
  openGraph: {
    title: "Twitter Video Downloader - TwitDown.com",
    description: "Easy-to-use Twitter video downloader",
    type: "article",
    url: "https://twitdown.com/about",
  },
};

function AboutPage() {
  return (
    <article className="max-w-5xl mx-auto px-4 py-12 min-h-screen rounded-xl">
      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          About TwitDown
        </h1>

        <p className="text-xl mb-6">I built this website to simplify Twitter video downloads.</p>

        <p className="mb-6">
          At its core, it&apos;s a streamlined interface wrapping a video parsing API. Simply input a tweet URL,
          and get the video download link. Check it out at{" "}
          <Link
            href="https://twitdown.com"
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200 underline decoration-2 decoration-blue-200"
          >
            twitdown.com
          </Link>
          .
        </p>

        <p className="mb-8">
          To optimize API costs and improve performance, parsed video URLs are stored in our database.
          Subsequent requests for the same video are served directly from the cache.
        </p>

        <div className="relative rounded-xl overflow-hidden shadow-2xl mb-12">
          <Image
            src="/structure.png"
            alt="TwitDown workflow diagram showing the system architecture"
            width={800}
            height={400}
            className="w-full"
            priority
          />
        </div>

        <section id="tech-stack" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 inline-block border-b-4 border-blue-500">
            Tech Stack
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
            {[
              { label: "Frontend", value: "Next.js" },
              { label: "Backend", value: "Hono", link: "https://hono.dev/" },
              { label: "Database", value: "PostgreSQL", link: "https://www.postgresql.org/" },
              { label: "Deployment", value: "Vercel", link: "https://vercel.com/" },
              { label: "Video parse API", value: "Twitter API", link: "https://developer.twitter.com/en/docs/twitter-api" },
              { label: "Statistics", value: "Umami", link: "https://umami.is/" },
              { label: "Rate limiter", value: "upstash", link: "https://upstash.com/" },
            ].map(({ label, value, link }) => (
              <li key={label} className="flex items-center p-4 rounded-lg bg-white shadow-sm">
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
        </section>

        <section id="hono-comparison" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 inline-block border-b-4 border-blue-500">
            Why Hono?
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="mb-4">
                I initially started with Next.js API routes but switched to Hono for its simplicity and elegance:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Familiar experience for FastAPI developers - seamless transition</li>
                <li>Built-in middleware configuration - everything works out of the box</li>
                <li>Clean and intuitive routing system</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="mb-4">Next.js API routes require more setup for middleware:</p>
              <ul className="list-decimal pl-6 space-y-2">
                <li>Separate middleware.ts file required</li>
                <li>Custom middleware implementation</li>
                <li>Additional configuration in middleware.ts</li>
              </ul>
            </div>

            <p>
              For example, adding authentication to <code className="bg-gray-100 px-2 py-1 rounded">/api/v1/download</code>
              is straightforward with Hono. Here&apos;s how clean it looks:
            </p>
          </div>

          <div className="my-8 rounded-lg overflow-hidden bg-gray-50">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
              <span className="text-sm font-medium">Hono Route Setup</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm">{`import { Hono } from "hono";
import { handle } from "hono/vercel";
import { setupMiddleware } from "../middleware";
import { ApiService } from "../services/api-service";

const app = new Hono().basePath("/api");
// Setup middleware
setupMiddleware(app);

// Public routes
app.get("/hello", (c) => c.json({ message: "Hello, World!" }));

// Protected routes
app.get("/analytics", ApiService.handleAnalytics);
app.post("/twitter/parse", ApiService.handleTwitterParse);

export const GET = handle(app);
export const POST = handle(app);`}</code>
            </pre>
          </div>

          <div className="my-8 rounded-lg overflow-hidden bg-gray-50">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
              <span className="text-sm font-medium">Next.js Middleware Setup</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm">{`import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "@/lib/middleware/auth";
import { checkRateLimit } from "@/lib/middleware/rate-limit";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/public")) {
    return NextResponse.next();
  }

  // 1. Check authentication
  const authError = await checkAuth(request);
  if (authError) return authError;

  // 2. Check rate limit for API routes
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
            This isn&apos;t to say Hono is superior to Next.js - rather, its design philosophy aligns better with my preferences,
            offering better code readability and maintainability.
          </p>

          <p>
            The TwitDown project is open source and available on GitHub:{" "}
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
            SEO
          </h2>
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
            <p>
              Beyond creating a useful tool for video downloads, this project serves as a testbed for SEO techniques.
            </p>
            <p>
              While building a website is straightforward, achieving high search engine rankings requires careful optimization.
              I&apos;ve been studying SEO best practices and implementing them across various projects.
            </p>
            <p>
              As an SEO novice, I leveraged Cursor for many optimizations, including metadata, robots.txt, and sitemap.xml.
              Post-launch testing with AITDK showed promising results, with proper configuration of titles, descriptions,
              keywords, OpenGraph, and Twitter cards.
            </p>
          </div>
        </section>

        <section id="optimization" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 inline-block border-b-4 border-blue-500">
            Future Improvements
          </h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <ul className="list-disc pl-6 space-y-4">
              <li>
                UI design heavily relies on developer experience and aesthetic sense. While Cursor provides solid suggestions,
                there&apos;s always room for human-driven improvements.
              </li>
              <li>
                Ongoing SEO optimization - promoting on platforms like Twitter and Reddit could significantly boost page views.
                Currently testing the limits of keyword optimization and content descriptions.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}

export default AboutPage;
