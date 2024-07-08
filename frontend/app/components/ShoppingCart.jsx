import { useState } from "react";

const ShoppingCart = () => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleDropdown = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <button
        onClick={toggleDropdown}
        id="myCartDropdownButton1"
        data-dropdown-toggle="myCartDropdown1"
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

        <div className="absolute top-0 -right-1 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
          0
        </div>
      </button>

      <div
        id="myCartDropdown1"
        className={`${
          isHidden ? "hidden" : "show-cart-dropdown"
        } z-10 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800`}
      >
        <div className="grid grid-cols-2">
          <div>
            <a
              href="#"
              className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
            >
              Apple iPhone 15
            </a>
            <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
              $599
            </p>
          </div>

          <div className="flex items-center justify-end gap-6">
            <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
              Qty: 1
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
                  d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
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
        <a
          href="#"
          className="mb-2 me-2 inline-flex w-full items-center justify-center submit-btn"
          role="button"
        >
          {" "}
          Proceed to Checkout{" "}
        </a>
      </div>
    </>
  );
};

export default ShoppingCart;
