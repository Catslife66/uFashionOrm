"use client";

import { useEffect, useState } from "react";
import productService from "app/utils/productService";

const UploadProductImage = ({ product_id }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [product, setProduct] = useState({});

  useEffect(() => {
    // fetchProduct();
    async function fetchProduct() {
      try {
        const productItem = await productService.getSingleProduct(product_id);
        setProduct(productItem);
      } catch (err) {
        setError(err);
      }
    }
  }, [product_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_id", 1);
    formData.append("name", name);
    formData.append("image", file);
    try {
      const res = await fetch("http://localhost:4000/api/productimage/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }
      const data = await res.json();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <form onSubmit={handleSubmit}>
          {error && <p className="text-sm text-orange-600">{error}</p>}

          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Product Id</p>
              <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2">
                {product.id}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Product Name</p>
              <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2">
                {product.name}
              </p>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mr-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-text-field"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block mr-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={(e) => setFile(e.target.files[0])}
                className="input-file-field"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Upload
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadProductImage;
