import Link from "next/link";
import { TwitterIcon } from "./icons";
import { berkshire } from "@/components/Font";

export default function PageHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <TwitterIcon />
            <span className="ml-[-2px] text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <span className={`${berkshire.className}`}>TwitDown</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-gray-600 text-2xl hover:text-gray-900 dark:text-gray-600 dark:hover:text-gray-100"
            >
              <span className={`${berkshire.className}`}>About</span>
            </Link>
          </div>

          <nav className="flex items-center gap-16">
            <Link
              href="/changelog"
              className="text-gray-600 text-2xl hover:text-gray-900 dark:text-gray-600 dark:hover:text-gray-100"
            >
              <span className={`${berkshire.className}`}>Changelog</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
