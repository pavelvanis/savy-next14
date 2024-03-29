import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { Signout, AuthFooter, AuthHeader } from "./_components";

const AuthLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <AuthHeader className=" fixed w-screen top-0 left-1/2 -translate-x-1/2 z-[9999] max-w-6xl" />
      <main className=" min-h-screen max-w-6xl mx-auto flex flex-col justify-center items-center">
        {session ? <Signout /> : children}
      </main>
      <AuthFooter className=" max-w-6xl mx-auto" />
    </>
  );
};

export default AuthLayout;