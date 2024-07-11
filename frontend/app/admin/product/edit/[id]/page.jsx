"use client";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import productService from "lib/utils/productService";
import categoryService from "lib/utils/categoryService";
import { useRouter } from "next/navigation";

const UpdateProductPage = ({ params }) => {
  const token = cookie.get("token");
  const id = params.id;
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      fetchProduct();
    }

    async function fetchProduct() {
      try {
        const product = await productService.getSingleProduct(id, token);
        setProduct(product);
        fetchCategory(product.category_id);
      } catch (err) {
        console.log(err);
      }
    }

    async function fetchCategory(categoryId) {
      try {
        const category = await categoryService.getSingleCategory(
          categoryId,
          token
        );
        setCategoryName(category.name);
      } catch (err) {
        console.log(err);
      }
    }
  }, [token, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("You are NOT authorised.");
      return;
    }

    try {
      const updatedProduct = {
        name: product.name,
        price: product.price,
        description: product.description,
        category_id: product.category_id,
      };
      await productService.updateProduct(id, updatedProduct, token);
      router.push("/admin/product");
    } catch (err) {
      console.log(err);
      setError(
        err.response ? err.response.data.error : "Failed to update product"
      );
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update Product
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-orange-600">{error}</p>}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                required
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                name="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                required
                value={product.price}
                onChange={(e) => {
                  setProduct({ ...product, [e.target.name]: e.target.value });
                  setError("");
                }}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <input
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                value={categoryName}
                readOnly
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                name="description"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                required
                value={product.description}
                onChange={(e) => {
                  setProduct({ ...product, [e.target.name]: e.target.value });
                  setError("");
                }}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-sky-700 rounded-lg focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-900 hover:bg-sky-800"
          >
            Update product
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProductPage;
