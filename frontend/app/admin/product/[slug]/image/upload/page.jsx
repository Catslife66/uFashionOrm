"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import productService from "lib/utils/productService";
import productImageService from "lib/utils/productImageService";

const imageUploadPage = ({ params }) => {
  const token = cookie.get("token");
  const product_slug = params.slug;
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [product, setProduct] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetchProduct();
    async function fetchProduct() {
      try {
        const productItem = await productService.getSingleProduct(product_slug);
        setProduct(productItem);
      } catch (err) {
        console.log(err);
        // setError(err);
      }
    }
  }, [product_slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_id", product.id);
    formData.append("name", name);
    formData.append("image", file);
    if (token) {
      try {
        await productImageService.createProductImage(formData, token);
        setMsg("Added successfully.");
        setIsSuccess(true);
      } catch (err) {
        setError(err);
      }
    } else {
      setError("Invalid token. Please login.");
    }
  };

  if (isSuccess) {
    setTimeout(() => {
      router.push(`/admin/product/${product_slug}/image`);
    }, 2000);
  }

  return (
    <section className="bg-white dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <form onSubmit={handleSubmit}>
          {/* {error && (
            <div className="error-msg" role="alert">
              {error}
            </div>
          )} */}
          {msg && (
            <div className="success-msg" role="alert">
              {msg}
            </div>
          )}
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

export default imageUploadPage;
