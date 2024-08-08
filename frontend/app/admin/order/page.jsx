"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import cookie from "js-cookie";
import orderService from "lib/utils/orderService";

const OrderManager = () => {
  const token = cookie.get("token");
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("all");
  const [duration, setDuration] = useState("all");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await orderService.getOrders(status, duration, token);
        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    }
    if (token) {
      fetchOrders();
    }
  }, [token, status, duration]);

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setStatus(value);
    }
    if (name === "duration") {
      setDuration(value);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="mx-auto max-w-5xl p-4">
            <div className="flex-1 flex items-center justify-between space-x-2">
              <h5>
                <span className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  All Order:
                </span>
                <span className="dark:text-white">{orders.length}</span>
              </h5>

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
                  from
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
                {orders.length === 0 && <h2>No orders match the filter.</h2>}
                {orders.length > 0 &&
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-wrap items-center gap-y-4 py-6"
                    >
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Order ID:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          <a href="#" className="hover:underline">
                            #{order.id}
                          </a>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Date:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {order.createdAt.split("T")[0]}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Total Price:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          £ {order.total_amount}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </dt>
                        <dd
                          className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </dd>
                      </dl>

                      <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                        <Link
                          href={`/admin/order/${order.id}`}
                          className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* pagination */}
            <nav
              className="mt-6 flex items-center justify-center sm:mt-8"
              aria-label="Page navigation example"
            >
              <ul className="flex h-8 items-center -space-x-px text-sm">
                <li>
                  <a
                    href="#"
                    className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-4 w-4 rtl:rotate-180"
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
                        d="m15 19-7-7 7-7"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 flex h-8 items-center justify-center border border-blue-300 bg-blue-50 px-3 leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-4 w-4 rtl:rotate-180"
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
                        d="m9 5 7 7-7 7"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderManager;
