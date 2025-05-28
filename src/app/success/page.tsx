import PaymentDetails from "@/components/PaymentDetails";
import { Suspense } from "react";


const SuccessPage = () => {


  return (
    <>
    {/* suspense for client component issue */}
    <div>
      <h1>Success</h1>
      <Suspense fallback={<p>Loading payment details...</p>}>
        <PaymentDetails />
      </Suspense>
    </div>
    </>
  );
};

export default SuccessPage;