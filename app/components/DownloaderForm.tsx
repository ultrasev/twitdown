"use client";

import { useState } from "react";
import { Crimson_Pro, Inter } from "next/font/google";
import CardVideoPreview from "@/app/components/CardVideoPreview";
import { http } from "@/lib/http";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal"],
});
const inter = Inter({ subsets: ["latin"] });

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
      const { data } = await http.post<VideoData>("/api/twitter/parse", {
        url,
      });
      setVideoData(data);
    } catch (err) {
      setError("Failed to fetch video. Please check the URL and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-8 mx-auto text-center">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Twitter/X video URL here"
              className={`${inter.className} w-full px-6 py-4 rounded-lg
                bg-white/80 backdrop-blur-sm
                border border-amber-200
                text-amber-900 placeholder-amber-400
                focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400
                transition-colors duration-200`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() =>
                navigator.clipboard.readText().then((text) => setUrl(text))
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600 transition-colors duration-200"
              disabled={isLoading}
            >
              <ClipboardIcon />
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !url}
            className={`w-full py-2
              bg-amber-100 hover:bg-amber-200
              border border-amber-200
              text-amber-900 text-lg tracking-wide
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
              rounded`}
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                Processing
                <span className="ml-1 animate-dot-1">.</span>
                <span className="animate-dot-2">.</span>
                <span className="animate-dot-3">.</span>
              </span>
            ) : (
              <span className="inline-flex items-center justify-center gap-2">
                <DownloadIcon />
                Download Video
              </span>
            )}
          </button>
        </form>
      </div>

      {error && (
        <p className={`${crimsonPro.className} text-red-500 mt-8 text-lg`}>
          {error}
        </p>
      )}

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
        strokeWidth={1.5}
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
        strokeWidth={1.5}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}
