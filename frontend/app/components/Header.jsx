"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import ProductSearchForm from "./ProductSearchForm";
import ShoppingCart from "./ShoppingCart";
import { useAppDispatch } from "lib/hooks";
import { fetchCartItems } from "lib/features/cart/cartSlice";
import { fetchUserLoginStatus } from "lib/features/user/userSlice";
import UserDropdownMenu from "./UserDropdownMenu";
import categoryService from "lib/utils/categoryService";

const Header = () => {
  const token = cookie.get("token");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserLoginStatus(token))
        .unwrap()
        .then((data) => {
          setUser(data);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.log(err);
          setIsAuthenticated(false);
          setUser(null);
        });
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(fetchCartItems(token));
    }
  }, [isAuthenticated, token, dispatch]);

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const data = await categoryService.getCategoryList();
        const categoryData = data.filter(
          (cateogry) => cateogry.name !== "operation"
        );
        setCategories(categoryData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategoryData();
  }, []);

  const handleCategoryMouseEnter = () => {
    setIsCategoryHovered(true);
  };

  const handleCategoryMouseLeave = () => {
    setTimeout(() => {
      setIsCategoryHovered(false);
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    setIsDropdownHovered(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownHovered(false);
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex">
            <Link href="/" className="flex items-center mr-4">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                UFashion
              </span>
            </Link>
            <ProductSearchForm />
          </div>

          <div className="flex">
            <div className="flex items-center lg:order-2">
              <div
                className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 mr-4"
                id="mobile-menu-2"
              >
                <ul className="flex flex-col items-center mt-4 font-medium lg:flex-row xl:space-x-8 lg:space-x-4 lg:mt-0">
                  <li>
                    <button
                      className="nav-menu-link"
                      onMouseEnter={handleCategoryMouseEnter}
                      onMouseLeave={handleCategoryMouseLeave}
                    >
                      Category
                    </button>
                  </li>
                  <li>
                    <a href="#" className="nav-menu-link">
                      New Arrivals
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-menu-link">
                      Sale
                    </a>
                  </li>
                  <li>
                    {user ? (
                      <div className="nav-menu-link">
                        <UserDropdownMenu />
                      </div>
                    ) : (
                      <Link href="/login" className="nav-menu-link">
                        Log in
                      </Link>
                    )}
                  </li>
                  <li>
                    <ShoppingCart />
                  </li>
                </ul>
              </div>

              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* mega menu dropdown */}
        <div
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
          className={`${
            isCategoryHovered || isDropdownHovered ? "" : "hidden"
          } flex justify-center items-center absolute w-full left-0 mt-4 py-4 bg-white border-gray-200 z-10 w-full border-y dark:bg-gray-800 dark:border-gray-600`}
        >
          <div className="max-w-screen-xl w-full px-4 py-5 mx-auto text-gray-900 dark:text-white md:px-6">
            <ul
              aria-labelledby="mega-menu-full-dropdown-button"
              className="grid grid-cols-4 gap-4"
            >
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products/search?query=${category.name}`}
                    className="inline-flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
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
                        d="M16.153 19 21 12l-4.847-7H3l4.848 7L3 19h13.153Z"
                      />
                    </svg>
                    <div className="font-semibold text-sm ms-2">
                      {category.name.toUpperCase()}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
