"use client";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useParams, useRouter } from "next/navigation";
import CartItem from "./CartItem";
import Checkout from "../Checkout";
import useCMSCart from "@/customHooks/useCMSCart";
import { getLocale, translatePrice } from "@/utils";

export const Cart = ({ items, ...rest }) => {
  const total = items?.reduce((sum, item) => sum + +item.price, 0);
  const totalItems = items?.reduce((sum, item) => sum + item.quantity, 0);

  const { isInCart, updateItemQuantity, removeItem, cancelOrder } = useCart();

  const router = useRouter();

  const hasOutOfStock = items?.some(
    (item) => !item?.variant?.availability?.availableQuantity > 0
  );
  const params = useParams();
  const { locale = "en-US" } = getLocale(params.slug);

  return (
    <div
      data-sb-object-id={rest.id}
      className="container mx-auto p-4 flex flex-col"
    >
      <div className="flex-grow">
        {rest.title && (
          <h1
            data-sb-field-path="title"
            className="text-2xl font-bold mb-4 mt-2"
          >
            {rest.title}
          </h1>
        )}
        {items?.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {items.map((item) => (
              <CartItem
                updateItemQuantity={updateItemQuantity}
                removeItem={removeItem}
                isInCart={isInCart}
                key={item.id}
                item={item}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <p
            data-sb-field-path="emptycartMessage"
            className="text-center text-gray-600"
          >
            {rest.emptycartMessage || "Your Cart is Empty"}
          </p>
        )}
      </div>
      {items?.length > 0 && (
        <div className="mt-4 p-4 bg-white  ">
          <div
            data-sb-object-id={rest.cartSummary?.id}
            className="flex  justify-end"
          >
            <div>
              <h2 data-sb-field-path="title" className="text-xl font-semibold">
                {rest.cartSummary?.title || "Cart Summary"}
              </h2>
              <p data-sb-field-path="totalProducts" className="mt-2">
                {rest.cartSummary?.totalProducts || "Total Products:"}{" "}
                {totalItems}
              </p>
              <p data-sb-field-path="productTotal" className="mt-2">
                {rest.cartSummary?.productTotal || "Total:"}{" "}
                {translatePrice(total.toFixed(2), locale)}
              </p>
            </div>
          </div>
          <Stack
            direction="row"
            className="mt-4"
            justifyContent="flex-end"
            spacing={2}
          >
            <div className="flex items-end">
              {hasOutOfStock && (
                <Typography color="error">
                  One or more items in your cart are currenlty out of stock.
                </Typography>
              )}
            </div>

            <Button
              onClick={cancelOrder}
              variant={rest.cancelOrder?.theme || "outlined"}
              color="error"
              data-sb-field-path={`${rest.cancelOrder?.id}:label`}
            >
              {rest.cancelOrder?.label || "Cancel Order"}
            </Button>
            <Button
              onClick={() => {
                router.push(rest.continueShopping?.url || "/products");
              }}
              variant={rest.continueShopping?.theme || "outlined"}
              color="primary"
              data-sb-field-path={`${rest.continueShopping?.id}:label`}
            >
              {rest.continueShopping?.label || "Continue Shopping"}
            </Button>

            <Checkout
              {...rest.placeOrder}
              items={items}
              hasOutOfStock={hasOutOfStock}
            />
          </Stack>
        </div>
      )}
    </div>
  );
};

const ViewCart = (props) => {
  const { cartContentful } = useCMSCart();

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 400px)" }}>
      <main className="flex-grow flex">
        <Cart items={cartContentful} {...props} />
      </main>
    </div>
  );
};

export default ViewCart;
