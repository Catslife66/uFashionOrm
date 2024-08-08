import React, { useState } from "react";
import Link from "next/link";
import SingoutButton from "./SignoutButton";

const UserDropdownMenu = () => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsHidden(false)}
        onMouseLeave={() => setIsHidden(true)}
        className="flex flex-row py-2 px-3 text-gray-700 hover:text-blue-700 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent"
        type="button"
      >
        <svg
          className="w-6 h-6 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <span className="ms-1">My Account</span>
      </button>

      <div
        onMouseEnter={() => setIsHidden(false)}
        onMouseLeave={() => setIsHidden(true)}
        className={`${
          isHidden ? "hidden" : ""
        } absolute z-10 bg-white divide-y divide-gray-100 w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 mt-4 shadow rounded-lg text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <Link
              href="/orders"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              My Orders
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </Link>
          </li>
          <li>
            <SingoutButton role={"user"} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdownMenu;
