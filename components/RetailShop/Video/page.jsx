"use client"; // This is a client component
import React from "react";
import { useSearchParams } from "next/navigation";
import VideoListing from "../VideoListing/page";
import VideoDetailPage from "../VideoItems/page";

const VideoListCards = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  return (
    <div className="min-h-80">
      {!slug ? <VideoListing /> : <VideoDetailPage />}
    </div>
  );
};

export default VideoListCards;
