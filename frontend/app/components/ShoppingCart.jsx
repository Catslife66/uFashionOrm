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
  const cartStatus = useAppSelector((state) => state.cart.status);
  const cartItemList = useAppSelector((state) => state.cart.cartItems);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userStatus = useAppSelector((state) => state.user.status);
  const [cartItems, setCartItems] = useState([]);
  const [isBtnHovered, setIsBtnHoverd] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
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
        <Link
          href={`products/${item.ProductSize?.Product?.slug || ""}`}
          className="truncate text-sm py-1 font-semibold leading-none text-gray-900 dark:text-white hover:underline"
        >
          {item.ProductSize?.Product?.name || ""}
        </Link>

        <div className="flex items-center gap-6">
          <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
            £ {item.ProductSize?.Product?.price || ""}
          </p>
          <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            Qty: {item.quantity}
          </p>
          <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            Size: {item.ProductSize?.size || ""}
          </p>
        </div>
      </div>
    ));
  };

  const renderLocalStorageCart = (items) => {
    return items.map((item, index) => (
      <div key={index} className="flex flex-col">
        <Link
          href={`products/${item.slug || ""}`}
          className="truncate text-sm py-1 font-semibold leading-none text-gray-900 dark:text-white hover:underline"
        >
          {item.productName}
        </Link>

        <div className="flex items-center gap-6">
          <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
            £ {item.productPrice}
          </p>
          <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            Qty: {item.quantity}
          </p>

          <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
            Size: {item.size}
          </p>
        </div>
      </div>
    ));
  };

  const handleBtnEnter = () => {
    setIsBtnHoverd(true);
  };

  const handleBtnLeave = () => {
    setTimeout(() => {
      setIsBtnHoverd(false);
    }, 200);
  };

  const handleDropdownEnter = () => {
    setIsDropdownHovered(true);
  };

  const handldDropdownLeave = () => {
    setIsDropdownHovered(false);
  };

  return (
    <div className="relative">
      <button
        onMouseEnter={handleBtnEnter}
        onMouseLeave={handleBtnLeave}
        type="button"
        className="inline-flex items-center rounded-lg justify-center p-2 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
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
        onMouseEnter={handleDropdownEnter}
        onMouseLeave={handldDropdownLeave}
        className={`${
          isDropdownHovered || isBtnHovered ? "" : "hidden"
        } absolute z-10 mx-auto w-72 space-y-4 overflow-hidden mt-4 rounded-lg bg-white p-4 antialiased shadow text-sm text-gray-700 dark:text-gray-200`}
      >
        <ul className="flex flex-col">
          {isAuthenticated
            ? renderAuthenticatedCart(cartItems)
            : renderLocalStorageCart(cartItems)}
        </ul>
        {cartItems && cartItems.length > 0 ? (
          <Link
            href="/cart"
            className="mb-2 me-2 inline-flex w-full items-center justify-center submit-btn"
            role="button"
          >
            {" "}
            View My Cart{" "}
          </Link>
        ) : (
          <p>Your cart is currently empty.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
