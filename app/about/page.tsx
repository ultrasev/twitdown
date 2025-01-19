import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Twitter Video Downloader - TwitDown.com",
  description:
    "Easy-to-use Twitter video downloader. Download Twitter videos instantly with TwitDown.com",
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
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Main Content */}
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">为了下载 Twitter 视频，我做了个网站。</p>

        <p>
          说是网站，其实就是一个封装了视频解析 API
          的页面，输入推文链接，返回视频下载地址， 简单直观，网站地址：
          <Link
            href="https://twitdown.com"
            className="text-blue-600 dark:text-blue-400"
          >
            twitdown.com
          </Link>
          。
        </p>

        <p>
          为了避免重复解析（节省 API
          成本），解析后的视频地址会入库存储，下次访问时，
          优先从数据库中查询并返回。
        </p>

        <Image
          src="/structure.png"
          alt="TwitDown workflow"
          width={800}
          height={400}
          className="rounded-lg my-8"
        />

        <section id="tech-stack">
          <h2 className="text-2xl font-bold mt-8 mb-4">技术栈</h2>
          <ul className="list-disc pl-6">
            <li>前端：Next.js</li>
            <li>后端：Hono</li>
            <li>数据库：PostgreSQL</li>
            <li>部署：Vercel</li>
            <li>Video parse API: Twitter API</li>
            <li>统计：Umami</li>
            <li>Rate limiter: upstash</li>
          </ul>
          关于 hono，一开始我使用的 NextJs 自带的 API 路由，但尝试使用了 Hono
          之后，发现跟我的 习惯非常匹配，之前用 FastAPI
          的开发习惯，可以无缝迁移到 Hono 上。 Nextjs 默认的 API
          路由在使用时对我来说有点麻烦，比如在设置 Middleware 时，我需要 1.
          创建一个middleware.ts 文件； 2. 创建中间件 ; 3. 在 middleware.ts
          中设置规则，根据不同的请求路径，设置不同的中间件；
          很多时候，我需要根据正则表达式来设置不同的中间件，比如
          `/api/v1/download` 都要走验证。 而 hono
          的中间件设置非常简单，很多工作这个框架已经帮开发者做了。
          比如这个小项目 twitdown 现在 hono 路由设置就如下所示 ，非常清爽：
          <pre>
            <code>
              {`
              import { Hono } from "hono";
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
export const POST = handle(app);

              `}
            </code>
          </pre>
          而做为对比，之前使用 Nextjs 的 API 路由时，需要设置中间件，代码如下：
          <pre>
            <code>
              {`
              import { NextResponse } from "next/server";
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
};

              `}
            </code>
          </pre>
          当然，这里不是说 hono 要优于 Nextjs，而是说 hono
          的设计理念更符合我的倾向，代码可读性更好，也好维护扩展。
          <p>
            TwitDown 项目的代码已经开源到 github 上：
            <Link
              href="https://github.com/ultrasev/twitdown"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ultrasev/twitdown
            </Link>
            。
          </p>
        </section>

        <section id="seo">
          <h2 className="text-2xl font-bold mt-8 mb-4">SEO</h2>
          <p>
            做这个网站，除了方便自己下载视频之外，其实还有一个目的是为了测试下
            SEO（search engine optimization）技巧。
          </p>
          SEO 做这个网站，除了方便自己下载视频之外，其实还有一个目的是为了测试下
          SEO（search engine optimization）技巧。
          糊个网站是很简单的事，但让网站在搜索引擎中排名靠前，就需要做很多优化工作。最近在看《SEO
          实战手册》，了解了一些技巧，正尝试着在各个项目中实践一下。 作为 SEO
          小白，很多工作都是让 Cursor 做的，比如界面的 metadata，网站的
          robots.txt，sitemap.xml。网站上线之后用 AITDK
          测试了一下，效果还不错，title, description, keywords, openGraph,
          twitter card，该配置的地方都配置了。
        </section>

        <section id="optimization">
          <h2 className="text-2xl font-bold mt-8 mb-4">优化</h2>
          <ul className="list-disc pl-6">
            <li>
              UI 非常依赖于开发者的经验与审美，不能仅靠 Cursor 来生成"更好看的
              UI"，但目前来看，Cursor 的经验与审美是优于我的。
            </li>
            <li>
              SEO 持续优化，如果在 twitter, reddit 等平台上推广一下，我觉得 PV
              应该会涨的很快，目前我想测试一下关键词及描述语的极限在哪里。
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}

export default AboutPage;
