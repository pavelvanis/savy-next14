import React from "react";
import { cn } from "@/lib/utils";
import CustomLink from "@/components/link";
import { userNavLinks } from "@/config/routes";

type UserNavProps = PropsWithClassName & {};

const UserNav: React.FC<UserNavProps> = async ({ className }) => {
  return (
    <div className={cn(" bg-gray-200 shadow-md", className)}>
      <nav className="bg-red-0 h-14 flex items-center gap-x-10 px-5 container">
        {/* Links */}
        <ul className="flex items-center h-full w-full">
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
