import React from "react";
import { useEffect, useState } from "react";
import { getPageFromSlug } from "../../utils/content";
import NotFound from "../../components/common/NotFound";
import { getLocale } from "../../utils";
import RetailHeader from "@/components/RetailShop/Header";
import CustomerSay from "@/components/RetailShop/Home/CustomerSay";
import RetailFooter from "@/components/RetailShop/Footer";
import WelcomeBanner from "@/components/RetailShop/Home/WelcomeBanner";
import FeaturedProducts from "@/components/RetailShop/Home/FeaturedProducts";
import ListingBanner from "@/components/RetailShop/Products/ListingBanner";
import ProductListing from "@/components/RetailShop/Products/ProductListing";
import ViewCart from "@/components/RetailShop/Cart";
import ThankYouPage from "@/components/RetailShop/OrderPlaced";
import { useParams } from "next/navigation";
import { useBackDrop } from "@/context/BackDropContext";
import OrdersPage from "../RetailShop/OrdersPage";
import OrderDetails from "../RetailShop/OrderDetails";
import Login from "../RetailShop/Login";
import TabContent from "../RetailShop/Home/TabContent";
import Register from "../RetailShop/Register";
import VideoListCards from "../RetailShop/Video/page";
import ArticleListCards from "../RetailShop/Article/page";

const componentMap = {
  headerSection: RetailHeader,
  stats: TabContent,
  bulletPoint: CustomerSay,
  footerSection: RetailFooter,
  brandSection: WelcomeBanner,
  listingBanner: ListingBanner,
  productListing: ProductListing,
  viewCart: ViewCart,
  home: ThankYouPage,
  ordersContent: OrdersPage,
  orderDetailsContent: OrderDetails,
  dynamicImageAndCard: Login,
  registrationPage: Register,
  videopage: VideoListCards,
  article: ArticleListCards,
};

const DynamicComp = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const { showBackDrop, hideBackDrop } = useBackDrop();

  useEffect(() => {
    (async () => {
      showBackDrop();
      const { locale = "en-US" } = getLocale(params?.slug);
      const slug =
        "/" +
        (params?.slug ?? [""])
          .filter((slug) => !slug.includes(locale))
          .join("/")
          .replace("index", "");
      const page = await getPageFromSlug(slug, locale);
      setData(page);
      hideBackDrop();
    })();
  }, [params?.slug]);
  const getUniq = {};

  return (
    <div>
      {data?.sections?.map((section, idx) => {
        if (!getUniq[section.type]) {
          getUniq[section.type] = true;
          const Component = componentMap[section.type];
          if (!Component)
            return (
              <div key={idx} className="text-red-500 text-center">
                Component is missing
              </div>
            );
          return <Component key={idx} {...section} />;
        }
      })}
      {data.error && <NotFound />}
    </div>
  );
};

export default DynamicComp;
