import { useAppSelector } from "lib/hooks";

const CartCountIcon = () => {
  const itemQtys = useAppSelector((state) => state.cart.totalQty);

  return (
    <div className="absolute top-0 -right-1 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
      {itemQtys ? itemQtys : 0}
    </div>
  );
};

export default CartCountIcon;
