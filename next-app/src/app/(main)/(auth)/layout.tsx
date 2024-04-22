import React from "react";
import { auth } from "@/lib/auth";
import Signout from "./_components/signout";
import { FooterSmall, HeaderAuth } from "@/components/layout";

const AuthLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth();

  return (
    <>
      <HeaderAuth />
      <main className=" relative min-h-screen flex flex-col justify-center items-center">
        {/* If the user is logged in, a signout button will appear. */}
        {session ? <Signout /> : children}
      </main>
      <FooterSmall />
    </>
  );
};

export default AuthLayout;
