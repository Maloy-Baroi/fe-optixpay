"use client"

import {depositBKashPayExecute, verifyPayment} from "@/api/deposit";
import Cookies from "js-cookie";
import {useRouter, useSearchParams} from "next/navigation";
import React, {Suspense, useEffect} from 'react';

const CallBackURL: React.FC = () => {
  const searchParams = useSearchParams();
  const route = useRouter();
  let payment_method = "";

  useEffect(() => {
    if (searchParams.get("paymentID")) {
      payment_method = 'bkash';
    } else {
      payment_method = 'nagad';
    }
    const payment_id = searchParams.get("paymentID") ? searchParams.get("paymentID") : searchParams.get("issuer_payment_ref");
    const status = searchParams.get("status");
    // const signature = searchParams.get("signature");

    const authToken = Cookies.get("accessToken");
    const x_app_token = Cookies.get('agent_app_key');
    const id_token = Cookies.get("id_token");
    const pay_model_id = Cookies.get("payment_id");

    if (status?.toLowerCase() === 'success') {
      if (searchParams.get('paymentID')) {
        const response = depositBKashPayExecute(payment_id, id_token, x_app_token, authToken, pay_model_id);
        response?.then(data => {
          if (data) {
            route.push('/paymentSuccess');
          }
        })
      }
      else if (searchParams.get("issuer_payment_ref")) {
        const orderId = searchParams.get("order_id");
        const response = verifyPayment(payment_id, orderId);
        response.then(data => {
          if (data['message'] == 'Successfully Paid') {
            route.push('/paymentSuccess');
          }
        })
      }
    } else {
      route.push('/paymentFailed')
    }
  }, [route, searchParams]);

  return (
    <></>
  );
}

export default function WrappedCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallBackURL/>
    </Suspense>
  );
}
