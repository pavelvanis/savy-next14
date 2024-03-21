import React, { PropsWithChildren } from "react";
import AuthHeader from "./_components/header";
import AuthFooter from "./_components/footer";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AuthHeader className=" fixed w-screen top-0 left-1/2 -translate-x-1/2 z-[9999] max-w-6xl" />
      <main className=" min-h-screen max-w-6xl mx-auto flex flex-col justify-center items-center">
        {children}
      </main>
      <AuthFooter className=" max-w-6xl mx-auto" />
    </>
  );
};

export default AuthLayout;
