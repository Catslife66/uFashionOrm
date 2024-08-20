"use client";

import cookie from "js-cookie";
import React, { useEffect, useState } from "react";
import userService from "lib/utils/userService";
import useAuth from "lib/hooks/useAuth";
import AddToLikeButton from "app/components/AddToLikeButton";

const WishListPage = () => {
  const token = cookie.get("token");
  const [wishlists, setWishlists] = useState([]);
  const [isLiked, setIsLiked] = useState(true);
  const isAuthenticated = useAuth();

  useEffect(() => {
    async function fetchWishlistData() {
      try {
        const data = await userService.getUserWishList(token);
        setWishlists(data);
      } catch (err) {
        console.log(err);
      }
    }
    if (isAuthenticated) {
      fetchWishlistData();
    }
  }, [isAuthenticated, token]);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product image
            </th>
            <th scope="col" className="px-6 py-3">
              product info
            </th>
            <th scope="col" className="px-6 py-3">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {wishlists.length === 0 && (
            <tr>
              <td colSpan="3">You have no wish list items</td>
            </tr>
          )}
          {wishlists.length > 0 &&
            wishlists.map((wishlist) => (
              <tr
                key={wishlist.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {wishlist.ProductSize?.Product?.name}
                </th>
                <td className="px-6 py-4">{wishlist.ProductSize?.size}</td>
                <td className="px-6 py-4">
                  <AddToLikeButton
                    isAuthenticated={isAuthenticated}
                    prodSizeId={wishlist.product_size_id}
                    isLiked={isLiked}
                    setIsLiked={setIsLiked}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WishListPage;
