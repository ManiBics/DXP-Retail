"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useBackDrop } from "./BackDropContext";
import { useParams } from "next/navigation";
import { getLocale } from "@/utils";
import { getDataByContentType } from "@/utils/content";
import { useUser } from "./UserContext";
const Context = createContext();

const CMSProductProvider = ({ children }) => {
  const [CMSproducts, setCMSProducts] = useState([]);
  const { showBackDrop, hideBackDrop } = useBackDrop();
  const { user } = useUser();

  const params = useParams();
  const { locale = "en-US" } = getLocale(params?.slug);

  useEffect(() => {
    (async () => {
      if (user.id) {
        showBackDrop();
        const products = await getDataByContentType("ctproduct", locale);
        setCMSProducts(products);
        hideBackDrop();
      }
    })();
  }, [user?.id, locale]);

  return (
    <Context.Provider value={{ CMSproducts }}>{children}</Context.Provider>
  );
};

export default CMSProductProvider;
export const useCMSProducts = () => useContext(Context);
