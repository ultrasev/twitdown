import Link from "next/link";
import { XIcon } from "./icons";

export default function PageHeader() {
  return (
    <header className="border-b dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <XIcon />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              XVideoDownloader
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              href="/changelog"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Changelog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
