"use client"; // This is a client component
import React from "react";
import { useSearchParams } from "next/navigation";
import ArticleListing from "../ArticleListing/page";
import ArticleDetailPage from "../ArticleDetail/page";

const ArticleListCards = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  return (
    <div className="min-h-80">
      {!slug ? <ArticleListing /> : <ArticleDetailPage />}
    </div>
  );
};

export default ArticleListCards;
