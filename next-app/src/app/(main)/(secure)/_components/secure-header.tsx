import React from "react";
import { getServerSession } from "next-auth";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/navlink";
import { Typography } from "@/components/ui";
import { mainNavLinks } from "@/config/routes";
import authOptions from "@/lib/authOptions";
import LoginSignout from "@/components/auth/header-session";

const PublicHeader = async ({ className }: PropsWithClassName) => {
  const session = await getServerSession(authOptions);
  return (
    <div
      className={cn(
        "bg-red-5 h-16 flex px-5 items-center justify-between",
        className
      )}
    >
      {/* Logo */}
      <Typography>Big logo here</Typography>
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
