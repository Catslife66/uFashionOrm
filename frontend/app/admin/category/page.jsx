"use client";

import cookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import categoryService from "app/utils/categoryService";

const CategoryManager = () => {
  const token = cookie.get("token");
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
    fetchCategory();
    async function fetchCategory() {
      try {
        const categoryList = await categoryService.getCategoryList(token);
        setCategories(categoryList);
      } catch (err) {
        console.log(err);
      }
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await categoryService.deleteCategory(id, token);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 dark:border-gray-700">
            <div className="flex-1 flex items-center space-x-2">
              <h5>
                <span className="text-gray-500">All Products:</span>
                <span className="dark:text-white">123456</span>
              </h5>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Link
                href="/admin/category/create"
                id="createProductButton"
                data-modal-toggle="createProductModal"
                className="flex items-center justify-center text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-1.5 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add product
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    ID
                  </th>
                  <th scope="col" className="p-4">
                    Category
                  </th>
                  <th scope="col" className="p-4">
                    Created at
                  </th>
                  <th scope="col" className="p-4">
                    Updated at
                  </th>
                  <th scope="col" className="p-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="flex items-center mr-3">
                        {category.id}
                      </div>
                    </th>
                    <td className="px-4 py-3">
                      <div className="flex items-center mr-3">
                        {category.name}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center mr-3">
                        {category.created_at}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center mr-3">
                        {category.updated_at}
                      </div>
                    </td>

                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center space-x-4">
                        <Link
                          href={`/admin/category/edit/${category.id}`}
                          data-drawer-target="drawer-update-product"
                          data-drawer-show="drawer-update-product"
                          aria-controls="drawer-update-product"
                          className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(category.id)}
                          data-modal-target="delete-modal"
                          data-modal-toggle="delete-modal"
                          className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryManager;
