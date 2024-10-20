import { depositApiCall } from "@/api/payment";
import { PhoneOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface BkashPaymentProps {
    amount: number;  // or string, based on what you expect
    phone: string;
}

const BkashPayment: React.FC<BkashPaymentProps> = ({ amount, phone }) => {
    const [bkashNumber, setBkashNumber] = useState('');

    const onSubmit = () => {
        depositApiCall({
            "amount": amount,
            "bkash_number": phone
        })
    }

    useEffect(() => {
        console.log('Bkash Payment Ready')
    }, []);

    return (
        <>
            <div>
                <div className={"flex justify-center"}>
                    <Image src={"/header_bkash_logo.png"} alt="Bkash" width={300} height={250} />
                </div>
                <p>
                    <br />
                </p>
                <div className="flex items-center bg-gray-200 p-4">
                    <div className="w-12 h-12 flex justify-center items-center bg-white rounded-full border-2 border-gray-400">
                        <Image src="/carts.png" alt="Bkash" width={24} height={25} />
                    </div>
                    <div className="flex flex-col justify-center items-start ml-4">
                        <span>OptixPay</span>
                        <span>Invoice: 12345</span>
                    </div>
                    <div className="ml-auto">
                        <span>৳{amount}</span>
                    </div>
                </div>
                <div className="bg-pink-700 p-6 relative text-white">
                    <div className="mb-4">
                        <p className="m-3">
                            <label htmlFor="bkash-account" className="block text-sm font-medium mb-1 text-center">
                                Your bKash Account number
                            </label>
                        </p>
                        <form onSubmit={onSubmit}>
                            <input
                                value={bkashNumber}
                                onChange={e => setBkashNumber(e.target.value)}
                                type="text"
                                id="bkash-account"
                                placeholder="e.g. 01XXXXXXXXX"
                                className="w-full px-4 py-2 rounded text-black focus:outline-none text-center"
                            />
                        </form>
                    </div>
                    <div className="text-xs mb-4 text-center">
                        By clicking on Confirm, you are agreeing to the
                        <Link href={"https://www.bkash.com/en/page/terms-and-conditions"} 
                            className="underline"> terms & conditions
                        </Link>
                    </div>
                </div>
                <div className="flex w-full"> {/* Ensure the container is full width */}
                    <button className="text-white w-1/2 px-6 py-2 hover:bg-700 transition duration-150"
                        style={{
                            backgroundColor: "gray",
                            fontWeight: "600",
                            borderRight: "1px"
                        }}
                    >
                        CLOSE
                    </button>
                    <button className="w-1/2 px-6 py-2 hover:bg-red-700 text-white transition duration-150"
                        style={{
                            backgroundColor: "#818292",
                            fontWeight: "600"
                        }}
                    >
                        CONFIRM
                    </button>
                </div>
            </div>
            <div className="flex flex-row justify-center items-start mt-5 bg-pink">
                <span className="material-icons text-xl mr-2 text-center w-8 h-8 flex justify-center items-center bg-white rounded-full border-2 border-gray-400">
                    <PhoneOutlined />
                </span>
                <span className="flex items-center text-center text-xl ml-2">16247</span>
            </div>
        </>
    );
}

export default BkashPayment;
