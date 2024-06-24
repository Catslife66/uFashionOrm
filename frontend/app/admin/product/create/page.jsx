"use client";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import productService from "app/utils/productService";
import { useRouter } from "next/navigation";
import categoryService from "app/utils/categoryService";

const CreateProductPage = () => {
  const token = cookie.get("token");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
    fetchCategories();
    async function fetchCategories() {
      const categories = await categoryService.getCategoryList(token);
      setCategories(categories);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        const data = { name, description, price, category_id: categoryId };
        const response = await productService.createProduct(data, token);
        console.log(response);
        router.push("/admin/product");
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else if (err.response.data.errors) {
          setError(err.response.data.errors[0].msg);
        } else {
          setError("Failed to create a category");
        }
      }
    } else {
      setError("You are NOT authorised.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new product
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
                required=""
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
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
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
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
              <select
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setError("");
                }}
              >
                <option defaultValue="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError("");
                }}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-sky-700 rounded-lg focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-900 hover:bg-sky-800"
          >
            Add product
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProductPage;
