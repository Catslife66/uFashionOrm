"use client";

import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import AddToCartForm from "app/components/AddToCartForm";
import { useAppSelector, useAppDispatch } from "lib/hooks";
import { fetchProduct } from "lib/features/product/productSlice";
import ProductDetailTab from "app/components/ProductDetailTab";
import ReviewRatingStars from "app/components/ReviewRatingStars";
import ImageGallery from "app/components/ImageGallery";

const ProductDetailPage = ({ params }) => {
  const slug = params.slug;
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);
  const loadStatus = useAppSelector((state) => state.product.status);
  const error = useAppSelector((state) => state.product.error);
  const [activeTab, setActiveTab] = useState("Material");

  useEffect(() => {
    if (slug && loadStatus === "idle") {
      dispatch(fetchProduct(slug));
    }
  }, [slug, loadStatus, dispatch]);

  if (loadStatus === "loading") {
    return (
      <div className="max-w-screen-xl items-center px-4 mx-auto 2xl:px-0">
        <Spinner />
      </div>
    );
  }

  const handleJumpToReviewSection = () => {
    setActiveTab("Reviews");
    const section = document.getElementById("target-section");
    section.scrollIntoView({ behavior: "smooth" });
  };

  if (loadStatus === "failed") {
    return <div>Data is not found. Error: {error}</div>;
  }

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 space-y-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 mb-4">
          <ImageGallery productSlug={slug} />

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {product.name}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                £ {product.price}
              </p>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  <ReviewRatingStars rating={product.average_rating} />
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  ({product.average_rating})
                </p>
                <button
                  type="button"
                  onClick={handleJumpToReviewSection}
                  className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                >
                  {product.rating_count} Reviews
                </button>
              </div>
            </div>

            <AddToCartForm productId={product.id} />

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {product.description}
            </p>
          </div>
        </div>

        <div id="target-section">
          <ProductDetailTab
            product={product}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
