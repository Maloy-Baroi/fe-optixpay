"use client"
// import { Modal } from 'antd';
import React, { Suspense, useEffect } from "react";
// import BkashPayment from './bkash_payment';
import { depositBKashPayCreate } from "@/api/deposit";
// import {getCookie, setCookie} from "cookies-next";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

// interface BkashPayProps {
//     amount: number;  // or string, based on what you expect
// }

const BkashPay: React.FC = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const id_token = Cookies.get('id_token');
        const agent_app_key = Cookies.get('agent_app_key');
        const agent_secret_key = Cookies.get('agent_secret_key');
        const agent_username = Cookies.get('agent_username');
        const agent_password = Cookies.get('agent_password');
        const payment_amount = Cookies.get('payment_amount');
        const currency = Cookies.get('currency');
        const authToken = Cookies.get('accessToken');
        depositBKashPayCreate(id_token, agent_app_key, agent_secret_key, agent_username, agent_password, authToken, payment_amount, currency).then(data => {
            if (data['data']['bkashURL']) {
                router.push(data['data']['bkashURL']);
            }
        })
    }, [router, searchParams]);

    return (
        <>
            <div className="flex flex-col gap-10"></div>
        </>
    );
}

export default function WrappedCallbackPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <BkashPay />
      </Suspense>
    );
  }
