"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import CardVideoPreview from "@/app/components/CardVideoPreview";
import { http } from "@/lib/http";

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
    /^https?:\/\/((?:mobile\.|)(?:x|twitter)\.com)\/[a-zA-Z0-9_]+\/status\/\d+/;
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
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-8
          bg-white/30 backdrop-blur-lg rounded-3xl
          shadow-[0_8px_30px_rgb(0,0,0,0.04)]
          border border-amber-100/50"
        >
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Twitter/X video URL here"
              className={`${inter.className} w-full px-6 py-4
                bg-white/60 backdrop-blur-sm
                border border-amber-100
                rounded
                focus:outline-none focus:ring-2 focus:ring-amber-200/50
                transition-all duration-300 ease-in-out
                shadow-[0_2px_15px_rgb(0,0,0,0.03)]`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() =>
                navigator.clipboard.readText().then((text) => setUrl(text))
              }
              className="absolute right-4 top-1/2 -translate-y-1/2
                       transition-colors duration-200
                       flex items-center gap-1"
              disabled={isLoading}
              title="Paste from clipboard"
            >
              <span className="text-sm">Paste</span>
              <ClipboardIcon />
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !url}
            className={`w-full py-3 px-6
              bg-gradient-to-r from-amber-400/90 to-amber-500/90
              hover:from-amber-400 hover:to-amber-500
              backdrop-blur-sm
              text-white font-medium tracking-wide
              rounded
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 ease-in-out
              shadow-[0_4px_20px_rgb(251,191,36,0.2)]
              border border-white/20`}
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

      {error && <p className={`text-red-500 mt-8 text-lg`}>{error}</p>}
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
