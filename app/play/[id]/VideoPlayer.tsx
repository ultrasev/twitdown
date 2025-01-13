"use client";

import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import type { Video } from "@/app/types/video";

export default function VideoPlayer({ video }: { video: Video }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | undefined>(undefined);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        keyboard: { focused: true, global: true },
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

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        playsInline
        controls
        data-poster={video.posterUrl}
      >
        <source src={`/api/videos/stream?id=${video.id}`} type="video/mp4" />
      </video>
    </div>
  );
}
