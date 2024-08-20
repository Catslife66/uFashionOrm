"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import cookie from "js-cookie";
import orderService from "lib/utils/orderService";
import { Spinner } from "flowbite-react";

const OrderDetailPage = ({ params, searchParams }) => {
  const id = params.id;
  const token = cookie.get("token");
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderData() {
      try {
        const res = await orderService.getSingleOrder(id, token);
        setOrder(res);
        setStatus(res.status);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    if (token) {
      fetchOrderData();
    }
  }, [token, id]);

  const handleUpdateStatus = async (e) => {
    setStatus(e.target.value);
    try {
      const data = { status: e.target.value };
      const res = await orderService.updateOrderStauts(id, data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Order summary
          </h2>
          <div className="mt-6 sm:mt-8">
            <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
              <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {order.OrderItems.length > 0 &&
                    order.OrderItems.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 md:w-[384px]">
                          <div className="flex items-center gap-4">
                            <a
                              href="#"
                              className="flex items-center aspect-square w-10 h-10 shrink-0"
                            >
                              <img
                                className="h-auto w-full max-h-full dark:hidden"
                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                alt="imac image"
                              />
                              <img
                                className="hidden h-auto w-full max-h-full dark:block"
                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                alt="imac image"
                              />
                            </a>
                            <Link
                              href={`/products/${item.ProductSize.Product.slug}`}
                              className="hover:underline"
                            >
                              {item.id}
                            </Link>
                          </div>
                        </td>

                        <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                          x {item.quantity}
                        </td>

                        <td className="p-4 text-right text-base text-gray-900 dark:text-white">
                          £ {item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500 dark:text-gray-400">
                      Subtotal price
                    </dt>
                    <dd className="px-4 text-right text-base font-bold text-gray-900 dark:text-white">
                      £ {order.sub_total}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500 dark:text-gray-400">
                      Shipping
                    </dt>
                    <dd className="px-4 text-right text-base font-bold text-gray-900 dark:text-white">
                      £ {order.shipping}
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-lg font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-lg font-bold p-4 text-right text-gray-900 dark:text-white">
                    £ {order.total_amount}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <label className="text-lg font-bold text-gray-900 dark:text-white">
                    Order Status:
                  </label>
                  <select
                    onChange={handleUpdateStatus}
                    value={status}
                    className="text-lg font-bold p-4 text-right text-gray-900 dark:text-white"
                  >
                    <option value="confirmed">confirmed</option>
                    <option value="dispatched">dispatched</option>
                    <option value="cancelled">cancelled</option>
                    <option value="pending">pending</option>
                  </select>
                </dl>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-lg font-bold text-gray-900 dark:text-white">
                    Shipping Address:
                  </dt>
                  <dd className="text-lg font-bold p-4 text-right text-gray-900 dark:text-white">
                    {order.ShippingAddress.full_name}
                  </dd>
                </dl>
              </div>

              <div className="flex items-center justify-center">
                <Link
                  href="/admin/order"
                  className="rounded-lg justify-center items-center border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  Return to Order List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailPage;
