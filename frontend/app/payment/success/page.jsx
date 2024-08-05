import Link from "next/link";

async function fetchCheckedoutOrder(session_id) {
  const res = await fetch(
    `http://localhost:4000/api/payment/success?session_id=${session_id}`
  );
  if (!res.ok) {
    console.log("failed to response");
  }
  return res.json();
}

const CheckoutSuccessPage = async ({ params, searchParams }) => {
  const order = await fetchCheckedoutOrder(searchParams.session_id);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-2xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
          Thanks for your order!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
          Your order{" "}
          <Link
            href={`/orders/${order.id}`}
            className="font-medium text-gray-900 dark:text-white hover:underline"
          >
            #{order.id}
          </Link>{" "}
          will be processed within 24 hours during working days. We will notify
          you by email once your order has been shipped.
        </p>
        <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Date
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {order.createdAt.split("T")[0]}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Payment Method
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              Online Card Payment
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Name
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {order.ShippingAddress.full_name}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Address
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              <span>{order.ShippingAddress.address_line1}, </span>
              {order.ShippingAddress.address_line2 && (
                <span>{order.ShippingAddress.address_line2}, </span>
              )}
              {order.ShippingAddress.county && (
                <span>{order.ShippingAddress.county}, </span>
              )}
              <span>{order.ShippingAddress.town_city}, </span>
              <span>{order.ShippingAddress.postcode}</span>
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Phone
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {order.ShippingAddress.contact_number}
            </dd>
          </dl>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Track your order
          </a>
          <a
            href="#"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Return to shopping
          </a>
        </div>
      </div>
    </section>

    // <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    //   <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    //     <div className="mx-auto max-w-3xl">
    //       <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
    //         Order summary
    //       </h2>
    //       <div className="mt-6 sm:mt-8">
    //         <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
    //           <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
    //             <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
    //               {data.OrderItems.map((item) => (
    //                 <tr key={item.id}>
    //                   <td className="whitespace-nowrap py-4 md:w-[384px]">
    //                     <div className="flex items-center gap-4">
    //                       <a
    //                         href="#"
    //                         className="flex items-center aspect-square w-10 h-10 shrink-0"
    //                       >
    //                         <img
    //                           className="h-auto w-full max-h-full dark:hidden"
    //                           src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
    //                           alt="imac image"
    //                         />
    //                         <img
    //                           className="hidden h-auto w-full max-h-full dark:block"
    //                           src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
    //                           alt="imac image"
    //                         />
    //                       </a>
    //                       <Link
    //                         href={`/products/${item.ProductSize.Product.slug}`}
    //                         className="hover:underline"
    //                       >
    //                         {item.ProductSize.Product.name}
    //                       </Link>
    //                     </div>
    //                   </td>

    //                   <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
    //                     x {item.quantity}
    //                   </td>

    //                   <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
    //                     £ {item.price * item.quantity}
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //         <div className="mt-4 space-y-6">
    //           <div className="space-y-4">
    //             <div className="space-y-2">
    //               <dl className="flex items-center justify-between gap-4">
    //                 <dt className="text-gray-500 dark:text-gray-400">
    //                   Subtotal price
    //                 </dt>
    //                 <dd className="text-base font-medium text-gray-900 dark:text-white">
    //                   £ {data.sub_total}
    //                 </dd>
    //               </dl>

    //               <dl className="flex items-center justify-between gap-4">
    //                 <dt className="text-gray-500 dark:text-gray-400">
    //                   Shipping
    //                 </dt>
    //                 <dd className="text-base font-medium text-gray-900 dark:text-white">
    //                   £ {data.shipping}
    //                 </dd>
    //               </dl>
    //             </div>

    //             <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
    //               <dt className="text-lg font-bold text-gray-900 dark:text-white">
    //                 Total
    //               </dt>
    //               <dd className="text-lg font-bold text-gray-900 dark:text-white">
    //                 £ {data.total_amount}
    //               </dd>
    //             </dl>
    //           </div>

    //           <div className="gap-4 sm:flex sm:items-center">
    //             <Link
    //               href="/"
    //               className="w-full rounded-lg justify-center items-center border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
    //             >
    //               Return to Shopping
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default CheckoutSuccessPage;
