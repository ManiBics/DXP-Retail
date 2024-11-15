"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Typography } from "@mui/material";
import { getDataByContentType } from "@/utils/content";
import { useBackDrop } from "@/context/BackDropContext";
import { getLocale } from "@/utils";

function VideoDetailPage() {
  const [productDetail, setProductDetail] = useState(null);
  const { showBackDrop, hideBackDrop } = useBackDrop();
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        showBackDrop();
        const { locale = "en-US" } = getLocale(params?.slug);
        const pageContent = await getDataByContentType(
          "videopage",
          locale,
          slug
        );
        setProductDetail(pageContent?.[0] ?? []);
      } catch (error) {
      } finally {
        hideBackDrop();
      }
    };

    fetchProductDetails();
  }, []);

  if (!productDetail) {
    return <p className="lg:w-4/5 mx-auto pt-20 flex flex-wrap">Loading...</p>;
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full relative flex">
            {/* Grid of small images on the left */}
            <div className="flex flex-col space-y-2"></div>
            {productDetail?.video?.src && (
              <div className="zoomable-image w-full flex justify-center ">
                <video className="h-full w-full rounded-lg" controls>
                  <source src={productDetail?.video?.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 mb-0 self-center">
            <div className="mb-4">
              <h1 className="title-font font-medium text-[34px] text-gray-900 mb-2">
                {productDetail?.video_title}
              </h1>
            </div>
          </div>
          {productDetail?.video_description && (
            <div className="lg:w-full w-full lg:pl-10 lg:py-6 mt-12 lg:mt-12 mb-0">
              <div className="font-bold text-[28px] mb-4">
                Video Description
              </div>
              <Typography>
                {
                  productDetail?.video_description?.content[0]?.content[0]
                    ?.value
                }
              </Typography>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default VideoDetailPage;
