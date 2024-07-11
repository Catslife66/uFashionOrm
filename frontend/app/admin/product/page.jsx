"use client";

import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import productService from "lib/utils/productService";
import categoryService from "lib/utils/categoryService";
import SizeStockForm from "app/components/SizeStockForm";

const ProductManager = () => {
  const token = cookie.get("token");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
    fetchProducts();

    async function fetchProducts() {
      try {
        const productList = await productService.getProducts();
        setProducts(productList);
        const categoryMap = {};
        for (const product of productList) {
          if (!categoryMap[product.category_id]) {
            const category = await categoryService.getSingleCategory(
              product.category_id,
              token
            );
            categoryMap[product.category_id] = category.name;
          }
        }
        setCategories(categoryMap);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const handleDelete = async (id) => {
    if (token) {
      try {
        await productService.deleteProduct(id, token);
        setProducts(products.filter((product) => product.id !== id));
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No access token.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 dark:border-gray-700">
            <div className="flex-1 flex items-center space-x-2">
              <h5>
                <span className="text-gray-500 mr-2">All Products:</span>
                <span className="dark:text-white">{products.length}</span>
              </h5>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Link
                href="/admin/product/create"
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
            <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <div className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <div className="grid grid-cols-10 grid-flow-col gap-4">
                  <div className="p-4">ID</div>
                  <div className="p-4">Category</div>
                  <div className="p-4">Name</div>
                  <div className="p-4">Description</div>
                  <div className="p-4">Price</div>
                  <div className="p-4">Size</div>
                  <div className="p-4">Stock</div>
                  <div className="p-4">Created at</div>
                  <div className="p-4">Updated at</div>
                  <div className="p-4">Actions</div>
                </div>
              </div>
              <div className="">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-10 grid-flow-col gap-4"
                  >
                    <div className="p-4">{product.id}</div>
                    <div className="p-4">{categories[product.category_id]}</div>
                    <div className="p-4">{product.name}</div>
                    <div className="p-4">{product.description}</div>
                    <div className="p-4">{product.price}</div>
                    <div className="col-span-2">
                      <SizeStockForm
                        id={product.id}
                        size="xs"
                        isReadOnly={true}
                      />
                      <SizeStockForm
                        id={product.id}
                        size="s"
                        isReadOnly={true}
                      />
                      <SizeStockForm
                        id={product.id}
                        size="m"
                        isReadOnly={true}
                      />
                      <SizeStockForm
                        id={product.id}
                        size="l"
                        isReadOnly={true}
                      />
                      <SizeStockForm
                        id={product.id}
                        size="xl"
                        isReadOnly={true}
                      />
                    </div>

                    <div className="p-4">{product.createdAt}</div>
                    <div className="p-4">{product.updatedAt}</div>

                    <div className="p-4">
                      <div className="">
                        <Link
                          href={`product/edit/${product.id}`}
                          className="flex items-center edit-btn-outline"
                        >
                          Edit Detail
                        </Link>
                        <Link
                          href={`productsize/edit/${product.id}`}
                          className="flex items-center edit-btn-outline"
                        >
                          Edit Stock
                        </Link>
                        <Link
                          href={`product/${product.slug}/image`}
                          className="flex items-center edit-btn-outline"
                        >
                          Manage Image
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex items-center delete-btn-outline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductManager;
