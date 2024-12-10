import React from "react";
import NotFound from "../../components/common/NotFound";
import RetailHeader from "@/components/RetailShop/Header";
import CustomerSay from "@/components/RetailShop/Home/CustomerSay";
import RetailFooter from "@/components/RetailShop/Footer";
import WelcomeBanner from "@/components/RetailShop/Home/WelcomeBanner";
import ListingBanner from "@/components/RetailShop/Products/ListingBanner";
import ProductListing from "@/components/RetailShop/Products/ProductListing";
import ViewCart from "@/components/RetailShop/Cart";
import ThankYouPage from "@/components/RetailShop/OrderPlaced";
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

const DynamicComp = ({ pageData, params }) => {
  const getUniq = {};

  return (
    <div>
      {pageData?.sections?.map((section, idx) => {
        if (!getUniq[section.type]) {
          getUniq[section.type] = true;
          const Component = componentMap[section.type];
          if (!Component)
            return (
              <div key={idx} className="text-red-500 text-center">
                Component is missing
              </div>
            );
          return (
            <Component
              key={idx}
              {...section}
              parentTitle={pageData.title}
              params={params}
            />
          );
        }
      })}
      {pageData.error && <NotFound />}
    </div>
  );
};

export default DynamicComp;
