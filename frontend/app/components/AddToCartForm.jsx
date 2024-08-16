import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import productSizeService from "lib/utils/productSizeService";
import cartService from "lib/utils/cartService";
import { useAppDispatch } from "lib/hooks";
import {
  createOrUpdateCart,
  fetchCartItems,
} from "lib/features/cart/cartSlice";
import userService from "lib/utils/userService";
import AddToLikeButton from "./AddToLikeButton";

const AddToCartForm = ({ productId }) => {
  const dispatch = useAppDispatch();
  const token = cookie.get("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [disabledReduce, setDisabledReduce] = useState(false);
  const [disabledAdd, setDisabledAdd] = useState(false);
  const [canAddCart, setCanAddCart] = useState(true);
  const [stock, setStock] = useState(10);
  const [errMsg, setErrMsg] = useState("");
  const sizeOrder = ["XS", "S", "M", "L", "XL"];
  const [sizeStocks, setSizeStocks] = useState([
    { id: "", size: "XS", stock: 0 },
    { id: "", size: "S", stock: 0 },
    { id: "", size: "M", stock: 0 },
    { id: "", size: "L", stock: 0 },
    { id: "", size: "XL", stock: 0 },
  ]);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [prodSizeId, setProdSizeId] = useState("");

  useEffect(() => {
    async function fetchProductSizeStock() {
      const data = await productSizeService.getProductSizes(productId);
      const fetchedData = data.map((item) => ({
        id: item.id,
        size: item.size,
        stock: item.stock,
      }));
      setSizeStocks(fetchedData);
    }
    async function fetchUserLoginStatus() {
      try {
        const res = await userService.checkLoginStatus(token);
        if (res) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    async function fetchLikeData() {
      const data = await productSizeService.getProductSize({
        prodId: productId,
        size: selectedSize,
      });
      setProdSizeId(data.prodSizeId);
    }

    if (productId) {
      fetchProductSizeStock();
      fetchLikeData();
    }
    if (token) {
      fetchUserLoginStatus();
    }
  }, [productId, token]);

  useEffect(() => {
    setDisabledReduce(Number(qty) <= 1);
    setDisabledAdd(Number(qty) >= stock);
  }, [qty, stock]);

  useEffect(() => {
    async function checkIsLiked() {
      try {
        const data = await userService.checkProductIsLiked(prodSizeId, token);
        setIsLiked(data.isLiked);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    if (isAuthenticated && prodSizeId !== "" && token) {
      checkIsLiked();
    }
  }, [isAuthenticated, prodSizeId, token]);

  const handleSelectSize = (id, size, stock) => {
    setSelectedSize(size);
    setProdSizeId(id);
    setStock(stock);
    setErrMsg("");
    setQty(1);
    if (stock === 0) {
      setIsOutOfStock(true);
    } else if (stock > 0) {
      setIsOutOfStock(false);
    }
  };

  const handleChangeQty = (e) => {
    let value = Number(e.target.value);
    if (value > 0 && value <= stock) {
      setQty(value);
      setErrMsg("");
      setCanAddCart(true);
    } else if (value <= 0) {
      setErrMsg("Quantity must be greater or equal to 1.");
      setCanAddCart(false);
    } else if (value > stock) {
      setErrMsg("Exceed the stock.");
      setCanAddCart(false);
    }
  };

  const handleReduceQty = () => {
    let itemQty = Number(qty);
    if (itemQty > 1) {
      setQty(itemQty - 1);
    }
  };

  const handleAddQty = () => {
    let itemQty = Number(qty);
    if (itemQty < stock) {
      setQty(itemQty + 1);
    }
  };

  const handleAddtoCart = async () => {
    let cartData = {
      productId: productId,
      size: selectedSize,
      quantity: qty,
    };

    if (isAuthenticated) {
      try {
        dispatch(createOrUpdateCart({ data: cartData, token }))
          .unwrap()
          .then(() => dispatch(fetchCartItems(token)))
          .catch((err) => console.log(err));
      } catch (error) {
        console.log("Error adding to cart:", error.message);
      }
    } else {
      const data = await productSizeService.getProductSizeBySize(
        cartData.productId,
        cartData.size
      );
      cartData = {
        productId: productId,
        size: selectedSize,
        quantity: qty,
        productName: data.Product.name,
        productPrice: data.Product.price,
        slug: data.Product.slug,
      };
      cartService.addToLocalStorageCart(cartData);
      let items = cartService.getLocalStorageCart();
      let count = items.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem("cartCount", count);
      window.dispatchEvent(new Event("storage"));
    }
  };

  const sortedSizeStocks = sizeStocks.sort(
    (a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
  );

  return (
    <>
      <AddToLikeButton
        isAuthenticated={isAuthenticated}
        prodSizeId={prodSizeId}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />
      {/* size buttons */}
      <div className="flex flex-row my-4">
        {sortedSizeStocks.map((item) => (
          <button
            key={item.size}
            className={`mr-2 
              ${
                item.stock === 0
                  ? "zero-stock"
                  : selectedSize === item.size
                  ? "selected-size-btn"
                  : "size-btn"
              }
            `}
            onClick={() => handleSelectSize(item.id, item.size, item.stock)}
          >
            {item.size}
          </button>
        ))}
      </div>
      {errMsg && <p className="text-orange-600">{errMsg}</p>}
      <div className="relative items-center flex flex-row justify-between my-4">
        {/* quantity input */}
        <div className="flex flex-row">
          <button
            disabled={disabledReduce}
            onClick={handleReduceQty}
            type="button"
            className={`bg-gray-100 dark:bg-gray-700 dark:border-gray-600  border border-gray-300 rounded-s-lg p-3 h-11 ${
              !disabledReduce
                ? "dark:hover:bg-gray-600 hover:bg-gray-200 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                : ""
            }`}
          >
            <svg
              className={`w-3 h-3 dark:text-white ${
                Number(qty) <= 1 ? "text-gray-200" : "text-gray-900"
              }`}
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
            value={qty}
            max={stock}
            onChange={handleChangeQty}
            className="bg-gray-50 border border-x-0 border-y-1 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <button
            onClick={handleAddQty}
            disabled={disabledAdd}
            type="button"
            className={`bg-gray-100 dark:bg-gray-700 dark:border-gray-600 border border-gray-300 rounded-e-lg p-3 h-11 
              ${
                !disabledAdd
                  ? "hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  : ""
              }`}
          >
            <svg
              className={`w-3 h-3 dark:text-white ${
                Number(qty) >= Number(stock) ? "text-gray-200" : "text-gray-900"
              }`}
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

        {/* Add cart button */}
        <div className="w-1/2">
          {isOutOfStock ? (
            <button
              type="button"
              disabled={isOutOfStock}
              className="w-full flex items-center justify-center out-of-stock-btn"
            >
              <svg
                className="w-5 h-5 -ms-2 me-2"
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
              OUT OF STOCK
            </button>
          ) : (
            <button
              onClick={handleAddtoCart}
              disabled={!canAddCart}
              className={`w-full flex items-center justify-center ${
                canAddCart ? "submit-btn" : "disable-submit-btn"
              }`}
            >
              <svg
                className="w-5 h-5 -ms-2 me-2"
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
          )}
        </div>
      </div>
    </>
  );
};

export default AddToCartForm;
