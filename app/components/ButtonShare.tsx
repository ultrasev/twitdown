import { FaTwitter, FaFacebook } from "react-icons/fa";
import ButtonShareClient from "@/app/components/ButtonShareClient";

// Move share URL generation to server component
function getShareUrl(platform: string, url: string): string {
  const encodedUrl = encodeURIComponent(url);
  const text = encodeURIComponent(
    "Save Twitter videos with elegance and simplicity ✨"
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
    <div className="flex items-center justify-center gap-3">
      <span className={`text-amber-900/90 tracking-wide`}>
        Share this site with friends:
      </span>
      {[
        {
          platform: "twitter",
          icon: <FaTwitter className="w-6 h-6 text-[#1DA1F2]" />,
          color: "text-[#1DA1F2] hover:text-[#1a8cd8]", // Twitter brand color
        },
        {
          platform: "facebook",
          icon: <FaFacebook className="w-6 h-6 text-[#1877F2]" />,
          color: "text-[#1877F2] hover:text-[#166fe5]", // Facebook brand color
        },
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
