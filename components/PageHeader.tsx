import Link from "next/link";
import { TwitterIcon } from "./icons";
import { berkshire } from "@/components/Font";

export default function PageHeader() {
  return (
    <header className="border-b dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <TwitterIcon />
            <span className="ml-[-2px] text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <span className={`${berkshire.className}`}>TwitDown</span>
            </span>
          </Link>

          <nav className="flex items-center gap-16">
            <Link
              href="/changelog"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <span className={`${berkshire.className}`}>Changelog</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
