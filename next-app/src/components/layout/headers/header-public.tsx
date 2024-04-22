import React from "react";
import Image from "next/image";
import {
  HeaderAuthMenuList,
  HeaderPublicMenuList,
  HeaderUserMenuList,
} from "@/components/layout/menu";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import LoginSignout from "@/components/auth/header-session";
import { HeaderMenu } from "../menu";
import { HeaderPublicNavList } from "../navbars";

const SmallHeader = async ({ className }: PropsWithClassName) => {
  const session = await auth();
  return (
    <header
      className={cn(
        "bg-red-5 h-16 flex px-5 items-center justify-between sticky top-0 z-50 w-full",
        className
      )}
    >
      {/* Logo */}
      <Image
        src="/logo.png"
        width={64}
        height={64}
        alt="logo"
        className="p-2"
      />

      {/* Nav */}
      {/* <HeaderPublicNavList className="flex-row hidden sm:flex" /> */}

      {/* Menu */}
      <HeaderMenu className="ms-auto md:hidden">
        {/* <HeaderPublicMenuList className="sm:hidden" /> */}
        <HeaderUserMenuList loginState={!!session} />
        <HeaderAuthMenuList loginState={!!session} />
      </HeaderMenu>

      {/* Login & Register | Signout */}
      <LoginSignout className="hidden md:flex" state={!!session} />
    </header>
  );
};

export default SmallHeader;
