"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import cartService from "lib/utils/cartService";
import paymentService from "lib/utils/paymentService";
import { useEffect, useState } from "react";

const OrderSummary = ({ isAuthenticated, cartSubtotal }) => {
  const router = useRouter();
  const token = cookie.get("token");
  const SHIPPING_COST = parseFloat(5).toFixed(2);
  const SHIPPING_THRESHOLD = 50.0;
  const [shipping, setShipping] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (parseFloat(cartSubtotal) >= SHIPPING_THRESHOLD) {
      setShipping(0);
    } else {
      setShipping(SHIPPING_COST);
    }
    const total = parseFloat(cartSubtotal) + parseFloat(shipping);
    setCartTotal(total.toFixed(2));
  }, [cartSubtotal, shipping]);

  const handleClickCheckout = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/cart`);
    } else {
      try {
        const cartData = await cartService.getMyCart(token);
        const data = {
          userId: cartData.user_id,
          cartItems: cartData.CartItems,
          cartSubtotal: cartSubtotal,
          shipping: shipping,
        };
        const response = await paymentService.createPaymentSession(data);
        router.push(response.url);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          Order summary
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Subtotal
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                £ {cartSubtotal}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Shipping
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                {shipping === 0 ? "FREE" : `£ ${shipping}`}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">
              Total
            </dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">
              £ {cartTotal}
            </dd>
          </dl>
        </div>

        <button
          onClick={handleClickCheckout}
          type="button"
          className="flex w-full items-center justify-center submit-btn"
        >
          Proceed to Checkout
        </button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {" "}
            or{" "}
          </span>
          <Link
            href="/"
            title=""
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
          >
            Continue Shopping
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
