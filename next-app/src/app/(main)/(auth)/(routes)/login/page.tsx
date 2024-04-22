import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | Savy",
  description:
    "Login to your account to manage your baking accounts and transactions",
};

const LoginPage = () => {
  return (
    <>
      <div className="absolute left-0 top-0 w-screen h-screen">
        <Image
          src="/images/login.svg"
          alt="login-image"
          width={600}
          height={600}
          className="w-screen h-screen object-cover"
        />
      </div>
      <LoginForm />
    </>
  );
};

export default LoginPage;
