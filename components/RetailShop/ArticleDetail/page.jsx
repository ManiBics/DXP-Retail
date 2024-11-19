"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { getDataByContentType } from "@/utils/content";
import styles from "./articledetailpage.module.scss";
import { AddBox } from "@mui/icons-material";
import { getLocale } from "@/utils";
import { useBackDrop } from "@/context/BackDropContext";

function ArticleDetailPage() {
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
        const pageContent = await getDataByContentType("article", locale, slug);
        setProductDetail(pageContent?.[0] ?? []);
      } catch (error) {
      } finally {
        hideBackDrop();
      }
    };

    fetchProductDetails();
  }, [params?.slug]);

  if (!productDetail) {
    return <p className="lg:w-4/5 mx-auto pt-20 flex flex-wrap">Loading...</p>;
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full relative flex">
            <div className="flex flex-col space-y-2"></div>
            {productDetail?.image?.[0]?.src && (
              <div className="zoomable-image w-full flex justify-center">
                <img
                  alt="Product"
                  className="object-cover object-center border w-auto rounded-lg shadow-2xl max-h-[250px]"
                  src={productDetail?.image[0]?.src}
                />
              </div>
            )}
          </div>

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 mb-0 self-center">
            <div className="mb-4">
              <h1 className="title-font font-medium text-[34px] text-gray-900 mb-2">
                {productDetail?.title}
              </h1>
            </div>
          </div>
          <div className="lg:w-full w-full lg:pl-10 lg:py-6 mt-12 lg:mt-12 mb-0">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {productDetail?.shortDescription && (
                <div className="bg-slate-200 rounded-xl shadow-md p-8 mt-8 h-fit">
                  <div className="font-bold text-[28px] mb-4">
                    {productDetail.descTitledetail}
                  </div>
                  <Typography>{productDetail?.shortDescription}</Typography>
                </div>
              )}
              {productDetail?.accordion && (
                <div className="p-8 bg-slate-200 rounded-xl shadow-md mt-8">
                  <div className="font-bold text-[28px] my-4">
                    {productDetail.infoHeaderText}
                  </div>
                  {productDetail?.accordion?.map((accordionItem) => (
                    <Accordion
                      className={styles.accordionbox}
                      key={accordionItem.id}
                    >
                      <AccordionSummary
                        className=""
                        expandIcon={<AddBox />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="font-bold text-md my-2 text-indigo-900">
                          {accordionItem.accordion_title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="text-sm">
                          {accordionItem.accordion_description.content.map(
                            (contentItem, index) => {
                              if (contentItem.nodeType === "unordered-list") {
                                return (
                                  <ul
                                    className="space-y-1 text-gray-500 text-sm list-inside"
                                    key={index}
                                  >
                                    {contentItem.content.map(
                                      (listItem, idx) => (
                                        <li className="flex mb-6" key={idx}>
                                          <svg
                                            className="w-3.5 h-3.5 me-4 mt-1 text-green-500 dark:text-green-400 flex-shrink-0"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                          </svg>
                                          {
                                            listItem.content[0]?.content[0]
                                              ?.value
                                          }
                                        </li>
                                      )
                                    )}
                                  </ul>
                                );
                              }
                              return contentItem.content[0]?.value;
                            }
                          )}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArticleDetailPage;
