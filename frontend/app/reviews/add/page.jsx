"use client";

import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";
import orderService from "lib/utils/orderService";
import productService from "lib/utils/productService";
import reviewService from "lib/utils/reviewService";
import useAuth from "lib/hooks/useAuth";

const AddReviewPage = ({ params, searchParams }) => {
  const { orderItemId, productId } = searchParams;
  const [productCard, setProductCard] = useState({
    image: null,
    name: "",
    slug: "",
    description: "",
    size: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState("");
  const token = cookie.get("token");
  const router = useRouter();

  const isAuthenticated = useAuth();

  useEffect(() => {
    async function fetchProductData() {
      try {
        const product = await productService.getProductById(productId);
        const size = await orderService.getOrderItem(orderItemId);
        setProductCard(() => ({
          ...productCard,
          image: product.ProductImages[0]?.image_url || null,
          name: product.name,
          slug: product.slug,
          description: product.description,
          size: size.ProductSize.size,
        }));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isAuthenticated && productId) {
      fetchProductData();
    }
  }, [isAuthenticated, productId]);

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const data = {
      product_id: productId,
      order_item_id: orderItemId,
      rating,
      subject,
      comment,
    };
    if (rating == 0) {
      setFormError("Please rate at least 1 star.");
    } else if (!subject || !comment) {
      setFormError("Please fill all the required fields.");
    }
    try {
      await reviewService.createReview(data, token);
      router.push(`/products/${productCard.slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flex flex-row justify-between">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {productCard.image}
              </p>
              <p>{productCard.name}</p>
            </div>
            <div className="flex flex-col">{productCard.description}</div>
            <div className="space-y-4">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    size
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    {productCard.size}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <form className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Write a Review
              </h2>

              {formError && <p className="text-red-800">{formError}</p>}
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Rating *
                </label>
                <div className="flex flex-row space-x-1 mb-5">
                  {Array.from({ length: 5 }, (_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={handleRating}
                          className="hidden"
                        />
                        {/* filled star */}
                        {rating >= ratingValue && (
                          <svg
                            className="w-6 h-6 text-yellow-300 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                          </svg>
                        )}
                        {/* empty star */}
                        {rating < ratingValue && (
                          <svg
                            className="w-6 h-6 text-yellow-300 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                            />
                          </svg>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Review Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="comment"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your comment *
                </label>
                <textarea
                  rows={10}
                  type="text"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                ></textarea>
              </div>
            </div>

            {/* submit order button */}
            <button
              type="submit"
              onClick={handleSubmitReview}
              className="text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Submit My Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddReviewPage;
