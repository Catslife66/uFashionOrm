import React, { useEffect, useState } from "react";
import Link from "next/link";
import cookie from "js-cookie";
import CartCountIcon from "./CartCountIcon";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import cartService from "lib/utils/cartService";
import { fetchUserLoginStatus } from "lib/features/user/userSlice";
import { fetchCartItems } from "lib/features/cart/cartSlice";

const ShoppingCart = () => {
  const token = cookie.get("token");
  const [isHidden, setIsHidden] = useState(true);
  const cartStatus = useAppSelector((state) => state.cart.status);
  const cartItemList = useAppSelector((state) => state.cart.cartItems);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userStatus = useAppSelector((state) => state.user.status);
  const [cartItems, setCartItems] = useState([]);
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
    if (isAuthenticated) {
      if (cartStatus === "idle") {
        dispatch(fetchCartItems(token));
      } else if (cartStatus === "succeeded") {
        setCartItems(cartItemList);
      }
    } else {
      const updataCartContent = () => {
        const cartItemListLocalStorage = cartService.getLocalStorageCart();
        setCartItems(cartItemListLocalStorage);
      };

      updataCartContent();

      window.addEventListener("storage", updataCartContent);

      return () => {
        window.removeEventListener("storage", updataCartContent);
      };
    }
  }, [isAuthenticated, cartStatus, dispatch]);

  const renderAuthenticatedCart = (items) => {
    return items.map((item) => (
      <div key={item.id} className="flex flex-col">
        <div className="flex flex-row my-2">
          <a
            href="#"
            className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
          >
            {item.ProductSize?.Product?.name || ""}
          </a>
          <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
            £ {item.ProductSize?.Product?.price || ""}
          </p>
        </div>
        <div className="flex items-center justify-end gap-6">
          <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            Qty: {item.quantity}
          </p>
          <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            Size: {item.ProductSize?.size || ""}
          </p>
          <button
            data-tooltip-target="tooltipRemoveItem1a"
            type="button"
            className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
          >
            <span className="sr-only"> Remove </span>
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L12 10.6 9.7 8.3Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            id="tooltipRemoveItem1a"
            role="tooltip"
            className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
          >
            Remove item
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>
    ));
  };

  const renderLocalStorageCart = (items) => {
    return items.map((item, index) => (
      <div key={index} className="grid grid-cols-3 gap-2 py-2">
        <div className="flex flex-col">
          <a
            href="#"
            className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
          >
            {item.productName}
          </a>

          <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
            £ {item.productPrice}
          </p>
        </div>
        <div className="flex items-end justify-center gap-6 py-1">
          <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            Qty: {item.quantity}
          </p>
        </div>
        <div className="flex items-end justify-center gap-6 py-1">
          <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            Size: {item.size}
          </p>
        </div>
      </div>
    ));
  };

  const clickToToggle = () => {
    setIsHidden(!isHidden);
  };

  const hideDropDown = () => {
    setIsHidden(true);
  };

  return (
    <>
      <button
        onClick={clickToToggle}
        type="button"
        className="relative inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
      >
        <span className="hidden sm:flex mr-1">My Cart</span>
        <span className="sr-only">Cart</span>
        <svg
          className="w-6 h-6 lg:me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
          />
        </svg>

        <CartCountIcon />
      </button>

      <div
        onMouseLeave={hideDropDown}
        className={`${
          isHidden ? "hidden" : "show-cart-dropdown"
        } z-10 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800`}
      >
        <div className="flex flex-col">
          {isAuthenticated
            ? renderAuthenticatedCart(cartItems)
            : renderLocalStorageCart(cartItems)}
        </div>
        <Link
          href="/cart"
          className="mb-2 me-2 inline-flex w-full items-center justify-center submit-btn"
          role="button"
        >
          {" "}
          View My Cart{" "}
        </Link>
      </div>
    </>
  );
};

export default ShoppingCart;
