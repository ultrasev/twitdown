import React from "react";
import Image from "next/image";
import { Crimson_Pro, Inter } from "next/font/google";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal"],
});
const inter = Inter({ subsets: ["latin"] });

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
      "1280": "720p",
      "852": "480p",
      "568": "360p",
    };

    return resolutionMap[height] || `${height}p`;
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mt-8 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Video Preview Section */}
          <div className="relative aspect-video w-full">
            <Image
              src={data.thumbnail}
              alt="Video thumbnail"
              fill
              className="object-cover rounded-xl border border-amber-200"
              sizes="(max-width: 640px) 90vw, 45vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/50 to-transparent" />
            <h3
              className={`${inter.className} absolute bottom-4 left-4 right-4 text-amber-50 text-lg`}
            >
              {data.text.length > 24
                ? data.text.slice(0, 24) + "..."
                : data.text}
            </h3>
          </div>

          {/* Download Options Section */}
          <div className="flex flex-col justify-center w-full space-y-6">
            <div>
              <h2
                className={`text-2xl text-amber-950 mb-2`}
              >
                Download Options
              </h2>
              <p className={`text-amber-800/90 text-sm`}>
                Choose your preferred video quality
              </p>
            </div>

            <div className="space-y-3">
              {data.resolutions.map((res, index) => (
                <a
                  key={index}
                  href={res.url}
                  download
                  className={`${inter.className} group flex items-center justify-between w-full px-4 py-3
                             bg-amber-100 hover:bg-amber-200
                             border border-amber-200
                             text-amber-900 rounded-sm
                             transition-colors duration-200`}
                >
                  <div className="flex items-center gap-3">
                    <DownloadIcon />
                    <span className="font-medium">
                      {formatResolution(res.resolution)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-amber-200/50 px-3 py-1">
                      {res.quality}
                    </span>
                    <ArrowIcon />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="w-5 h-5 text-amber-700"
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

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
