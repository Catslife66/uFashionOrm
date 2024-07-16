import React from "react";

async function fetchProducts() {
  const res = await fetch("http://localhost:4000/api/products");
  if (!res.ok) {
    console.log("failed to response");
  }
  return res.json();
}

const ProductsPage = async () => {
  const products = await fetchProducts();

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          <a href={`/products/${product.slug}`}>{product.name}</a>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
