"use client"; // This is a client component
import React from "react";
import { usePathname } from "next/navigation";
import VideoListing from "../VideoListing/page";
import VideoDetailPage from "../VideoItems/page";

const VideoListCards = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-80">
      {!pathname.includes("video-detail") ? (
        <VideoListing />
      ) : (
        <VideoDetailPage />
      )}
    </div>
  );
};

export default VideoListCards;
