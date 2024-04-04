import React from "react";
import { auth } from "@/lib/auth";
import Signout from "./_components/signout";
import { FooterSmall, HeaderAuth } from "@/components/layout";

const AuthLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth();

  return (
    <>
      <HeaderAuth className=" fixed w-screen top-0 left-1/2 -translate-x-1/2 z-[9999]" />
      <main className=" min-h-screen container flex flex-col justify-center items-center">
        {session ? <Signout /> : children}
      </main>
      <FooterSmall />
    </>
  );
};

export default AuthLayout;
