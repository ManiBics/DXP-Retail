"use client";

import React from "react";
import UserProvider from "@/context/UserContext";
import CMSProductProvider from "@/context/CMSProductContext";
import SnackbarProvider from "@/context/SnackbarContext";
import CartProvider from "@/context/CartContext";
import BackdropProvider from "@/context/BackDropContext";

const ContextProviders = ({ children }) => {
  return (
    <BackdropProvider>
      <SnackbarProvider>
        <UserProvider>
          <CartProvider>
            <CMSProductProvider>{children}</CMSProductProvider>
          </CartProvider>
        </UserProvider>
      </SnackbarProvider>
    </BackdropProvider>
  );
};

export default ContextProviders;
