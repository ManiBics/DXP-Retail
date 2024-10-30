import React, { createContext, useContext, useEffect, useState } from "react";
import { useBackDrop } from "./BackDropContext";
import { useParams } from "next/navigation";
import { getLocale } from "@/utils";
import { getPageFromSlug } from "@/utils/content";
import { useUser } from "./UserContext";
const Context = createContext();

const CMSProductProvider = ({ children }) => {
  const [CMSproducts, setCMSProducts] = useState([]);
  const { showBackDrop, hideBackDrop } = useBackDrop();
  const { user } = useUser();

  const params = useParams();

  useEffect(() => {
    (async () => {
      if (user.id) {
        showBackDrop();
        const { locale = "en-US" } = getLocale(params?.slug);
        const slug = "/product-listing";
        const page = await getPageFromSlug(slug, locale, "productListing");
        setCMSProducts(page.products);
        hideBackDrop();
      }
    })();
  }, [user.id]);

  return (
    <Context.Provider value={{ CMSproducts }}>{children}</Context.Provider>
  );
};

export default CMSProductProvider;
export const useCMSProducts = () => useContext(Context);
