import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "DELETE") {
    const query = req.query;
    const orderId = Number(query.id);
    if (!orderId) return res.status(400).send("bad request");
    const isFounded = await prisma.order.findFirst({ where: { id: orderId } });
    if (!isFounded) return res.status(400).send("bad request");
    await prisma.orderLine.deleteMany({ where: { orderId: orderId } });
    await prisma.order.deleteMany({ where: { id: orderId } });
    return res.status(200).send("OK");
  }
  res.status(405).send("method is not allowed");
}
