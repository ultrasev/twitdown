"use client";

import { useState } from "react";
import ButtonDownload from "@/components/ButtonDownload";
import CardVideoPreview from "@/components/CardVideoPreview";

interface VideoData {
  thumbnail: string;
  resolutions: {
    url: string;
    resolution: string;
    quality: string;
  }[];
  text: string;
  username: string;
  statusId: string;
}

export default function SectionDownloader() {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://www.xxxxxxxx/api/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setVideoData(data);
    } catch (error) {
      console.error("Error fetching video data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-3xl space-y-6 text-center">
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

        <div className="mt-8 w-full">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Twitter/X video URL here"
                className="w-full px-6 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg
                          border border-gray-200 dark:border-gray-700
                          focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() =>
                  navigator.clipboard.readText().then((text) => setUrl(text))
                }
              >
                <ClipboardIcon />
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full px-6 py-4 rounded-2xl font-medium text-white
                        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                        hover:opacity-90 transition-opacity disabled:opacity-50
                        flex items-center justify-center space-x-2"
            >
              <DownloadIcon />
              <span>{isLoading ? "Processing..." : "Download"}</span>
            </button>
          </form>
        </div>

        {videoData && <CardVideoPreview data={videoData} />}
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      className="w-5 h-5 text-blue-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}
