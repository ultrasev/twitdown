"use client";

import { ReactNode } from "react";

interface ButtonShareClientProps {
  url: string;
  icon: ReactNode;
  platform: string;
}

function ButtonShareClient({ url, icon, platform }: ButtonShareClientProps) {
  const hoverStyles = {
    twitter: "hover:bg-sky-100 hover:text-sky-500",
    facebook: "hover:bg-blue-100 hover:text-blue-600"
  };

  const handleShare = () => {
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleShare}
      className={`p-2 rounded-full transition-all duration-200 text-gray-600
        ${hoverStyles[platform as keyof typeof hoverStyles]}`}
      aria-label={`Share on ${platform}`}
    >
      {icon}
    </button>
  );
}

export default ButtonShareClient;