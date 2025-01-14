"use client";

import { useState } from "react";
import CardVideoPreview from "@/app/components/CardVideoPreview";
import { http } from "@/lib/http";

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

function isValidTwitterUrl(url: string): boolean {
  const twitterUrlPattern =
    /^https?:\/\/((?:x|twitter)\.com)\/[a-zA-Z0-9_]+\/status\/\d+/;
  return twitterUrlPattern.test(url);
}

export default function DownloaderForm() {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValidTwitterUrl(url)) {
      setError("Please enter a valid Twitter/X video URL");
      return;
    }

    setIsLoading(true);
    setError("");
    setVideoData(null);

    try {
      const { data } = await http.post<VideoData>('/api/twitter/parse', { url });
      setVideoData(data);
    } catch (err) {
      setError("Failed to fetch video. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-8 mx-auto text-center">
      <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Twitter/X video URL here"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() =>
                navigator.clipboard.readText().then((text) => setUrl(text))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              disabled={isLoading}
            >
              <ClipboardIcon />
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !url}
            className="mt-4 w-full py-3 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <DownloadIcon />
            <span>{isLoading ? "Processing..." : "Download"}</span>
          </button>
        </form>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {videoData && <CardVideoPreview data={videoData} />}
    </div>
  );
}

function ClipboardIcon() {
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
