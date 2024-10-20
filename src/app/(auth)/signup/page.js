"use client"
import React from 'react';
import Head from 'next/head';
import {signupApiCall} from '@/api/login_api';
import SignupForm from "./signupForm";
import { message } from 'antd';
import {useRouter} from "next/navigation";

const Signup = () => {
    const router = useRouter();

    // const [smallTextOpen, setSmallTextOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    // const [showPassword, setShowPassword] = React.useState(false); // New state for showing password
    const [buttonLoading, setButtonLoading] = React.useState(false);

    function validatePassword(password) {
        // Regular expression pattern
        const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/;
        return pattern.test(password);
    }

    // Handler for form submission
    const handleSubmit = async () => {
        // e.preventDefault();
        setButtonLoading(true);
        if (validatePassword(password)) {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const result = await signupApiCall(formData);
            if (result.statusCode >= 200 && result.statusCode < 300) {
                message.success(result.data.message);  // Accessing the message from response JSON
                if (result.data.message.includes("OTP sent")) {
                    await router.push('/verify');
                }
            } else {
                message.error(result.data.error);  // Error handling with message from JSON
            }
            setButtonLoading(false);
        }
        else {
            console.log("Error: ");
        }
    };

    return (
        <>
            <Head>
                <title>Signup Page</title>
            </Head>
            <div
                className={"h-screen w-screen flex items-center justify-center"}
                style={{
                  backgroundImage: 'url("/login_bg.jpg")',
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat"
                }}
            >
                <SignupForm email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            handleSubmit={handleSubmit}
                            buttonLoading={buttonLoading} />
            </div>
        </>
    );
};

export default Signup;
