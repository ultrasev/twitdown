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
    <main className="container mx-auto px-4 py-8 max-w-4xl bg-white dark:bg-gray-900">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Changelog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
          Track our progress and updates
        </p>
      </div>

      {changelog.map((entry, index) => (
        <div
          key={entry.version}
          className="mb-20 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {entry.version}
            </h2>
            <span className="text-gray-500 dark:text-gray-400">
              {entry.date}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              {entry.title}
            </h3>
            <span className="text-2xl">{entry.emoji}</span>
            {index === 0 && (
              <span className="ml-auto px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                Latest
              </span>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {entry.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(entry.categories).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {item}
                      </span>
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
