import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";
import { CartItem } from "../types/cart-items";

export function useCartItems() {
  const { data: cartItems, isLoading } = useQuery("cart-items", async () => {
    try {
      return await fetchJson<Array<CartItem>>("/api/cart");
    } catch (error) {
      [];
    }
  });

  return { cartItems, isLoading };
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(
    ({ product, quantity }: Record<string, number>) => {
      console.log(product, quantity);
      return fetchJson("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, quantity }),
      });
    }
  );

  return {
    addToCartLoading: isLoading,
    addToCart: async ({ product, quantity }: Record<string, number>) => {
      try {
        await mutateAsync({ product, quantity });
        queryClient.invalidateQueries("cart-items");
      } catch (error) {}
    },
  };
}
