import React, { useEffect, useState } from "react";
import { useAppDispatch } from "lib/hooks";
import {
  updateQty,
  removeItem,
  fetchCartItems,
} from "lib/features/cart/cartSlice";
import cartService from "lib/utils/cartService";

const CartItemInCart = ({ item, token }) => {
  const itemId = item.id;
  const itemQty = parseInt(item.quantity);
  const itemPrice = parseFloat(item.ProductSize.Product.price).toFixed(2);
  const itemStock = item.ProductSize.stock;
  const [quantity, setQuantity] = useState(itemQty);
  const [totalAmount, setTotalAmount] = useState(itemQty * itemPrice);
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableReduce, setDisableReduce] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setDisableAdd(quantity >= itemStock);
    setDisableReduce(quantity <= 1);
    setTotalAmount(parseFloat(quantity * itemPrice).toFixed(2));
  }, [quantity, itemStock, itemPrice]);

  const handleAddQty = () => {
    if (quantity < itemStock) {
      let updated = parseInt(quantity + 1);
      setQuantity(updated);
      let data = {
        id: itemId,
        quantity: updated,
      };
      dispatch(updateQty({ data, token }));
    }
  };

  const handleReduceQty = () => {
    if (quantity > 1) {
      let updated = parseInt(quantity - 1);
      setQuantity(updated);
      let data = {
        id: itemId,
        quantity: updated,
      };
      dispatch(updateQty({ data, token }));
    }
  };

  const handleRemove = async () => {
    dispatch(removeItem({ id: itemId, token }))
      .unwrap()
      .then(() => dispatch(fetchCartItems(token)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <img
            className="h-20 w-20 dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
            alt="imac image"
          />
          <img
            className="hidden h-20 w-20 dark:block"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
            alt="imac image"
          />
        </a>

        <label htmlFor="counter-input" className="sr-only">
          Choose quantity:
        </label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleReduceQty}
              disabled={disableReduce}
              className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 ${
                disableReduce
                  ? ""
                  : "hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              } dark:border-gray-600 dark:bg-gray-700`}
            >
              <svg
                className={`h-2.5 w-2.5 text-gray-${
                  disableReduce ? "200" : "900"
                } dark:text-white`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
              value={quantity}
              readOnly
            />
            <button
              type="button"
              onClick={handleAddQty}
              disabled={disableAdd}
              className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 ${
                disableAdd
                  ? ""
                  : "hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              } dark:border-gray-600 dark:bg-gray-700`}
            >
              <svg
                className={`h-2.5 w-2.5 text-gray-${
                  disableAdd ? "200" : "900"
                } dark:text-white`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              £ {totalAmount}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <div>
            <a
              href="#"
              className="text-base font-medium text-gray-900 hover:underline dark:text-white"
            >
              {item.ProductSize.Product.name}
            </a>
            <div className="text-sm text-gray-700">
              Size: {item.ProductSize.size}
            </div>
            <div className="text-sm text-gray-700">
              Price: £ {item.ProductSize.Product.price}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="me-1.5 h-5 w-5"
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
              Add to Favorites
            </button>

            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
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
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemInCart;
