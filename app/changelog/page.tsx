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
    version: "v0.2.0",
    date: "December 4, 2024",
    title: "Enhanced User Experience",
    emoji: "🍎",
    description:
      "Improved video download page with better UI and mobile experience",
    categories: {
      "User Interface": [
        "Redesigned video download page",
        "Enhanced mobile responsiveness",
        "Improved download button design",
        "Better scrolling experience on mobile",
        "Optimized layout for different screen sizes",
      ],
      "User Experience": [
        "Added hover effects for better interactivity",
        "Improved loading states and animations",
        "Enhanced error message presentation",
        "Better visual feedback for user actions",
      ],
      "Technical Improvements": [
        "Optimized page rendering performance",
        "Enhanced responsive layout system",
        "Improved glass effect implementation",
        "Better state management for downloads",
      ],
    },
  },
  {
    version: "v0.1.0",
    date: "December 1, 2024",
    title: "Initial Release",
    emoji: "🚀",
    description: "First public release of Twitter Video Downloader",
    categories: {
      "Core Features": [
        "Basic video downloading functionality",
        "Multiple video quality options",
        "Support for Twitter/X video links",
        "Backup download sources",
        "Custom filename support",
      ],
      "User Interface": [
        "Modern and clean design",
        "Responsive layout for all devices",
        "Beautiful animations and transitions",
        "Loading states and error handling",
        "Copy-paste URL support",
      ],
      Internationalization: [
        "Support for 13 languages",
        "RTL layout support for Arabic",
        "Automatic language detection",
        "Easy language switching",
      ],
      Technical: [
        "Built with Next.js 14",
        "TypeScript for type safety",
        "Tailwind CSS for styling",
        "JWT for secure downloads",
        "Optimized API performance",
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
        <div key={entry.version} className="mb-20 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{entry.version}</h2>
            <span className="text-gray-500 dark:text-gray-400">{entry.date}</span>
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
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{category}</h4>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600 dark:text-gray-400">{item}</span>
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
