import { ApiError } from "next/dist/server/api-utils";
import Image from "next/image";
import React, { useState } from "react";
import { getProduct, getProducts, Product } from "../../lib/products";
import Page from "../../components/Page";
import { useQueryClient } from "react-query";
import Button from "../../components/Button";
import { useAddToCart } from "../../hooks/cartItems";

export async function getStaticProps({ params: { id } }: { params: { id: string } }) {
  try {
    const product = await getProduct(id);
    return {
      props: {
        product,
      },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      return { notFound: true };
    }

    throw error;
  }
}

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map((product: Product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: "blocking",
  };
}

export type User = {
  name: string;
};

type ProductPageProps = {
  product: Product;
};

export default function ProductPage({ product }: ProductPageProps) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>("user");

  const [productQuantity, setProductQuantity] = useState("");

  const { addToCart, addToCartLoading } = useAddToCart();

  return (
    <Page title={product.title}>
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image src={product.pictureUrl} alt="product image" width={640} height={480} />
        </div>

        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-2">
            {product.price} {user ? <small>Special for {user.name}</small> : null}
          </p>
        </div>
      </div>
      <input
        className="border border-gray-900"
        type="number"
        value={productQuantity}
        onChange={(e) => setProductQuantity(e.target.value)}
      />
      <Button
        onClick={() =>
          addToCart({ product: product.id, quantity: parseInt(productQuantity) })
        }
        disabled={addToCartLoading}
      >
        {addToCartLoading ? "loading..." : "Add to cart"}
      </Button>
    </Page>
  );
}
