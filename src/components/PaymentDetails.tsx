"use client";

import { useSearchParams ,useRouter} from "next/navigation";
import { useEffect } from "react";

export default function PaymentDetails() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const payment_intent = searchParams.get("payment_intent");
  
    useEffect(() => {
      const makeRequest = async () => {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm/${payment_intent}`, {
            method: "PUT",
          });
          setTimeout(() => {
            router.push("/orders");
          }, 5000);
        } catch (err) {
          console.log(err);
        }
      };
  
      makeRequest();
    }, [payment_intent, router]);

  return (
    <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
    <p className="max-w-[600px]">
      Payment successful. You are being redirected to the orders page.
      Please do not close the page.
    </p>
  {/* <ConfettiExplosion className="absolute m-auto" */}
  {/* /> */}
  </div>
  );
}
