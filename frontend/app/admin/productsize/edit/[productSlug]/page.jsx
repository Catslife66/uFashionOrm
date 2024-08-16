"use client";

import { useEffect, useState } from "react";
import cookie from "js-cookie";
import Link from "next/link";
import SizeStockForm from "app/components/SizeStockForm";
import productService from "lib/utils/productService";

const EditProductSizePage = ({ params }) => {
  const token = cookie.get("token");
  const productSlug = params.productSlug;
  const [product, setProduct] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    if (token) {
      fetchProduct();
    }

    async function fetchProduct() {
      try {
        const fetchProduct = await productService.getSingleProduct(productSlug);
        setProduct(fetchProduct);
      } catch (err) {
        console.log(err);
      }
    }
  }, [token, productSlug]);

  return (
    <section className="bg-white dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mx-auto container px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="w-full text-left text-gray-500 dark:text-gray-400">
            <div className="p-4 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <div className="grid grid-cols-5 gap-4">
                <div>Product Id</div>
                <div>Product Name</div>
                <div>Size</div>
                <div>Stock</div>
                <div>Action</div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4 p-4 items-center">
              <div className="col-span-1">{product.id}</div>
              <div className="col-span-1">{product.name}</div>
              <div className="col-span-3">
                <SizeStockForm prodId={product.id} size="xs" />
                <SizeStockForm prodId={product.id} size="s" />
                <SizeStockForm prodId={product.id} size="m" />
                <SizeStockForm prodId={product.id} size="l" />
                <SizeStockForm prodId={product.id} size="xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/admin/product"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Back to Product
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EditProductSizePage;
