import ProductDetail from "app/components/ProductDetail";

export async function generateMetadata({ params, searchParams }, parent) {
  const slug = params.slug;

  const product = await fetch(
    `http://localhost:4000/api/products/${slug}`
  ).then((res) => res.json());

  return {
    title: product.name,
  };
}

const ProductDetailPage = async ({ params }) => {
  const slug = params.slug;

  return <ProductDetail slug={slug} />;
};

export default ProductDetailPage;
