"use client"

import Head from "next/head";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
// import LoginForm from "@/app/(auth)/signin/loginForm";
// import AgentProfileForm from "@/app/(auth)/profile-setup/profile_form";

const ProfileSetup: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000); // 3000 ms = 3 seconds

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <div
        className={"h-full flex items-center justify-center"}
        style={{
          backgroundImage: 'url("/login_bg.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/*<AgentProfileForm />*/}
      </div>
    </>
  )
}

export default ProfileSetup;
