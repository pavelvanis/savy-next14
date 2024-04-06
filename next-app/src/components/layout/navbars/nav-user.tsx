import React from "react";
import { AlignRightIcon, EllipsisIcon, HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomLink from "@/components/link";
import { HOME_ROUTE, userNavLinks } from "@/config/routes";
import { Button } from "@/components/ui";

type UserNavProps = PropsWithClassName & {};

const UserNav: React.FC<UserNavProps> = async ({ className }) => {
  return (
    <div
      className={cn(
        " bg-gradient-to-br from-white to-gray-200 shadow-md border-y-[1.5px] border-gray-200",
        className
      )}
    >
      <nav className="bg-red-0 h-12 flex items-center justify-between container">
        {/* Home */}
        <CustomLink
          className="user-nav-link max-w-36 sm:w-full rounded-e-lg sm:rounded-none flex-center"
          onActive="user-nav-link-active"
          href={HOME_ROUTE}
        >
          <HomeIcon className="icon" />
        </CustomLink>
        {/* Menu */}
        <Button
          variant="text"
          className=" sm:hidden user-nav-link max-w-36 flex-center rounded-e-none"
        >
          {/* <AlignRightIcon className="icon" /> */}
          <EllipsisIcon className="icon" />
        </Button>
        <ul className="hidden sm:flex items-center h-full w-full">
          {userNavLinks.map((link, i) => (
            <li key={i} className=" user-nav-link ">
              <CustomLink
                className="flex-1 flex items-center justify-center h-full"
                onActive="user-nav-link-active"
                href={link.href}
              >
                {link.title}
              </CustomLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserNav;
