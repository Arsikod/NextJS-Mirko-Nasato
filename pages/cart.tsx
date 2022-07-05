import React from "react";
import Page from "../components/Page";
import { useCartItems } from "../hooks/cartItems";
import { useUser } from "../hooks/user";
import { CartItem } from "../types/cart-items";

export default function CartPage() {
  const { cartItems, isLoading } = useCartItems();
  const user = useUser();

  return (
    <Page title={`${user?.name} Your Cart Items`}>
      {isLoading ? <h4>...loading</h4> : <CartTable cartItems={cartItems} />}
    </Page>
  );
}

function CartTable(props: { cartItems: Array<CartItem> }) {
  const { cartItems } = props;

  return (
    <table>
      <thead>
        <tr>
          <th className="px-4 py-2">Product</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {cartItems?.map((cartItem) => (
          <tr key={cartItem.id}>
            <td className="px-4 py-2">{cartItem.title}</td>
            <td className="px-4 py-2 text-right">{cartItem.price}</td>
            <td className="px-4 py-2 text-right">{cartItem.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
