import { FaTwitter, FaFacebook } from "react-icons/fa";
import ButtonShareClient from "@/app/components/ButtonShareClient";

// Move share URL generation to server component
function getShareUrl(platform: string, url: string): string {
  const encodedUrl = encodeURIComponent(url);
  const text = encodeURIComponent(
    "Download Twitter videos easily with TwitDown! 🎥✨"
  );

  const urls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  return urls[platform as keyof typeof urls];
}

// Server Component
function ButtonShare({ url }: { url: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="font-serif">Share on:</span>
      {[
        { platform: "twitter", icon: <FaTwitter className="w-6 h-6" /> },
        { platform: "facebook", icon: <FaFacebook className="w-6 h-6" /> },
      ].map(({ platform, icon }) => (
        <ButtonShareClient
          key={platform}
          url={getShareUrl(platform, url)}
          icon={icon}
          platform={platform}
        />
      ))}
    </div>
  );
}

export default ButtonShare;
