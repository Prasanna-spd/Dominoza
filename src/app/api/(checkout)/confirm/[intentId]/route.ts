import { prisma } from "@/utils/connect";
import {type  NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest, { params }: { params: Promise<{ intentId: string } >}) => {
  const { intentId } = await params;

  try {
    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: { status: "Being prepared!" },
    });
    return new NextResponse(JSON.stringify({ message: "Order has been updated" }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
  }
};
