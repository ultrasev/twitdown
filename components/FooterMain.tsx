import { young_serif } from "@/components/Font";
import { TwitterIcon } from "@/components/icons";

export default function FooterMain() {
  return (
    <footer className="border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 font-serif text-center">
          <div>© {new Date().getFullYear()} TwitDown. All rights reserved.</div>
          <div className="flex items-center space-x-4 mt-2">
            <a
              href="/terms"
              className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Terms
            </a>
            <span>·</span>
            <a
              href="/privacy"
              className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Privacy
            </a>
          </div>
          {/* <a
            href="https://twitter.com/tommy_dev"
            className="flex items-center space-x-1 mt-2 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <TwitterIcon />
            <span className={`${young_serif.className}`}>@twitdown</span>
          </a> */}
        </div>
      </div>
    </footer>
  );
}
