import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SecureFooter, SecureHeader } from "./_components";
import authOptions from "@/lib/authOptions";
import { DEFAULT_UNAUTHORIZED_REDIRECT } from "@/config/routes";

const SecureLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await getServerSession(authOptions);

  // Redirecting when there's no session
  if (!session) {
    redirect(DEFAULT_UNAUTHORIZED_REDIRECT);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <SecureHeader />
      <main className=" min-h-screen flex flex-col justify-center items-center">
        {children}
      </main>
      <SecureFooter />
    </div>
  );
};

export default SecureLayout;
