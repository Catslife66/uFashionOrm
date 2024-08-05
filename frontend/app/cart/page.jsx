"use client";

import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import Link from "next/link";
import { Spinner } from "flowbite-react";
import CartItemInCart from "app/components/CartItemInCart";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import cartService from "lib/utils/cartService";
import OrderSummary from "app/components/OrderSummary";
import { fetchCartItems } from "lib/features/cart/cartSlice";
import { fetchUserLoginStatus } from "lib/features/user/userSlice";

const CartPage = () => {
  const token = cookie.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const [nonUserCartItems, setNonUserCartItems] = useState([]);
  const userStatus = useAppSelector((state) => state.user.status);
  const cartStatus = useAppSelector((state) => state.cart.status);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      if (userStatus === "idle") {
        dispatch(fetchUserLoginStatus(token));
      } else if (userStatus === "succeeded") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [token, userStatus, dispatch]);

  useEffect(() => {
    function calculateCartTotal(items) {
      const subtotal = items.reduce((accu, item) => {
        const price = isAuthenticated
          ? parseFloat(item.ProductSize.Product.price)
          : parseFloat(item.productPrice);
        return accu + item.quantity * price;
      }, 0);
      setCartSubtotal(subtotal.toFixed(2));
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

  useEffect(() => {
    if (isAuthenticated) {
      setIsEmpty(cartItems.length === 0);
    } else {
      setIsEmpty(nonUserCartItems.length === 0);
    }
  }, [nonUserCartItems, cartItems, isAuthenticated]);

  const renderAuthenticatedCart = () => {
    return cartItems.map((item) => (
      <CartItemInCart
        key={item.id}
        id={item.id || ""}
        name={item.ProductSize.Product.name || ""}
        qty={item.quantity || ""}
        price={item.ProductSize.Product.price || ""}
        stock={item.ProductSize.stock || ""}
        size={item.ProductSize.size || ""}
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

  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-xl items-center px-4">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>
        {!isEmpty ? (
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
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="my-4 py-4 flex justify-center">
              There are currently no items in your basket.
            </p>
            <Link href="/" className="edit-btn">
              Continue shopping
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
