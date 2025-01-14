import { Suspense } from "react";
import DownloaderForm from "./DownloaderForm";

export default function SectionDownloader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-4xl mx-auto space-y-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            100% Free & Secure Downloads
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Download Any Twitter Video
          </span>
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
            ⚡ Lightning Fast
          </span>
          <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
            🎥 HD Quality
          </span>
          <span className="px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full">
            🔒 No Login Required
          </span>
        </div>

        <p className="text-xl text-gray-600 dark:text-gray-400">
          The fastest way to save Twitter/X videos in HD quality - No
          registration needed!
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <DownloaderForm />
        </Suspense>
      </div>
    </div>
  );
}
