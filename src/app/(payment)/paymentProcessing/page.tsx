"use client";
import { depositBKashPayGrant, initiatePayment } from "@/api/deposit";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_DEVELOPMENT === "true"
  ? "http://localhost:8000/api/v1"
  : process.env.NEXT_PUBLIC_API_URL;

const PaymentProcessing = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // This requires client-side rendering

  const storeDataInCookies = (
    id_token: string,
    agentAppKey: string,
    agentSecretKey: string,
    agentUsername: string,
    agentPassword: string,
    paymentAmount: string,
    currency: string = 'BDT',
    payment_id: string
  ) => {
    const expirationTimeInMinutes = 5 / (24 * 60); // 5 minutes expressed in fraction of days

    // Set cookies for each of the values with a 15-minute expiration time
    Cookies.set('id_token', id_token, { expires: expirationTimeInMinutes });
    Cookies.set('agent_app_key', agentAppKey, { expires: expirationTimeInMinutes });
    Cookies.set('agent_secret_key', agentSecretKey, { expires: expirationTimeInMinutes });
    Cookies.set('agent_username', agentUsername, { expires: expirationTimeInMinutes });
    Cookies.set('agent_password', agentPassword, { expires: expirationTimeInMinutes });
    Cookies.set('payment_amount', paymentAmount, { expires: expirationTimeInMinutes });
    Cookies.set('currency', currency, { expires: expirationTimeInMinutes });
    Cookies.set('payment_id', payment_id, { expires: expirationTimeInMinutes });
  };

  // Define the async function to verify merchant
async function verifyMerchant(api_key: string, secret_key: string, payment_method:string) {
  try {
      const authToken = Cookies.get('accessToken');
      const response = await fetch(`${BACKEND_DOMAIN}/app-merchant/merchants/verification/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}` // Add the token for the authenticated user if needed
          },
          body: JSON.stringify({
              api_key: api_key,
              secret_key: secret_key,
              payment_method: payment_method
          })
      });

      if (!response.ok) {
          throw new Error('Merchant verification failed');
      }

      const data = await response.json();
      return data;  // Return the data for further use
  } catch (error) {
      console.error('Error:', error);  // Handle any errors
      return null;  // Return null if an error occurs
  }
}
  // Extract payment information from URL parameters
  const apiKey = searchParams.get("apiKey");
  const secretKey = searchParams.get("secretKey");
  const paymentAmount = searchParams.get("paymentAmount");
  const paymentMethod = searchParams.get("paymentMethod");
  // const paymentCurrency = searchParams.get("paymentCurrency");

  if (apiKey && secretKey && paymentAmount && paymentMethod) {
    // Use async/await to wait for the verification result
    (async () => {
        if (paymentMethod.toLowerCase() === 'bkash') {
          const verifyMerchentValue = await verifyMerchant(apiKey, secretKey, paymentMethod);

          if (verifyMerchentValue) {
            const agent_app_key = verifyMerchentValue['agent_data']['provider_key'];
            const agent_secret_key = verifyMerchentValue['agent_data']['provider_secret'];
            const agent_username = verifyMerchentValue['agent_data']['provider_phone_number'];
            const agent_password = verifyMerchentValue['agent_data']['provider_password'];
            const merchant = verifyMerchentValue['my_merxt'];
            const authToken = Cookies.get('accessToken');

            const deposit_grant_result = await depositBKashPayGrant(agent_app_key, agent_secret_key, agent_username, agent_password, authToken, paymentAmount, paymentMethod, "BDT", merchant);
            const id_token = deposit_grant_result['data']['id_token'];
            const payment_id = deposit_grant_result['data']['payment_id'];
            storeDataInCookies(id_token, agent_app_key, agent_secret_key, agent_username, agent_password, paymentAmount, "BDT", payment_id);

            if (id_token) {
              router.push(`bkash-pay/?amount=${paymentAmount}`);
            }
          } else {
            router.push("/paymentFailed");
          }
        }
        else if (paymentMethod.toLowerCase() === 'nagad') {
          const handleInitiatePayment = async () => {
            try {
              const response = await initiatePayment('500.00', 'ORDER123456');
              console.log('Initiation Success:', response);
              // Handle response, such as redirecting to payment URL
            } catch (error) {
              console.error('Payment initiation failed:', error);
            }
          };

          handleInitiatePayment();

          // const handleVerifyPayment = async () => {
          //   try {
          //     const response = await verifyPayment(paymentId);
          //     console.log('Verification Success:', response);
          //     // Handle payment verification result
          //   } catch (error) {
          //     console.error('Payment verification failed:', error);
          //   } finally {
          //     setLoading(false);
          //   }
          // };
        }
    })();
  }

  // Handle payment processing logic here using these data
  // You can access them using the `apiKey`, `secretKey`, `paymentAmount`, `paymentMethod` variables

  console.log("Payment processing...");
  console.log("API key:", apiKey);
  console.log("Secret key:", secretKey);
  console.log("Payment amount:", paymentAmount); // Example: 1000
  console.log("Payment method:", paymentMethod);
  console.log("Payment processing complete!");

  useEffect(() => {
    const timer = setTimeout(() => {
      // const paymentSuccess = true; // Simulated result

      // if (paymentSuccess) {
      //   router.push("/paymentSuccess");
      // } else {
      //   router.push("/paymentFailed");
      // }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <Spin indicator={antIcon} />
        <h1 className="text-2xl font-bold text-gray-800 mt-6">
          Processing your payment...
        </h1>
        <p className="text-gray-500 mt-4">
          Please wait while we process your payment.
        </p>
      </div>
    </div>
  );
};

// Wrap the page inside a Suspense boundary
const PaymentProcessingPage = () => {
  // must use suspense if  useSearchParams() used otherwise build will fail
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentProcessing />
    </Suspense>
  );
};

export default PaymentProcessingPage;
