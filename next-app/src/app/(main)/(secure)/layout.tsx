import React from "react";
import { redirect } from "next/navigation";
import { SecureFooter, SecureHeader } from "./_components";
import { DEFAULT_UNAUTHORIZED_REDIRECT } from "@/config/routes";
import { auth } from "@/lib/auth";

const SecureLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth();

  // Redirecting when there's no session
  if (!session) {
    redirect(DEFAULT_UNAUTHORIZED_REDIRECT);
  }

  return (
    <div className=" min-h-screen max-w-6xl mx-auto flex flex-col">
      <SecureHeader />
      <main className=" flex-1 flex flex-col justify-center items-center">
        {children}
      </main>
      <SecureFooter />
    </div>
  );
};

export default SecureLayout;
