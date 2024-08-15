import React from "react";
import ProductCard from "app/components/ProductCard";

async function fetchProducts() {
  const res = await fetch("http://localhost:4000/api/products", {
    next: {
      revalidate: 3600,
    },
  });
  if (!res.ok) {
    console.log("failed to response");
  }
  return res.json();
}

const ProductsPage = async () => {
  const products = await fetchProducts();

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
