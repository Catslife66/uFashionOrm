import { useAppSelector } from "lib/hooks";

const CartCountIcon = () => {
  const quantity = useAppSelector((state) => state.cart.totalQty);

  return (
    <div className="absolute top-0 -right-1 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
      {quantity}
    </div>
  );
};

export default CartCountIcon;
