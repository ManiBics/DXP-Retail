"use client"; // This is a client component
import React from "react";
import { usePathname } from "next/navigation";
import ArticleListing from "../ArticleListing/page";
import ArticleDetailPage from "../ArticleDetail/page";

const ArticleListCards = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-80">
      {!pathname.includes("article-detail") ? (
        <ArticleListing />
      ) : (
        <ArticleDetailPage />
      )}
    </div>
  );
};

export default ArticleListCards;
