import React from "react";

import Image from "next/image";
import RegisterForm from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Savy",
  description:
    "Register to your account to manage your baking accounts and transactions",
};

const RegisterPage = () => {
  return (
    <>
      <div className="absolute left-0 top-0 w-screen h-screen">
        <Image
          src="/images/register.svg"
          alt="register-image"
          width={600}
          height={600}
          className="w-screen h-screen object-center"
        />
      </div>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
