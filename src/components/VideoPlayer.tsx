"use client";
import { useRef, useEffect } from "react";

export function VideoPlayer({
  vdoSrc,
  isPlaying,
  className,
}: {
  vdoSrc: string;
  isPlaying: boolean;
  className?: string;
}) {
  const vdoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // alert("width is" + vdoRef.current?.videoWidth);
    if (isPlaying) {
      vdoRef.current?.play();
    } else {
      vdoRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <video
      className={className ?? "w-full h-auto rounded-md shadow-sm"}
      src={vdoSrc}
      ref={vdoRef}
      muted
      loop
      controls
    />
  );
}

export default VideoPlayer;
