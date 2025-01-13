"use client";

import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

// Main component for video player
export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | undefined>(undefined);

  useEffect(() => {
    // Initialize Plyr when component mounts
    if (videoRef.current && !playerRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        keyboard: {
          focused: true,
          global: true,
        },
        seekTime: 10,
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "settings",
          "fullscreen",
        ],
        settings: ["quality", "speed"],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
      });
    }

    // Cleanup on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] mx-auto p-4 mt-8">
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          className="w-full aspect-video"
          playsInline
          controls
          data-poster="/x.png"
        >
          <source
            src="https://filedn.com/lCdtpv3siVybVynPcgXgnPm/%E7%9B%9F%E7%BA%A6.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}
