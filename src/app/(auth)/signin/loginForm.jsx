"use client";
import { loginApiCall } from "@/api/login_api";
import { Button, Form, Input, message } from "antd";
import { setCookie } from 'cookies-next';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../../../../public/logo-sign.png";


const LoginForm = () => {
    const router = useRouter();

    const handleLogin = async (values) => {
        try {
            message.info("Please Wait...");

            // Prepare form data
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('password', values.password);

            // Call login API
            const data = await loginApiCall(formData);

            // Check if login is successful
            if (data.access && data.refresh && data.groups && data.username) {
                // Set cookies
                setCookie('accessToken', data.access, {
                    maxAge: 10 * 60 * 60, // 10 hours
                    path: '/',
                    sameSite: 'strict'
                });

                setCookie('refreshToken', data.refresh, {
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    path: '/',
                    sameSite: 'strict'
                });

                setCookie('role', ...data.groups, {
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    path: '/',
                    sameSite: 'strict'
                });

                setCookie('name', data.username, {
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    path: '/',
                    sameSite: 'strict'
                });

                message.success("Login Success!");
                router.push('/');

                // Redirect based on user type
                // if (data.new_user) {
                //   router.push('/profile-setup');
                // } else {
                //     router.push('/');
                // }
            } else {
                message.error("Invalid Email or Password! Please try again with correct credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            message.error("An error occurred during login. Please try again.");
        }
    };


    return (
        <div className="p-8 shadow-md rounded-2xl w-[400px] m-8 bg-cover bg-center bg-no-repeat bg-white">
            <div className="flex flex-col items-center justify-center gap-4 mb-4">
                <div className="flex items-center justify-center">
                    <Image src={Logo} alt="Logo" className="h-1/2 w-1/2"/>
                </div>
                <h1 className={"text-center text-2xl font-semibold"} style={{
                    lineHeight: "1"
                }}>
                    Welcome back
                </h1>
                <p className="text-center" style={{
                    fontSize: "11px",
                    lineHeight: "1.5"
                }}>
                    Glad to see you again <br/>
                    Login to your account below
                </p>
            </div>
            <Form onFinish={handleLogin} layout="vertical" variant="filled">
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Email!",
                        },
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                    ]}
                >
                    <Input size="large"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{required: true, message: "Please input your password!"}]}
                >
                    <Input.Password size="large"/>
                </Form.Item>
                <div className="flex justify-end mb-3 -mt-2">
                    <a href="" className="text-black hover:text-green-600/70">
                        Forgot Password?
                    </a>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType={"submit"} className="w-full bg-primary" size="large">
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className={"flex flex-row items-center justify-center"}>
                    <span>Don&#39;t Have an account?
                        <Link href={'/signup'} style={{
                            color: "#ff4d00"
                        }}>
                            &nbsp; Signup for free
                        </Link>
                    </span>
                    <Link href={"/signup"} style={{
                        margin: "0 15px",
                        display: "none"
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36"
                             viewBox="0 0 48 48">
                            <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                            <path fill="#fff"
                                  d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                        </svg>
                    </Link>
                    <Link href={"/signup"} style={{
                        margin: "0 15px",
                        display: "none"
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36"
                             viewBox="0 0 48 48">
                            <path fill="#FFC107"
                                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path fill="#FF3D00"
                                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                            <path fill="#4CAF50"
                                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                            <path fill="#1976D2"
                                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                    </Link>
                    <Link href={"/signup"} style={{
                        margin: "0 15px",
                        display: "none"
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36"
                             viewBox="0 0 48 48">
                            <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
                            <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
                            <polygon fill="#e53935"
                                     points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon>
                            <path fill="#c62828"
                                  d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path>
                            <path fill="#fbc02d"
                                  d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default LoginForm;
