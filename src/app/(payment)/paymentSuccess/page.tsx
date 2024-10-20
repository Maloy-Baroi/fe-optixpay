"use client";

import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd"; // Import Ant Design button for consistent UI
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/pay-in-approval"); // Redirect to the dashboard or any page you prefer
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <CheckCircleOutlined
          className="text-green-500"
          style={{ fontSize: "96px" }}
        />
        <h1 className="text-4xl font-bold text-gray-800 mt-6">
          Payment Successful!
        </h1>
        <p className="text-gray-500 mt-4">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
        <Button
          type="primary"
          className="mt-8"
          size="large"
          onClick={handleClick}
          style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
