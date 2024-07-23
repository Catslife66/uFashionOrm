import { fetchCartItems } from "lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import cartService from "lib/utils/cartService";
import { useEffect, useState } from "react";
import cookie from "js-cookie";

const CartCountIcon = () => {
  const token = cookie.get("token");
  const [quantity, setQuantity] = useState(0);
  const cartStatus = useAppSelector((state) => state.cart.status);
  const itemQtys = useAppSelector((state) => state.cart.totalQty);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      if (cartStatus === "idle") {
        dispatch(fetchCartItems(token));
      } else if (cartStatus === "succeeded") {
        setQuantity(itemQtys);
      }
    } else {
      function updateQty() {
        let qty = JSON.parse(localStorage.getItem("cartCount")) || 0;
        setQuantity(qty);
      }
      updateQty();
      window.addEventListener("storage", updateQty);
      return () => {
        window.removeEventListener("storage", updateQty);
      };
    }
  }, [user, cartStatus]);

  return (
    <div className="absolute top-0 -right-1 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
      {quantity}
    </div>
  );
};

export default CartCountIcon;
