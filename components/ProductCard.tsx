import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border my-4 w-80 shadow hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <a>
          <Image src={product.pictureUrl} alt="" width={320} height={240} />
          <div className="p-2 flex justify-between items-baseline">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <span>{product.price}</span>
          </div>
        </a>
      </Link>
    </div>
  );
}
