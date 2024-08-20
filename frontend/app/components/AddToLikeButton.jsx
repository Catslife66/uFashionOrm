"use client";

import React, { useState } from "react";
import cookie from "js-cookie";
import userService from "lib/utils/userService";
import { Modal } from "flowbite-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const AddToLikeButton = ({
  isAuthenticated,
  prodSizeId,
  isLiked,
  setIsLiked,
}) => {
  const token = cookie.get("token");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [showModal, setShowModal] = useState(false);

  const toggleLike = async () => {
    if (isAuthenticated) {
      if (isLiked) {
        setIsLiked(false);
        await userService.deleteUserWishList(prodSizeId, token);
      } else {
        setIsLiked(true);
        const data = {
          product_size_id: prodSizeId,
        };
        await userService.createUserWishList(data, token);
      }
    } else {
      setShowModal(true);
    }
  };

  const handleLeadToLogin = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("redirect", pathName);
    router.push(`/login?${params.toString()}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleLike}
        className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {isLiked ? (
          <svg
            className="w-5 h-5 text-red-600 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-gray-500"
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
              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
            />
          </svg>
        )}
      </button>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Login</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Login is required to add to wishlist.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              setShowModal(false);
              handleLeadToLogin();
            }}
            className="submit-btn"
          >
            Login
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-300 hover:border-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToLikeButton;
