"use client"; // This is a client component
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useParams } from "next/navigation";
import { getDataByContentType } from "@/utils/content";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { useBackDrop } from "@/context/BackDropContext";
import { getLocale } from "@/utils";

const VideoListing = () => {
  const [proContentItems, setProContentItems] = useState([]);
  const { showBackDrop, hideBackDrop } = useBackDrop();
  const params = useParams();
  const { locale } = getLocale(params?.slug);

  useEffect(() => {
    (async () => {
      showBackDrop();
      const page = await getDataByContentType("videopage", locale ?? "en-US");
      setProContentItems(page);
      hideBackDrop();
    })();
  }, [locale]);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <h1 className="text-3xl mb-8">The Science of Listerine</h1>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {proContentItems.map((item, index) => (
          <div
            className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3 h-max"
            key={item.id}
          >
            <Card>
              <CardMedia
                component="video"
                className="media h-56 w-full object-cover"
                image={item?.video?.src}
                src={item?.video?.src}
                autoPlay
              />
              <CardContent>
                <Typography
                  gutterBottom
                  className="line-clamp-2"
                  variant="h5"
                  component="div"
                >
                  {item?.video_title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="video_description line-clamp-4"
                >
                  {item?.video_description?.content[0]?.content[0]?.value}
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  href={`${locale ? `/${locale}` : ""}/video-detail?slug=${
                    item?.id
                  }`}
                  className="p-2"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "100%" }}
                  >
                    View More
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoListing;
