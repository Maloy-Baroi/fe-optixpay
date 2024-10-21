"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PaymentFailed = () => {
  const router = useRouter();

  useEffect(() => {
    // Use a function inside setTimeout
    const timeout = setTimeout(() => {
      router.push("/"); // Redirect to the homepage after 3 seconds
    }, 3000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Payment Failed. Please try again.</h1>
    </div>
  );
};

export default PaymentFailed;
