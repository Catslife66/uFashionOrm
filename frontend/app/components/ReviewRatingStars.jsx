"use client";
import { Spinner } from "flowbite-react";
import AddToCartForm from "./AddToCartForm";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { fetchProduct } from "lib/features/product/productSlice";
import ProductDetailTab from "./ProductDetailTab";

const ReviewRatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);

  const star = (state) => {
    switch (state) {
      case "full":
        return (
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
        );

      case "half":
        return (
          <svg
            className="w-6 h-6 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <defs>
              <clipPath id="half-star">
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            <path
              d="M12 17.728l-3.898 2.351c-.76.458-1.703-.218-1.497-1.073l1.06-4.388a.982.982 0 0 0-.322-.98l-3.47-2.934c-.676-.572-.316-1.667.572-1.737l4.553-.36a1 1 0 0 0 .845-.606l1.754-4.165c.342-.812 1.508-.812 1.85 0l1.754 4.165a1 1 0 0 0 .845.606l4.553.36c.888.07 1.248 1.165.572 1.737l-3.47 2.934a.98.98 0 0 0-.322.98l1.06 4.388c.206.855-.736 1.531-1.497 1.073L12 17.728Z"
              fill="currentColor"
              clipPath="url(#half-star)"
            />
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M12 4.392v14.832M8.476 9.38l-4.553.36c-.888.07-1.248 1.165-.572 1.737l3.47 2.934a.98.98 0 0 1 .322.98l-1.06 4.388c-.206.855.736 1.531 1.497 1.073l3.898-2.351c.32-.193.723-.193 1.044 0l3.898 2.351c.76.458 1.703-.218 1.497-1.073l-1.06-4.388a.982.982 0 0 1 .322-.98l3.47-2.934c.676-.572.316-1.667-.572-1.737l-4.553-.36a1 1 0 0 1-.845-.606l-1.754-4.165c-.342-.812-1.508-.812-1.85 0L9.321 8.774a1 1 0 0 1-.845.606Z"
            />
          </svg>
        );

      case "empty":
        return (
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
        );
    }
  };

  return (
    <>
      {Array.from({ length: fullStars }).map((_, index) => (
        <span key={index}>{star("full")}</span>
      ))}
      {halfStars &&
        Array.from({ length: halfStars }).map((_, index) => (
          <span key={index}>{star("half")}</span>
        ))}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <span key={index}>{star("empty")}</span>
      ))}
    </>
  );
};

export default ReviewRatingStars;
