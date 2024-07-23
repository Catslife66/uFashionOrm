"use client";

import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { Spinner } from "flowbite-react";
import CartItemInCart from "app/components/CartItemInCart";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import cartService from "lib/utils/cartService";
import OrderSummary from "app/components/OrderSummary";
import { fetchCartItems } from "lib/features/cart/cartSlice";
import { fetchUserLoginStatus } from "lib/features/user/userSlice";

const CartPage = () => {
  const token = cookie.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [nonUserCartItems, setNonUserCartItems] = useState([]);
  const userStatus = useAppSelector((state) => state.user.status);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const cartStatus = useAppSelector((state) => state.cart.status);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const shippingCost = 5.0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token && userStatus === "idle") {
      dispatch(fetchUserLoginStatus(token));
    }
    if (userStatus === "succeeded") {
      setIsAuthenticated(true);
    }
  }, [token, userStatus, dispatch]);

  useEffect(() => {
    function calculateCartTotal(items) {
      const subtotal = items.reduce(
        (accu, item) =>
          accu +
          item.quantity *
            parseFloat(
              isAuthenticated
                ? item.ProductSize.Product.price
                : item.productPrice
            ),
        0
      );
      setCartSubtotal(subtotal.toFixed(2));
      setShipping(subtotal < 50 ? shippingCost : 0);
      setCartTotal((subtotal + (subtotal < 50 ? shippingCost : 0)).toFixed(2));
    }
    if (isAuthenticated) {
      if (cartStatus === "idle") {
        dispatch(fetchCartItems(token));
      } else if (cartStatus === "succeeded") {
        setIsLoading(false);
        calculateCartTotal(cartItems);
      }
    } else {
      const updateLocalCart = () => {
        const items = cartService.getLocalStorageCart();
        setNonUserCartItems(items);
        calculateCartTotal(items);
      };
      updateLocalCart();
      setIsLoading(false);
      window.addEventListener("storage", updateLocalCart);

      return () => {
        window.removeEventListener("storage", updateLocalCart);
      };
    }
  }, [isAuthenticated, token, cartStatus, cartItems, dispatch]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-xl items-center px-4">
        <Spinner />
      </div>
    );
  }

  const renderAuthenticatedCart = () => {
    return cartItems.map((item) => (
      <CartItemInCart
        key={item.id}
        id={item.id}
        name={item.ProductSize.Product.name}
        qty={item.quantity}
        price={item.ProductSize.Product.price}
        stock={item.ProductSize.stock}
        size={item.ProductSize.size}
        isAuthenticated={isAuthenticated}
      />
    ));
  };

  const renderUnauthenticatedCart = () => {
    return nonUserCartItems.map((item) => (
      <CartItemInCart
        key={`${item.productId}+${item.size}`}
        id={item.productId}
        name={item.productName}
        qty={item.quantity}
        price={item.productPrice}
        stock=""
        size={item.size}
        isAuthenticated={isAuthenticated}
      />
    ));
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {isAuthenticated
                ? renderAuthenticatedCart()
                : renderUnauthenticatedCart()}
            </div>
          </div>

          {/* order summary */}
          <OrderSummary
            isAuthenticated={isAuthenticated}
            cartSubtotal={cartSubtotal}
            shipping={shipping}
            cartTotal={cartTotal}
          />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
