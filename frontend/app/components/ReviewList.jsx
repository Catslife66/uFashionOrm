"use client";

import { Spinner } from "flowbite-react";
import productService from "lib/utils/productService";
import reviewService from "lib/utils/reviewService";
import React, { useEffect, useState } from "react";
import ReviewRatingStars from "./ReviewRatingStars";

const ReviewList = ({ productId }) => {
  const [product, setProduct] = useState({
    five_star_count: 0,
    four_star_count: 0,
    three_star_count: 0,
    two_star_count: 0,
    one_star_count: 0,
    average_rating: 0,
    rating_count: 0,
  });
  const [fiveStarBarWidth, setFiveStarBarWidth] = useState(0);
  const [fourStarBarWidth, setFourStarBarWidth] = useState(0);
  const [threeStarBarWidth, setThreeStarBarWidth] = useState(0);
  const [twoStarBarWidth, setTwoStarBarWidth] = useState(0);
  const [oneStarBarWidth, setOneStarBarWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const LIMIT = 2;

  useEffect(() => {
    async function fetchProductData() {
      try {
        const productData = await productService.getProductById(productId);
        setProduct(() => ({
          five_star_count: productData.five_star_count,
          four_star_count: productData.four_star_count,
          three_star_count: productData.three_star_count,
          two_star_count: productData.two_star_count,
          one_star_count: productData.one_star_count,
          average_rating: productData.average_rating,
          rating_count: productData.ating_count,
        }));
        setFiveStarBarWidth(
          (product.five_star_count / product.rating_count) * 100
        );
        setFourStarBarWidth(
          (product.four_star_count / product.rating_count) * 100
        );
        setThreeStarBarWidth(
          (product.three_star_count / product.rating_count) * 100
        );
        setTwoStarBarWidth(
          (product.two_star_count / product.rating_count) * 100
        );
        setOneStarBarWidth(
          (product.one_star_count / product.rating_count) * 100
        );
      } catch (err) {
        console.log(err);
      }
    }

    async function fetchReviewData() {
      try {
        const data = await reviewService.getProductReviews({
          id: productId,
          page: currentPage,
          limit: LIMIT,
        });
        setReviews(() => [...reviews, ...data.reviews]);
        setMaxPage(Math.ceil(data.total / LIMIT));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (productId) {
      fetchProductData();
      fetchReviewData();
    }
  }, [productId, currentPage]);

  const handleReviewsFilter = async (rating) => {
    try {
      const results = await reviewService.filterProductReviews({
        prodId: product.id,
        rating: rating,
      });
      setReviews(results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
    if (currentPage + 1 === maxPage) {
      setCanLoadMore(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {product.rating_count}{" "}
            {product.rating_count === 1 ? "Review" : "Reviews"}
          </h2>
          {/* stars */}
          <div className="mt-2 flex items-center gap-2 sm:mt-0">
            <div className="flex items-center gap-0.5">
              <ReviewRatingStars rating={product.average_rating} />
            </div>

            <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
              {product.average_rating}
            </p>
          </div>
        </div>

        {/* star bars */}
        <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
          <div className="shrink-0 space-y-4">
            <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
              {product.average_rating} out of 5
            </p>
          </div>
          <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
            <div className="flex items-center gap-2">
              <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                5
              </p>
              <svg
                className="h-4 w-4 shrink-0 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-1.5 rounded-full bg-yellow-300"
                  style={{
                    width: `${fiveStarBarWidth}%`,
                  }}
                ></div>
              </div>
              <button
                onClick={() => {
                  handleReviewsFilter(5);
                }}
                className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
              >
                {product.five_star_count}{" "}
                <span className="hidden sm:inline">
                  {" "}
                  {product.five_star_count === 1 ? "review" : "reviews"}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                4
              </p>
              <svg
                className="h-4 w-4 shrink-0 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-1.5 rounded-full bg-yellow-300"
                  style={{
                    width: `${fourStarBarWidth}%`,
                  }}
                ></div>
              </div>
              <button
                onClick={() => {
                  handleReviewsFilter(4);
                }}
                className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
              >
                {product.four_star_count}{" "}
                <span className="hidden sm:inline">
                  {" "}
                  {product.four_star_count === 1 ? "review" : "reviews"}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                3
              </p>
              <svg
                className="h-4 w-4 shrink-0 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-1.5 rounded-full bg-yellow-300"
                  style={{
                    width: `${threeStarBarWidth}%`,
                  }}
                ></div>
              </div>
              <button
                onClick={() => {
                  handleReviewsFilter(3);
                }}
                className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
              >
                {product.three_star_count}{" "}
                <span className="hidden sm:inline">
                  {" "}
                  {product.three_star_count === 1 ? "review" : "reviews"}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                2
              </p>
              <svg
                className="h-4 w-4 shrink-0 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-1.5 rounded-full bg-yellow-300"
                  style={{
                    width: `${twoStarBarWidth}%`,
                  }}
                ></div>
              </div>
              <button
                onClick={() => {
                  handleReviewsFilter(2);
                }}
                className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
              >
                {product.two_star_count}{" "}
                <span className="hidden sm:inline">
                  {" "}
                  {product.two_star_count === 1 ? "review" : "reviews"}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                1
              </p>
              <svg
                className="h-4 w-4 shrink-0 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-1.5 rounded-full bg-yellow-300"
                  style={{
                    width: `${oneStarBarWidth}%`,
                  }}
                ></div>
              </div>
              <button
                onClick={() => {
                  handleReviewsFilter(1);
                }}
                className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
              >
                {product.one_star_count}{" "}
                <span className="hidden sm:inline">
                  {" "}
                  {product.one_star_count === 1 ? "review" : "reviews"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* review list */}
        <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
          {reviews.length === 0 && <p>No matching reviews.</p>}
          {reviews.length > 0 &&
            reviews.map((review) => (
              <div
                key={review.id}
                className="gap-3 py-6 sm:flex sm:items-start"
              >
                {/* left ratings */}
                <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                  {/* ratings */}
                  <div className="flex items-center gap-0.5">
                    <ReviewRatingStars rating={review.rating} />
                  </div>
                  {/* user */}
                  <div className="space-y-0.5">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {review.User?.username.toUpperCase() || "Anonymous"}
                    </p>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {review.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
                {/* right comment */}
                <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                  <h3 className="text-lg font-bald text-gray-500 dark:text-gray-400">
                    {review.subject}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className={`mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 
            ${
              canLoadMore
                ? "hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                : "cursor-not-allowed"
            }`}
          >
            View more reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewList;
