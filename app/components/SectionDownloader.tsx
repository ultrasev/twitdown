import { Suspense } from "react";
import DownloaderForm from "@/app/components/DownloaderForm";
import ButtonShare from "./ButtonShare";
import { comfortaa, young_serif } from "@/components/Font";

export default function SectionDownloader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-4xl mx-auto space-y-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            100% Free & Secure Downloads
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <span className={young_serif.className}>
              Download Any Twitter Video
            </span>
          </span>
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className={comfortaa.className}>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
              ⚡ Lightning Fast
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full">
              🎥 HD Quality
            </span>
            <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full">
              🔒 No Login Required
            </span>
          </span>
        </div>

        <p className="text-xl text-gray-600">
          <span className={comfortaa.className}>
            The fastest way to save Twitter/X videos in HD quality - No
            registration needed!
          </span>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <DownloaderForm />
        </Suspense>

        <ButtonShare url="https://twitdown.com" />
      </div>
    </div>
  );
}
