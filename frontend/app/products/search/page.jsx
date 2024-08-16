import Breadcrumbs from "app/components/Breadcrumbs";
import ProductCard from "app/components/ProductCard";
import React, { Fragment, Suspense } from "react";

async function fetchProducts(query) {
  const res = await fetch(
    `http://localhost:4000/api/products/search?query=${query}`,
    {
      method: "GET",
      next: {
        revalidate: 360,
      },
    }
  );
  if (!res.ok) {
    console.log("failed to fetch search products");
  }
  return res.json();
}

const ProductSearchPage = async ({ params, searchParams }) => {
  const data = await fetchProducts(searchParams.query);

  const categoryName = () => {
    if (searchParams.query === "sale") {
      return "All sale";
    } else if (searchParams.query === "new") {
      return "New arrivals";
    } else {
      if (data.length > 0 && data[0].Category) {
        return data[0].Category.name;
      } else {
        return "All Products";
      }
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <Breadcrumbs categoryName={categoryName()} />
        <div className="mx-auto max-w-screen-xl px-8 2xl:px-0">
          {data.length === 0 && (
            <h3 className="flex justify-center items-center text-lg">
              No products are found.
            </h3>
          )}
          <div className="mb-4 px-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {data.length > 0 &&
              data.map((product) => (
                <Fragment key={product.id}>
                  <ProductCard product={product} />
                </Fragment>
              ))}
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default ProductSearchPage;
