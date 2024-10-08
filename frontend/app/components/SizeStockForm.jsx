"use client";

import { useEffect, useState } from "react";
import cookie from "js-cookie";
import productSizeService from "lib/utils/productSizeService";

const SizeStockForm = ({ prodId, size, isReadOnly = false }) => {
  const token = cookie.get("token");
  const [stock, setStock] = useState(0);
  const [sizeItemId, setSizeItemId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token && prodId && size) {
      fetchProductSize();
    }

    async function fetchProductSize() {
      try {
        const sizeStock = await productSizeService.getProductSizeBySize(
          prodId,
          size
        );
        if (sizeStock) {
          setSizeItemId(sizeStock.id);
          setStock(sizeStock.stock);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [prodId, size]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { product_id: id, size: size, stock: stock };
      const response = sizeItemId
        ? await productSizeService.updateProductSize(sizeItemId, data, token)
        : await productSizeService.createProductSize(data, token);
      setIsSaved(true);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err);
      } else if (err.response.data.errors) {
        setError(err.response.data.errors[0].msg);
      } else {
        setError("Failed to post data.");
      }
    }
  };

  return (
    <form className="grid grid-cols-3">
      <label
        htmlFor={size}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {size}
      </label>

      {error && !isReadOnly && (
        <p className="text-xs text-orange-600">{error}</p>
      )}
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="number"
        name={size}
        value={stock}
        readOnly={isReadOnly}
        onChange={(e) => {
          setStock(e.target.value);
          setError("");
        }}
      />

      {!isReadOnly && (
        <button
          onClick={handleSubmit}
          type="button"
          disabled={isSaved}
          className="p-2.5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      )}
    </form>
  );
};

export default SizeStockForm;
