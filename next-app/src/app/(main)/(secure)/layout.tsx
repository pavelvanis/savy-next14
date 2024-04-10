import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DEFAULT_UNAUTHORIZED_REDIRECT } from "@/config/routes";
import { FooterSmall, HeaderWeb, UserNav } from "@/components/layout";
import ToastHandlerProvider from "@/components/providers/toast-provider";

const SecureLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth();

  // Redirecting when there's no session
  if (!session) {
    redirect(DEFAULT_UNAUTHORIZED_REDIRECT);
  }

  return (
    <ToastHandlerProvider>
      <div className=" min-h-screen flex flex-col">
        <HeaderWeb className="sticky top-0 sm:static z-50" />
        <UserNav className="hidden sm:block sticky top-0 left-0 z-50" />
        <main className=" container flex-center flex-1 flex-col my-8">
          {children}
        </main>
        <FooterSmall />
      </div>
    </ToastHandlerProvider>
  );
};

export default SecureLayout;
