import React from "react";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/navlink";
import { Typography } from "@/components/ui";
import { mainNavLinks } from "@/config/routes";
import LoginSignout from "@/components/auth/header-session";
import { SettingsIcon } from "lucide-react";

const PublicHeader = async ({ className }: PropsWithClassName) => {
  const session = await auth();
  return (
    <header
      className={cn(
        "bg-red-5 h-20 flex px-5 items-center justify-between container",
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
      {session && (
        <div className="flex items-center gap-x-4">
          <Typography className=" text-xl font-semibold">
            {session.user.firstName} {session.user.lastName}
          </Typography>
          <SettingsIcon className="size-6 me-3 hover:text-gray-700 hover:fill-gray-300 transition-all cursor-pointer" />
          <LoginSignout state={!!session} />
        </div>
      )}
      {!session && <LoginSignout state={!!session} />}
    </header>
  );
};

export default PublicHeader;
