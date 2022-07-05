import { NextApiRequest, NextApiResponse } from "next";
import { fetchJson } from "../../lib/api";
import type { CartItem, CartItemDTO } from "../../types/cart-items";

const { CMS_URL } = process.env;

export default async function handleCart(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return handleGetCartItem(req, res);
    case "POST":
      return handlePostCartItem(req, res);

    default:
      res.status(405).end();
  }
}

async function handlePostCartItem(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).end();
  }

  const { product, quantity } = req.body;

  try {
    await fetchJson<Array<CartItemDTO>>(`${CMS_URL}/cart-items`, {
      method: "POST",
      headers: { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json" },
      body: JSON.stringify({ product, quantity }),
    });

    res.status(201).json({});
  } catch (error) {
    res.status(401).end();
  }
}

async function handleGetCartItem(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).end();
  }

  try {
    const cartItems = await fetchJson<Array<CartItemDTO>>(`${CMS_URL}/cart-items`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    res.status(200).json(cartItems.map(stripCartItem));
  } catch (error) {
    res.status(401).end();
  }
}

function stripCartItem(cartItemDTO: CartItemDTO): CartItem {
  const {
    product: { id, title, price },
    quantity,
  } = cartItemDTO;

  return {
    id,
    title,
    price,
    quantity,
  };
}
