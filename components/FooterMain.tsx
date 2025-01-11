import Link from "next/link";

export default function FooterMain() {
  return (
    <footer className="border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} TwitterDown. All rights reserved.
          </div>

          <nav className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link
              href="/changelog"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Changelog
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Blog
            </Link>
            <Link
              href="/feedback"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Feedback
            </Link>
            <Link
              href="https://twitter.com/@Jewel"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <div className="flex items-center space-x-1">
                <XIcon />
                <span>@Jewel</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
