import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/navlink";
import { mainNavLinks } from "@/config/routes";
import LoginSignout from "@/components/auth/header-session";
import { auth } from "@/lib/auth";

const PublicHeader = async ({ className }: PropsWithClassName) => {
  const session = await auth();
  return (
    <div
      className={cn(
        "bg-red-5 h-16 flex px-5 items-center justify-between",
        className
      )}
    >
      {/* Logo */}
      <Image src="/logo.png" width={64} height={64} alt="logo" className="p-2"/>
      {/* Nav */}
      <nav>
        <ul className="flex gap-x-4">
          {mainNavLinks.map((link, i) => (
            <li key={i}>
              <NavLink key={i} {...link} className="w-20" />
            </li>
          ))}
        </ul>
      </nav>
      {/* Login & Register | Signout */}
      <LoginSignout state={!!session} />
    </div>
  );
};

export default PublicHeader;
