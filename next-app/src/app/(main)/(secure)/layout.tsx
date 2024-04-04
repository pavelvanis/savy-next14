import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DEFAULT_UNAUTHORIZED_REDIRECT } from "@/config/routes";
import { FooterSmall, HeaderWeb, UserNav } from "@/components/layout";

const SecureLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth();

  // Redirecting when there's no session
  if (!session) {
    redirect(DEFAULT_UNAUTHORIZED_REDIRECT);
  }

  return (
    <div className=" min-h-screen flex flex-col">
      <HeaderWeb />
      <UserNav />
      <main className=" container flex-1 flex flex-col justify-center items-center my-8">
        {children}
      </main>
      <FooterSmall />
    </div>
  );
};

export default SecureLayout;
