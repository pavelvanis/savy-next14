import React from "react";
import { MenuIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/navlink";
import { mainNavLinks } from "@/config/routes";
import { IconButton, Typography } from "@/components/ui";
import LoginSignout from "@/components/auth/header-session";

const PublicHeader = async ({ className }: PropsWithClassName) => {
  const session = await auth();
  return (
    <div className=" bg-gradient-to-br from-white to-gray-100">
      <header
        className={cn(
          " h-16 flex px-5 items-center justify-between gap-x-14 container",
          className
        )}
      >
        {/* Logo */}
        <Typography className="whitespace-nowrap">Big logo here</Typography>
        {/* Nav */}
        <div className="flex-1 flex items-center justify-center flex-wrap gap-x-4 gap-y-2">
          <nav className=" hidden mx-auto">
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
            <Typography className="ms-auto whitespace-nowrap text-xl font-semibold">
              {session.user.firstName} {session.user.lastName}
            </Typography>
          )}
          {/* Menu */}
          <IconButton
            variant="text"
            className="user-nav-link max-w-8 max-h-8 sm:hidden "
          >
            {/* <AlignRightIcon className="icon" /> */}
            <MenuIcon className="icon" />
          </IconButton>

          <LoginSignout className="hidden sm:block" state={!!session} />
        </div>
      </header>
    </div>
  );
};

export default PublicHeader;
