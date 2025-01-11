import { Suspense } from "react";
import DownloaderForm from "./DownloaderForm";

export default function SectionDownloader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full mx-auto space-y-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
          <HeartIcon />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Free, No Login Required
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          Twitter Video Downloader
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400">
          Download Twitter videos easily
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <DownloaderForm />
        </Suspense>
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );
}
