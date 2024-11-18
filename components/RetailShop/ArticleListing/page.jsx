"use client"; // This is a client component
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useParams } from "next/navigation";
import { getDataByContentType } from "@/utils/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBackDrop } from "@/context/BackDropContext";
import { getLocale } from "@/utils";

gsap.registerPlugin(ScrollTrigger);

const ArticleListing = (props) => {
  const [proContentItems, setProContentItems] = useState([]);
  const cardsRef = useRef([]);

  const { showBackDrop, hideBackDrop } = useBackDrop();
  const params = useParams();
  const { locale } = getLocale(params?.slug);

  useEffect(() => {
    (async () => {
      showBackDrop();
      const page = await getDataByContentType("article", locale ?? "en-US");
      setProContentItems(page);
      hideBackDrop();
    })();
  }, [locale]);

  useEffect(() => {
    if (proContentItems.length > 0) {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }
  }, [proContentItems]);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12 ">
      <h1 className="text-3xl mb-8">List of Articles</h1>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {proContentItems.map((item, index) => (
          <div
            className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3"
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <article className="overflow-hidden rounded-lg shadow-lg card-list">
              <img
                alt={item?.title || "Article Image"}
                className="block h-72 w-full object-cover"
                src={item?.image?.[0]?.src || "/path/to/placeholder/image.jpg"}
              />
              <div className="card-bodylist">
                <header className="p-4">
                  <h2 className="text-lg font-bold mb-2 line-clamp-1">
                    {item?.title}
                  </h2>
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {item?.shortDescription}
                  </p>
                </header>
                <footer className="p-4">
                  <Link
                    href={`${locale ? `/${locale}` : ""}/article-detail?slug=${
                      item?.id
                    }`}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: "100%" }}
                    >
                      View Article
                    </Button>
                  </Link>
                </footer>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleListing;
