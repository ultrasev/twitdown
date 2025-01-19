import Link from "next/link";
import { berkshire } from "@/components/Font";

export default function PageHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200/50 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <TwitterIcon />
            <span className="ml-[-2px] text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-950 bg-clip-text text-transparent">
              <span className={`${berkshire.className}`}>TwitDown</span>
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-amber-800 hover:text-amber-950 transition-colors duration-200"
            >
              <span className={`${berkshire.className} text-lg`}>About</span>
            </Link>

            <Link
              href="/changelog"
              className="text-amber-800 hover:text-amber-950 transition-colors duration-200"
            >
              <span className={`${berkshire.className} text-lg`}>Changelog</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function TwitterIcon() {
  return (
    <svg
      className="w-6 h-6 text-amber-800"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}
