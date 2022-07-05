import Page from "../components/Page";
import ProductCard from "../components/ProductCard";
import { getProducts, Product } from "../lib/products";

export async function getStaticProps() {
  const products = await getProducts();

  return {
    props: {
      products,
    },
    revalidate: 20,
  };
}

export default function Home({ products }: { products: Array<Product> }) {
  return (
    <Page title="Indoor plants">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
}
