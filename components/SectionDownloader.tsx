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
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Twitter Video Downloader
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Download Twitter videos easily
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Twitter/X video URL here"
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <ButtonDownload isLoading={isLoading} />
      </form>

      {videoData && <CardVideoPreview data={videoData} />}
    </div>
  );
}
