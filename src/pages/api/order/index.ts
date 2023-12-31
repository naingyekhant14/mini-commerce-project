import { OrderStatus, Product } from "@prisma/client";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CartItem } from "../../../types/cart";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const cartItems = req.body as CartItem[];
    const cartItemId = cartItems.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: cartItemId } },
    });

    const getProductPriceWithQuantity = (item: CartItem) => {
      return products.find((p) => p.id === item.id).price * item.quantity;
    };

    let totalPrice = 0;
    cartItems.forEach((item) => {
      const price = getProductPriceWithQuantity(item);
      totalPrice += price;
    });
    const createOrder = await prisma.order.create({
      data: { status: OrderStatus.ORDERED, totalPrice },
    });
    const orderId = createOrder.id;
    cartItems.forEach(async (item) => {
      await prisma.orderLine.create({
        data: { orderId, productId: item.id, quantity: item.quantity },
      });
    });
    return res.status(200).json({ orderId, status: OrderStatus.ORDERED });
  }
  res.status(405).json("Method not allowed");
}
