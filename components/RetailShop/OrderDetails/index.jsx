"use client";
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

  if (orderContentful?.lineItems) {
    orderContentful?.lineItems.forEach((item) => {
      item.translatedPrice = translatePrice(item.price, locale);
    });
  }

  return (
    <div data-sb-object-id={props.id} className="bg-white p-8">
      <div className="flex justify-between">
        <h1 data-sb-field-path="title" className="text-2xl font-bold mb-4">
          {props.title}
        </h1>
        <div>
          <Button
            onClick={() => {
              router.push(props.backButton.url);
            }}
            size="small"
            variant="outlined"
            data-sb-field-path={`${props.backButton?.id}:label`}
          >
            {props.backButton.label}
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex">
          <h2 data-sb-field-path="orderIdField" className="text-lg">
            {props.orderIdField}
          </h2>
          <div className="font-semibold my-auto ml-2">
            {orderContentful.id || ""}
          </div>
        </div>
        <div className="flex">
          <p data-sb-field-path="date" className="text-gray-700">
            {props.date}
          </p>
          <div className="font-semibold my-auto ml-2">
            {orderContentful.createdAt
              ? new Date(orderContentful.createdAt).toDateString()
              : ""}
          </div>
        </div>
        <div className="flex">
          <p data-sb-field-path="status" className="text-gray-700">
            {props.status}
          </p>
          <div className="font-semibold my-auto ml-2">
            {orderContentful.orderState || ""}
          </div>
        </div>
      </div>
      <div>
        <h3
          data-sb-field-path="itemText"
          className="text-lg font-semibold mb-2"
        >
          {props.itemText}
        </h3>
        <Table rows={orderContentful.lineItems} columns={props.itemColumn} />
      </div>
      <div className="mt-4 flex justify-end">
        <div
          data-sb-field-path="totalvaluetext"
          className="text-lg font-semibold"
        >
          {props.totalvaluetext}
        </div>
        <div className="text-lg font-semibold ml-4">
          {translatePrice(total.toFixed(2), locale)}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
