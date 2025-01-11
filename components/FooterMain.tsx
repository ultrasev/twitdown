import { XIcon } from "./icons";

export default function FooterMain() {
  return (
    <footer className="border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center ">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} XDown. All rights reserved.
        </div>
        {/* X: tommy */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <a
            href="https://twitter.com/tommy_dev"
            className="flex items-center space-x-1"
          >
            <XIcon />
            <span>@xdown</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
