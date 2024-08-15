"use client";

import { Spinner } from "flowbite-react";
import paymentService from "lib/utils/paymentService";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CheckoutSuccessPage = ({ searchParams }) => {
  const session_id = searchParams.session_id;
  const [order, setOrder] = useState({
    id: "",
    createdAt: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    full_name: "",
    address_line1: "",
    address_line2: "",
    county: "",
    town_city: "",
    postcode: "",
    contact_number: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function handleCheckoutSuccess() {
      try {
        const data = await paymentService.paymentSuccess(session_id);
        setOrder(() => ({
          ...order,
          id: data.id,
          createdAt: data.createdAt,
        }));
        setShippingAddress(() => ({
          full_name: data.ShippingAddress?.full_name || "",
          address_line1: data.ShippingAddress?.address_line1 || "",
          address_line2: data.ShippingAddress?.address_line2 || "",
          county: data.ShippingAddress?.county || "",
          town_city: data.ShippingAddress?.town_city || "",
          postcode: data.ShippingAddress?.postcode || "",
          contact_number: data.ShippingAddress?.contact_number || "",
        }));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (session_id) {
      handleCheckoutSuccess();
    }
  }, [session_id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!order) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
          Order not found
        </h2>
        <Link
          href="/"
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Return to shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-2xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
          Thanks for your order!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
          Your order #{order.id} will be processed within 24 hours during
          working days. We will notify you by email once your order has been
          shipped.
        </p>
        <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Date
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {order.createdAt.split("T")[0]}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Payment Method
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              Online Card Payment
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Name
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {shippingAddress.full_name}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Address
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              <span>{shippingAddress.address_line1}, </span>
              {shippingAddress.address_line2 && (
                <span>{shippingAddress.address_line2}, </span>
              )}
              {shippingAddress.county && (
                <span>{shippingAddress.county}, </span>
              )}
              <span>{shippingAddress.town_city}, </span>
              <span>{shippingAddress.postcode}</span>
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Phone
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {shippingAddress.contact_number}
            </dd>
          </dl>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href={`/orders/${order.id}`}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            View your order
          </Link>
          <Link
            href="/"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Return to shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSuccessPage;
