import { young_serif } from "@/components/Font";
// import { TwitterIcon } from "@/components/icons";

export default function FooterMain() {
  return (
    <footer className="mt-16 border-t border-amber-200/50 bg-gradient-to-b from-transparent to-amber-50/30">
      <div className="container mx-auto px-4 py-8">
        <div
          className={`${young_serif.className} flex flex-col items-center justify-center text-center space-y-4`}
        >
          <div className="text-amber-900/80">
            © {new Date().getFullYear()} TwitDown. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="/terms"
              className="text-amber-800 hover:text-amber-950
                       transition-colors duration-200 text-sm tracking-wide"
            >
              Terms of Service
            </a>
            <span className="text-amber-300">✦</span>
            <a
              href="/privacy"
              className="text-amber-800 hover:text-amber-950
                       transition-colors duration-200 text-sm tracking-wide"
            >
              Privacy Policy
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
