"use client";
import Head from "next/head";
import React from "react";
import LoginForm from "./loginForm";

const Login = () => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <div
        className={"h-screen w-screen flex items-center justify-center"}
        style={{
          backgroundImage: 'url("/login_bg.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
