import { fetchJson } from "./api";
import { ProductDTO } from "./products.types";

// const CMS_URL = "http://localhost:1337";
const { CMS_URL } = process.env;

export async function getProducts() {
  return fetchJson<Array<ProductDTO>>(`${CMS_URL}/products`).then((data) =>
    data.map(stripProduct)
  );
}

export async function getProduct(id: string) {
  return fetchJson(`${CMS_URL}/products/${id}`).then(stripProduct);
}

export function stripProduct(product: ProductDTO): Product {
  return {
    id: product.id,
    title: product.title,
    price: "$" + product.price.toFixed(2),
    pictureUrl: CMS_URL + product.picture.url,
    description: product.description,
  };
}

export type Product = {
  id: number;
  title: string;
  price: string;
  pictureUrl: string;
  description: string;
};
