"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrderPlaced = (props) => {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const { cart, createOrder } = useCart();

  useEffect(() => {
    if (cart?.lineItems?.length) {
      createOrder(setOrderId);
    }
  }, [cart]);

  return (
    <div
      data-sb-object-id={props.id}
      className="flex flex-col items-center justify-center bg-white text-gray-800 my-10"
    >
      <div className="text-center">
        <img
          src={props.image.src}
          alt={props.image.alt}
          data-sb-object-id={props?.image?.id}
          className="w-26 h-24 mx-auto mb-6"
        />
        <h1
          data-sb-field-path="title"
          className="text-5xl font-bold text-[#1976d2] mb-4"
        >
          {props.title}
        </h1>
        <p data-sb-field-path="description" className="text-lg">
          {props.description}
        </p>
        <p data-sb-field-path="orderIdText" className="text-lg mb-8">
          {orderId ? `${props.orderIdText}: ${orderId}` : ""}
        </p>
        <button
          className="bg-[#1976d2] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mb-6"
          onClick={() => {
            if (props.button.url) router.push(props.button.url);
          }}
          data-sb-field-path={`${props.button?.id}:label`}
        >
          {props.button.label}
        </button>
        <p data-sb-field-path="hometitle" className="text-sm text-gray-600">
          {props.hometitle}{" "}
          <Link
            href={`mailto:${props.email}`}
            className="text-[#1976d2] underline"
            data-sb-field-path="email"
          >
            {props.email}
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default OrderPlaced;
