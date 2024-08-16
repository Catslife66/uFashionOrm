"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Modal } from "flowbite-react";
import AddToCartForm from "./AddToCartForm";
import AddToLikeButton from "./AddToLikeButton";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-56 w-full">
        <Link href={`/products/${product.slug}`}>
          {product.ProductImages[0] ? (
            <img
              src={product.ProductImages[0].image_url}
              className="mx-auto h-full dark:hidden"
              alt={product.ProductImages[0].name}
            />
          ) : (
            <img
              className="mx-auto h-full dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
              alt="placeholder"
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            {product.is_onsales ? (
              <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                SALE
              </span>
            ) : (
              <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                NEW
              </span>
            )}
          </div>

          <div className="flex items-center justify-end gap-1">
            {/* add to favourite button */}
            <button
              type="button"
              data-tooltip-target="tooltip-add-to-favorites"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only"> Add to Favorites </span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>
            </button>
            <div
              id="tooltip-add-to-favorites"
              role="tooltip"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              data-popper-placement="top"
            >
              Add to favorites
              <div className="tooltip-arrow" data-popper-arrow=""></div>
            </div>
          </div>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="h-12 text-lg font-semibold leading-tight text-gray-900 dark:text-white"
        >
          {product.name}
        </Link>

        {/* reviews */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {/* review stars */}
            <svg
              className="h-4 w-4 text-yellow-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>
          </div>
          {/* review points */}
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            5.0
          </p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            (455)
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="">
            {product.is_onsales && (
              <div className="text-sm font-extrabold leading-tight text-gray-400 line-through dark:text-white">
                £ {product.origin_price}
              </div>
            )}
            <div className="text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
              £ {product.price}
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center submit-btn"
            onClick={handleClick}
          >
            <svg
              className="-ms-2 me-2 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Add to cart
          </button>

          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <Modal.Header>{product.name}</Modal.Header>
            <Modal.Body>
              <div className="space-y-8">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                  alt=""
                  width={200}
                />
                <div>
                  <AddToCartForm productId={product.id} />
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
