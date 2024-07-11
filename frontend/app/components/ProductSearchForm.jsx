import React, { useState } from "react";
import { useRouter } from "next/navigation";
import productService from "lib/utils/productService";

const ProductSearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchInput = e.target.value;
    setSearchQuery(searchInput);
    if (searchInput.length <= 0) {
      setSearchQuery("");
      setShowDropdown(false);
    } else {
      try {
        const res = await productService.searchProducts(searchQuery);
        setResults(res);
        setShowDropdown(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearchClick = (slug) => {
    setSearchQuery("");
    setShowDropdown(false);
    router.push(`/products/${slug}`);
  };

  return (
    <form className="max-w-md mx-auto w-full">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          name="search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search tops, dresses..."
          value={searchQuery}
          onChange={handleSearch}
        />
        {showDropdown && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg w-full mt-1 z-10">
            {results.length > 0 &&
              results.map((product) => (
                <li
                  key={product.name}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSearchClick(product.slug)}
                >
                  {product.name}
                </li>
              ))}
          </ul>
        )}
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default ProductSearchForm;
