import { Suspense } from "react";
import DownloaderForm from "@/app/components/DownloaderForm";
import ButtonShare from "./ButtonShare";
import { DM_Serif_Display, Playfair_Display } from "next/font/google";
import { comfortaa } from "@/components/Font";
// Initialize the fonts
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function SectionDownloader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 bg-gradient-to-b from-amber-50/50 to-transparent">
      <div className="w-full max-w-4xl mx-auto space-y-12 text-center">
        <div className="mt-8 inline-flex items-center px-7 py-3 border border-amber-900/20 rounded-sm shadow-sm bg-white/80 backdrop-blur-sm">
          <span
            className={`${playfair.className} text-amber-900/90 uppercase tracking-[0.2em] text-sm font-medium`}
          >
            Simple & Reliable Downloads
          </span>
        </div>

        <h1
          className={`${dmSerif.className} text-5xl sm:text-6xl md:text-7xl tracking-tight text-amber-950 leading-[1.1]`}
        >
          Save Twitter Videos
          <span className="block italic text-amber-800">With Grace</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {[
            "⚡ Swift & Seamless",
            "🎥 Original Quality",
            "✨ Easy to Use",
          ].map((feature) => (
            <span
              key={feature}
              className={`px-6 py-3 bg-white/80 text-amber-900
                             border border-amber-200 uppercase tracking-wider font-medium
                             shadow-sm backdrop-blur-sm hover:bg-amber-100 transition-colors
                             duration-200`}
            >
              {feature}
            </span>
          ))}
        </div>

        <p
          className={`${dmSerif.className} text-lg sm:text-xl text-amber-800/90 max-w-2xl mx-auto leading-relaxed`}
        >
          Save any Twitter/X video in original quality
          <span
            className={`${comfortaa.className} block mt-1 text-base sm:text-lg font-normal`}
          >
            No fuss, no sign-ups, just elegant simplicity.
          </span>
        </p>

        <Suspense
          fallback={
            <div className="text-amber-700 animate-pulse">Loading...</div>
          }
        >
          <DownloaderForm />
        </Suspense>

        <ButtonShare url="https://twitdown.com" />
      </div>
    </div>
  );
}
