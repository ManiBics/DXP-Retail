import Table from "@/components/common/Table";
import { Button } from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import useCMSOrder from "@/customHooks/useCMSOrder";
import { getLocale, translatePrice } from "@/utils";

const OrderDetails = (props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const { orderContentful } = useCMSOrder(orderId);

  const total = orderContentful?.lineItems?.reduce(
    (sum, item) => sum + +item.price,
    0
  );
  const params = useParams();
  const { locale = "en-US" } = getLocale(params.slug);
  return (
    <div className="bg-white p-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">{props.title}</h1>
        <div>
          <Button
            onClick={() => {
              router.push(props.backButton.url);
            }}
            size="small"
            variant="outlined"
          >
            {props.backButton.label}
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg">
          {props.orderIdField}{" "}
          <span className={`font-semibold`}>{orderContentful.id || ""}</span>
        </h2>
        <p className="text-gray-700">
          {props.date}{" "}
          <span className={`font-semibold`}>
            {orderContentful.createdAt
              ? new Date(orderContentful.createdAt).toDateString()
              : ""}
          </span>
        </p>
        <p className="text-gray-700">
          {props.status}{" "}
          <span className={`font-semibold text-green-600`}>
            {orderContentful.orderState || ""}
          </span>
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{props.itemText}</h3>
        <Table rows={orderContentful.lineItems} columns={props.itemColumn} />
      </div>
      <div className="mt-4 flex justify-end">
        <div className="text-lg font-semibold">{props.totalvaluetext}</div>
        <div className="text-lg font-semibold ml-4">
          {translatePrice(total.toFixed(2), locale)}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
