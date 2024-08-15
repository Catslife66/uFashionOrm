"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import cookie from "js-cookie";
import { useAppSelector, useAppDispatch } from "lib/hooks";
import { useRouter } from "next/navigation";
import orderService from "lib/utils/orderService";
import { fetchUserLoginStatus } from "lib/features/user/userSlice";
import { Spinner } from "flowbite-react";

const OrderDetailPage = ({ params, searchParams }) => {
  const orderId = params.id;
  const token = cookie.get("token");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userStatus = useAppSelector((state) => state.user.status);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      if (userStatus === "idle") {
        dispatch(fetchUserLoginStatus(token));
      } else if (userStatus === "succeeded") {
        setIsAuthenticated(true);
      } else if (userStatus === "failed") {
        setIsAuthenticated(false);
        router.push("/login");
        localStorage.setItem("redirectPath", `/orders/${orderId}`);
      }
    } else {
      router.push("/login");
      localStorage.setItem("redirectPath", `/orders/${orderId}`);
    }
  }, [token, userStatus, dispatch, router]);

  useEffect(() => {
    async function fetchOrderData() {
      try {
        const data = await orderService.getSingleOrder(orderId, token);
        setOrder(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    if (isAuthenticated) {
      fetchOrderData();
    }
  }, [isAuthenticated, token]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto px-4 max-w-screen-xl">
          <div className="flex flex-row justify-between px-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Order summary
            </h2>
            <div
              className={`items-center rounded px-4 py-2 font-bold ${order.status}`}
            >
              {order.status}
            </div>
          </div>
          <div className="mt-4 space-y-6 px-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Receiver</dt>
                <dd className="px-4 text-right text-base font-bold text-gray-900 dark:text-white">
                  {order.ShippingAddress.full_name}
                </dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Address</dt>
                <dd className="px-4 text-right text-base font-bold text-gray-900 dark:text-white">
                  <span>{order.ShippingAddress.address_line1}, </span>
                  {order.ShippingAddress.address_line2 && (
                    <span>{order.ShippingAddress.address_line2}, </span>
                  )}
                  {order.ShippingAddress.county && (
                    <span>{order.ShippingAddress.county}, </span>
                  )}
                  <span>{order.ShippingAddress.town_city}, </span>
                  <span>{order.ShippingAddress.postcode}</span>
                </dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">
                  Contact Number
                </dt>
                <dd className="px-4 text-right text-base font-bold text-gray-900 dark:text-white">
                  {order.ShippingAddress.contact_number}
                </dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">
                  Subtotal price
                </dt>
                <dd className="px-4 text-right text-base font-bold text-gray-900 dark:text-white">
                  £ {order.sub_total}
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Shipping</dt>
                <dd className="px-4 text-right text-base font-bold text-gray-900 dark:text-white">
                  £ {order.shipping}
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-gray-500 dark:text-white">Total</dt>
                <dd className="px-4 text-right text-base font-bold text-gray-900 dark:text-white">
                  £ {order.total_amount}
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-6 sm:mt-8">
            <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
              <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {order.OrderItems.length > 0 &&
                    order.OrderItems.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center aspect-square w-10 h-10 shrink-0">
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
                            </div>
                            <Link
                              href={`/products/${item.ProductSize.Product.slug}`}
                              className="hover:underline"
                            >
                              {item.ProductSize.Product.name}
                            </Link>
                          </div>
                        </th>
                        <td className="text-sm px-6 py-4">
                          {item.ProductSize.size}
                        </td>
                        <td className="px-6 py-4">x {item.quantity}</td>

                        <td className="px-6 py-4">
                          £ {item.price * item.quantity}
                        </td>
                        <td className="px-6 py-4">
                          {item.Review ? (
                            <Link
                              href={`/reviews/${item.Review.id}`}
                              className="w-full inline-flex justify-center focus:outline-none text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              View my review
                            </Link>
                          ) : (
                            <Link
                              href={`/reviews/add?orderItemId=${item.id}&productId=${item.ProductSize.Product.id}`}
                              className="w-full inline-flex justify-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              Write a review
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailPage;
