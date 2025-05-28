import { prisma } from "@/utils/connect";
import { type NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest, { params }: { params: Promise<{ orderid: string }>}) {
  const { orderid } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id: orderid,
    },
  });

  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.price.toNumber() * 100,
      currency: "usd",
      description:"This is a new paymet",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await prisma.order.update({
      where: {
        id: orderid,
      },
      data: { intent_id: paymentIntent.id },
    });

    return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 });
  }
  return new NextResponse(JSON.stringify({ message: "Order not found!" }), { status: 404 });
}
