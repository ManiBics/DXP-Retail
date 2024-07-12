import { getOrderDetails } from "@/components/RetailShop/OrderDetails/apiHandler";
import { useBackDrop } from "@/context/BackDropContext";
import { useUser } from "@/context/UserContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { combineCMSData } from "./helper";
import { useCMSProducts } from "@/context/CMSProductContext";

const useCMSOrder = (orderId) => {
  const params = useParams();
  const [orderContentful, setOrderContentful] = useState({ lineItems: [] });
  const { showBackDrop, hideBackDrop } = useBackDrop();
  const { user } = useUser();
  const { CMSproducts } = useCMSProducts();

  useEffect(() => {
    (async () => {
      if (user?.id && CMSproducts?.length) {
        showBackDrop();

        let order = {};
        if (!orderId) {
          const res = await fetch(`/api/getOrders?customerId=${user.id}`);
          const { results } = await res.json();
          const getOrder = results.length ? results[0] : {};
          order = getOrder;
        } else {
          order = await getOrderDetails(orderId);
        }

        const lineItems = combineCMSData(CMSproducts, order);
        setOrderContentful({ ...order, lineItems });

        hideBackDrop();
      }
    })();
  }, [params?.slug, orderId, user?.id, CMSproducts]);

  return { orderContentful };
};

export default useCMSOrder;
