import fs from "fs";
import path from "path";
import { format } from "date-fns";

// 配置
const config = {
  baseUrl: "https://www.twitdown.com",
  sitemaps: {
    static: [
      { loc: "/", priority: 1.0, changefreq: "daily" },
      { loc: "/about", priority: 0.8, changefreq: "monthly" },
      { loc: "/privacy", priority: 0.3, changefreq: "monthly" },
      { loc: "/terms", priority: 0.3, changefreq: "monthly" },
      { loc: "/changelog", priority: 0.6, changefreq: "monthly" },
    ],
    blog: [
      { loc: "/blog", priority: 0.6, changefreq: "weekly" },
      { loc: "/blog/tackstack", priority: 0.6, changefreq: "weekly" },
    ],
  },
};

// 生成主 sitemap.xml
function generateMainSitemap(): string {
  const today = format(new Date(), "yyyy-MM-dd");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(config.sitemaps)
  .map(
    (type) => `  <sitemap>
    <loc>${config.baseUrl}/sitemap-${type}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;
}

// 生成子 sitemap 文件
function generateSubSitemap(type: string, urls: any[]): string {
  const today = format(new Date(), "yyyy-MM-dd");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${config.baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod || today}</lastmod>
    <changefreq>${url.changefreq || "monthly"}</changefreq>
    <priority>${url.priority || 0.5}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

// 写入文件
function writeSitemaps() {
  const publicDir = path.join(process.cwd(), "public");

  // 确保 public 目录存在
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 生成主 sitemap.xml
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), generateMainSitemap());
  console.log("Generated sitemap.xml");

  // 生成子 sitemap 文件
  Object.entries(config.sitemaps).forEach(([type, urls]) => {
    fs.writeFileSync(
      path.join(publicDir, `sitemap-${type}.xml`),
      generateSubSitemap(type, urls)
    );
    console.log(`Generated sitemap-${type}.xml`);
  });
}

// 执行生成
writeSitemaps();
