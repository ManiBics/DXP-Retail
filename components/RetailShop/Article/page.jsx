"use client"; // This is a client component
import React from "react";
import { usePathname } from "next/navigation";
import ArticleListing from "../ArticleListing/page";
import ArticleDetailPage from "../ArticleDetail/page";

const ArticleListCards = (props) => {
  const pathname = usePathname();

  return (
    <div className="min-h-80">
      {!pathname.includes("article-detail") ? (
        <ArticleListing {...props} />
      ) : (
        <ArticleDetailPage {...props} />
      )}
    </div>
  );
};

export default ArticleListCards;
