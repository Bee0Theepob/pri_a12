"use client";

import { VideoPlayer } from "./VideoPlayer";
import { useState, useCallback } from "react";
import { useWindowListener } from "../hooks/useWindowListener";

export default function PromoteCard() {
  const [playing, setPlaying] = useState(true);
  // Prevent context menu on right-click
  const handleContextMenu = useCallback((e: Event) => {
    e.preventDefault();
  }, []);
  useWindowListener("contextmenu", handleContextMenu);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[80%] max-w-4xl shadow-lg mx-[10%] my-10 p-2 rounded-lg bg-gray-200 flex flex-row items-center">
        <div className="w-1/3 min-w-[160px] max-w-[320px]">
          <VideoPlayer
            vdoSrc="/video/venue.mp4"
            isPlaying={playing}
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="ml-6 flex flex-col gap-3">
          <div className="text-lg font-medium">Venue</div>
          <button
            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm w-max"
            onClick={() => {
              setPlaying(!playing);
            }}
          >
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
