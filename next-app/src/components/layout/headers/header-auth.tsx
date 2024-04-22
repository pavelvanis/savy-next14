import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HeaderPublicNavList } from "../navbars";
import { HeaderMenu, HeaderPublicMenuList } from "../menu";
import Link from "next/link";

const AuthHeader = ({ className }: PropsWithClassName) => {
  return (
    <header
      className={cn(
        "container h-16 flex justify-between items-center px-8 fixed top-0 left-0 right-0 z-50",
        className
      )}
    >
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/logo.png"
          width={64}
          height={64}
          className="p-2"
          alt="logo"
        />
      </Link>
      {/* <HeaderPublicNavList className="hidden md:flex flex-row" /> */}
      {/* <HeaderMenu hidden="md">
        <HeaderPublicMenuList  />
      </HeaderMenu> */}
    </header>
  );
};

export default AuthHeader;
