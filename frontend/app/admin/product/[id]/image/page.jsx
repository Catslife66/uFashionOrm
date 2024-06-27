"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import cookie from "js-cookie";
import productImageService from "app/utils/productImageService";

const productImagePage = ({ params }) => {
  const token = cookie.get("token");
  const productId = params.id;
  const [images, setImages] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchImages() {
      try {
        const imageList = await productImageService.getProductImagesByProduct(
          productId
        );
        setImages(imageList);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, [productId, isAdding]);

  const handleDelete = async (imageId) => {
    if (token) {
      try {
        await productImageService.deleteProductImage(imageId, token);
        setImages(images.filter((img) => img.id !== imageId));
      } catch (err) {
        console.log(err);
      }
    } else {
      setError("Invalid token. Please login as admin.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 dark:border-gray-700">
            <div className="flex-1 flex items-center space-x-2">
              <h5 className="mr-4">
                <span className="text-gray-500 mr-2">Prodcut Id:</span>
                <span className="dark:text-white">{productId}</span>
              </h5>
              <h5>
                <span className="text-gray-500 mr-2">All Images:</span>
                <span className="dark:text-white">{images.length}</span>
              </h5>
            </div>

            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Link
                onClick={() => setIsAdding(true)}
                href={"image/upload"}
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
                Add image
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="w-full text-left text-gray-500 dark:text-gray-400">
              <div className="grid grid-cols-3 gap-4">
                <div className="px-4">Name</div>
                <div className="px-4">Image</div>
                <div className="px-4">Actions</div>
              </div>
              <div className="p-4">
                {images.length === 0 && <p>Please add images to the product</p>}
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="grid grid-cols-3 gap-4 border border-b-gray-300"
                  >
                    <div>{image.name}</div>
                    <img
                      src={`http://localhost:4000${image.image_url}`}
                      alt={image.name}
                      width={150}
                    />
                    <div>
                      <Link
                        className="edit-btn-outline mr-4"
                        href={`image/${image.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="delete-btn-outline"
                        onClick={() => handleDelete(image.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {error && (
                  <div className="error-msg" role="alert">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default productImagePage;
