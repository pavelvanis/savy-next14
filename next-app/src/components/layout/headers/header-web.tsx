import React from "react";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui";
import LoginSignout from "@/components/auth/header-session";
import { HeaderMenu } from "@/components/layout/menu";
import { HeaderPublicNavList } from "../navbars";

const HeaderWeb = async ({ className }: PropsWithClassName) => {
  const session = await auth();
  return (
    <div className=" bg-gradient-to-br from-white to-gray-100">
      <header
        className={cn(
          " h-16 flex px-5 items-center justify-between container",
          className
        )}
      >
        {/* Logo */}
        <Typography className="whitespace-nowrap">Big logo here</Typography>
        {/* Nav */}
        <div className="flex-1 flex-center flex-wrap gap-x-4 gap-y-2">
          <HeaderPublicNavList className="hidden md:flex flex-row gap-x-4 mx-auto" />
          {/* Login & Register | Signout */}
          {session && (
            <Typography className="ms-auto whitespace-nowrap text-xl font-semibold">
              {session.user.firstName} {session.user.lastName}
            </Typography>
          )}
          {/* Menu */}
          <HeaderMenu loginState={!!session} />

          <LoginSignout className="hidden md:block" state={!!session} />
        </div>
      </header>
    </div>
  );
};

export default HeaderWeb;
