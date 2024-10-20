"use client"
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import Image from "next/image";
import Logo from "../../../../public/logo-sign.png";
import {tokenVerifyApiCall} from "@/api/login_api";
import Link from "next/link";
import {useRouter} from "next/navigation";

const TokenForm = () => {
    const [form] = Form.useForm();
    // const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values) => {
        // setLoading(true);
        const email = localStorage.getItem("signup_email");
        const verificationResult = await tokenVerifyApiCall(email, values.token);
        if (verificationResult.result) {
            message.success('Token verified successfully!');
            await router.push('/auth/signin');
        } else {
            message.error('Token verification failed. Please try again.');
        }
        setLoading(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div
            className={"h-screen w-screen flex items-center justify-center"}
            style={{
                backgroundImage: 'url("/login_bg.jpg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="p-8 shadow-md rounded-2xl w-[400px] m-8 bg-cover bg-center bg-no-repeat bg-white">
                <div className="flex flex-col items-center justify-center gap-4 mb-4">
                    <div className="flex items-center justify-center">
                        <Image src={Logo} alt="Logo" className="h-1/2 w-1/2"/>
                    </div>
                    <h1 className={"text-center text-2xl font-semibold"} style={{
                        lineHeight: "1"
                    }}>
                        OTP Verification
                    </h1>
                </div>
                <Form
                    form={form}
                    name="token_form"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    initialValues={{
                        token: '',
                    }}
                >
                    <Form.Item
                        name="token"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your 6-digit token!',
                            },
                            {
                                len: 6,
                                message: 'Token must be exactly 6 digits',
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Token must only contain digits',
                            },
                        ]}
                    >
                        <Input maxLength={6} placeholder="Enter 6-digit token"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType={"submit"} className="w-full bg-primary" size="large">
                            Verify
                        </Button>
                    </Form.Item>
                </Form>
                <div className="flex flex-col items-center justify-center gap-4 mb-4">
                    <Link href={'/signup'}
                          className="flex items-center gap-2 text-black no-underline"> {/* Added flex, items-center, and gap-2 here */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                             strokeLinecap="round" strokeLinejoin="round"
                             strokeWidth="2" // Corrected to camelCase for React
                             className="feather feather-arrow-left">
                            <path d="M19 12H5"></path>
                            <path d="M12 19L5 12 12 5"></path>
                        </svg>
                        Back to <span style={{color: "#ff4d00"}}>signup</span> page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TokenForm;
