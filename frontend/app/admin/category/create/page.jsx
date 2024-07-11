"use client";
import { useState } from "react";
import cookie from "js-cookie";
import categoryService from "lib/utils/categoryService";
import { useRouter } from "next/navigation";

const CreateCategoryPage = () => {
  const token = cookie.get("token");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        const response = await categoryService.createCategory({ name }, token);
        console.log(response);
        router.push("/admin/category");
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
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          Add a new category
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-700 mb-2">{error}</p>}

          <div className="grid grid-cols-4 gap-4">
            <label
              htmlFor="name"
              className="self-center text-sm font-medium text-gray-900 dark:text-white"
            >
              Category Name
            </label>
            <input
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              type="text"
              name="name"
              className="col-span-2 px-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
              required
            />
            <button
              type="submit"
              className="self-center  px-5 py-2.5 sm:text-sm font-medium text-center text-white bg-sky-700 rounded-lg focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-900 hover:bg-sky-800"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateCategoryPage;
