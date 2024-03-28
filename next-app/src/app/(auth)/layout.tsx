import React from "react";
import AuthHeader from "./_components/header";
import AuthFooter from "./_components/footer";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import Signout from "./_components/signout";

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
