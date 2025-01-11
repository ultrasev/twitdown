import React from "react";
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
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <img
        src={data.thumbnail}
        alt="Video thumbnail"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-4">{data.text}</h3>

      <div className="space-y-3">
        {data.resolutions.map((res, index) => (
          <a
            key={index}
            href={res.url}
            download
            className="flex items-center justify-between w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <span>Download {res.resolution}</span>
            <span className="text-sm bg-white/20 px-2 py-0.5 rounded">
              {res.quality}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
