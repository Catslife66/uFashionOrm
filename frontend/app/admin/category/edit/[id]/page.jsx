"use client";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import categoryService from "app/utils/categoryService";
import { useRouter } from "next/navigation";

const UpdateCategoryPage = ({ params }) => {
  const token = cookie.get("token");
  const id = params.id;
  const [category, setCategory] = useState({ id: "", name: "" });
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      fetchCategory();
    }
    async function fetchCategory() {
      try {
        const category = await categoryService.getSingleCategory(id, token);
        setCategory(category);
        setName(category.name);
      } catch (err) {
        console.log(err);
      }
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        const response = await categoryService.updateCategory(
          id,
          { name },
          token
        );
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
          Edit Category
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  ID
                </th>
                <th scope="col" className="p-4">
                  Category Name
                </th>
                <th scope="col" className="p-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="dark:border-gray-600">
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex items-center mr-3">{category.id}</div>
                </th>
                <td className="px-4 py-3">
                  <div className="flex items-center mr-3">
                    <input
                      onChange={(e) => {
                        setName(e.target.value);
                        setError("");
                      }}
                      value={name}
                      type="text"
                      name="name"
                      className="px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                      required
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={handleSubmit}
                    className="self-center px-5 py-2.5 sm:text-sm font-medium text-center text-white bg-sky-700 rounded-lg focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-900 hover:bg-sky-800"
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {error && <p className="text-red-700 mb-2">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default UpdateCategoryPage;
