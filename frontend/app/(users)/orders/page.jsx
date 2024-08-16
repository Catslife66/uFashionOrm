"use client";

import { useAppDispatch, useAppSelector } from "lib/hooks";
import React, { Fragment, useEffect, useState } from "react";
import cookie from "js-cookie";
import orderService from "lib/utils/orderService";
import OrderOverviewDetail from "app/components/OrderOverviewDetail";
import { useRouter } from "next/navigation";
import { fetchUserLoginStatus } from "lib/features/user/userSlice";
import { Spinner } from "flowbite-react";
import PagePagination from "app/components/PagePagination";

const OrderPage = () => {
  const token = cookie.get("token");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userStatus = useAppSelector((state) => state.user.status);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("all");
  const [duration, setDuration] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const LIMIT_PER_PAGE = 10;

  useEffect(() => {
    if (token) {
      if (userStatus === "idle") {
        dispatch(fetchUserLoginStatus(token));
      } else if (userStatus === "succeeded") {
        setIsAuthenticated(true);
      } else if (userStatus === "failed") {
        setIsAuthenticated(false);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [token, userStatus, dispatch, router]);

  useEffect(() => {
    async function fetchOrderData() {
      try {
        const data = await orderService.getOrders({
          page: currentPage,
          limit: LIMIT_PER_PAGE,
          status,
          duration,
          token,
        });
        setOrders(data.orders);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        setOrders([]);
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (isAuthenticated) {
      fetchOrderData();
    }
  }, [isAuthenticated, currentPage, token, status, duration]);

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setStatus(value);
    }
    if (name === "duration") {
      setDuration(value);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>

            {/* order filters */}
            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <div>
                <label
                  htmlFor="status"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select order status
                </label>
                <select
                  name="status"
                  value={status}
                  onChange={handleFilterChange}
                  className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="all">All orders</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <span className="inline-block text-gray-500 dark:text-gray-400">
                {" "}
                from{" "}
              </span>
              <div>
                <label
                  htmlFor="duration"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select duration
                </label>
                <select
                  name="duration"
                  value={duration}
                  onChange={handleFilterChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="this week">this week</option>
                  <option value="this month">this month</option>
                  <option value="last 3 months">last 3 months</option>
                  <option value="lats 6 months">last 6 months</option>
                </select>
              </div>
            </div>
          </div>

          {/* order list */}
          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.length === 0 && (
                <h2>No orders match the searching criteria.</h2>
              )}
              {orders.length > 0 &&
                orders.map((order) => (
                  <Fragment key={order.id}>
                    <OrderOverviewDetail order={order} />
                  </Fragment>
                ))}
            </div>
          </div>

          {/* pagination */}
          <PagePagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
