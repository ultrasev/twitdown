import React from "react";
import Image from 'next/image';

interface VideoPreviewProps {
  data: {
    thumbnail: string;
    resolutions: {
      url: string;
      resolution: string;
      quality: string;
    }[];
    text: string;
  };
}

export default function CardVideoPreview({ data }: VideoPreviewProps) {
  // Helper function to format resolution
  function formatResolution(resolution: string): string {
    // Extract the numeric value from resolution string (e.g., "1280p" -> "720p")
    const height = resolution.match(/\d+/)?.[0];
    if (!height) return resolution;

    // Map common vertical resolutions to standard formats
    const resolutionMap: Record<string, string> = {
      '1280': '720p',
      '852': '480p',
      '568': '360p',
    };

    return resolutionMap[height] || `${height}p`;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Video Preview Section */}
      <div className="relative aspect-video">
        <Image
          src={data.thumbnail}
          alt="Video thumbnail"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-4 right-4 text-white text-lg font-medium z-10">
          {data.text}
        </h3>
      </div>

      {/* Download Options Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
          Download
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Choose your preferred video quality
        </p>

        <div className="space-y-3">
          {data.resolutions.map((res, index) => (
            <a
              key={index}
              href={res.url}
              download
              className="group flex items-center justify-between w-full px-4 py-3
                         bg-gradient-to-r from-blue-500 to-purple-500
                         hover:from-blue-600 hover:to-purple-600
                         text-white rounded-xl transition-all duration-200
                         hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-center space-x-3">
                <DownloadIcon />
                <span className="font-medium">
                  Download {formatResolution(res.resolution)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {res.quality}
                </span>
                <ArrowIcon />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
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

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
