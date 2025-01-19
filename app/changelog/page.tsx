// Define types for changelog entries
type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  emoji: string;
  description: string;
  categories: {
    [key: string]: string[];
  };
};

// Changelog data
const changelog: ChangelogEntry[] = [
  {
    version: "v0.0.2",
    date: "January 12, 2025",
    title: "Architecture & Performance Optimization",
    emoji: "⚡",
    description:
      "Major architectural enhancements and performance breakthroughs",
    categories: {
      Architecture: [
        "Adopted React Server Components (RSC) architecture",
        "Refined component tree for optimal code-splitting",
        "Leveraged Zustand for state management",
        "Introduced advanced caching strategies",
        "Achieved bundle size reduction through dynamic imports",
      ],
      Performance: [
        "Achieved 40% reduction in Time to First Byte (TTFB)",
        "Elevated Core Web Vitals metrics (LCP < 2.5s)",
        "Launched Streaming SSR capabilities",
        "Enhanced image optimization with next/image",
        "Boosted navigation speed with intelligent prefetching",
      ],
      "Technical Enhancements": [
        "Engineered robust error boundary system",
        "Strengthened type safety with strict TypeScript",
        "Maximized Tailwind CSS optimization for production",
        "Delivered progressive image loading strategy",
        "Refined API response caching mechanism",
      ],
    },
  },
  {
    version: "v0.0.1",
    date: "August 23, 2024",
    title: "Initial Architecture Release",
    emoji: "🎯",
    description: "Foundational architecture powered by Next.js 14",
    categories: {
      "Core Architecture": [
        "Designed Next.js App Router architecture",
        "Enforced TypeScript strict mode standards",
        "Built custom design system with Tailwind CSS",
        "Secured authentication flow with JWT",
        "Orchestrated API rate limiting and caching",
      ],
      "Frontend Architecture": [
        "Adopted component-driven development (CDD)",
        "Structured atomic design pattern system",
        "Crafted responsive design framework",
        "Engineered error boundary hierarchy",
        "Achieved WCAG 2.1 accessibility compliance",
      ],
      Infrastructure: [
        "Orchestrated CI/CD pipeline via GitHub Actions",
        "Developed comprehensive testing framework",
        "Optimized production build pipeline",
        "Deployed monitoring and logging infrastructure",
        "Streamlined deployment automation",
      ],
    },
  },
];

// Main changelog component
export default function PageChangelog() {
  return (
    <main className="container mx-auto px-8 py-8 max-w-5xl bg-stone-50">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-stone-800">
          Changelog
        </h1>
        <p className="font-serif text-xl text-stone-600 mt-4">
          Track our progress and updates
        </p>
      </div>

      {changelog.map((entry, index) => (
        <div
          key={entry.version}
          className="mb-20 rounded-lg p-8 bg-white border border-stone-200 shadow-[4px_4px_0px_0px_rgba(120,113,108,0.15)]"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-mono text-3xl font-bold text-stone-800">
              {entry.version}
            </h2>
            <span className="font-serif text-stone-600">{entry.date}</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-serif text-2xl font-semibold text-stone-700">
              {entry.title}
            </h3>
            <span className="text-2xl">{entry.emoji}</span>
            {index === 0 && (
              <span className="ml-auto px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm font-mono">
                Latest
              </span>
            )}
          </div>

          <p className="font-serif text-stone-600 mb-8">{entry.description}</p>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(entry.categories).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h4 className="font-serif text-xl font-semibold text-stone-700 mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-stone-400">•</span>
                      <span className="font-serif text-stone-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}

export const metadata = {
  title: "Changelog - TwitDown",
  description: "Track our progress and updates on TwitDown.",
};
