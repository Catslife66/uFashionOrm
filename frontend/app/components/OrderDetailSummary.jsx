import cartService from "lib/utils/cartService";
import React, { useEffect, useState } from "react";

const OrderDetailSummary = ({ token, cartSubtotal, shipping }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchCartData() {
      const res = await cartService.getMyCart(token);
      setCartItems(res.CartItems);
    }

    if (token) {
      fetchCartData();
    }
  }, [token]);

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <div className="flex flex-row justify-between">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            Order summary
          </p>
          <p>
            {cartItems.length > 1 && `${cartItems.length} items`}
            {cartItems.length === 0 && "0 items"}
            {cartItems.length === 1 && "1 item"}
          </p>
        </div>
        <div className="flex flex-col">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-row py-2 justify-between">
              <img
                src="https://images.unsplash.com/photo-1525115450806-c4b70fd049bd?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                width={100}
              />

              <div className="py-2">
                <a
                  href="#"
                  className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
                >
                  {item.ProductSize?.Product?.name || ""}
                </a>
                <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                  £ {item.ProductSize?.Product?.price || ""}
                </p>

                <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                  Qty: {item.quantity || ""}
                </p>
                <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                  Size: {item.ProductSize?.size || ""}
                </p>
              </div>
            </div>
          ))}
        </div>

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

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">
              Total
            </dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">
              £ {parseFloat(cartSubtotal + shipping).toFixed(2)}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSummary;
