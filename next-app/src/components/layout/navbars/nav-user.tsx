import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui";
import { userNavLinks } from "@/config/routes";
import { getAuthSession } from "@/lib/auth";

type UserNavProps = PropsWithClassName & {};

const UserNav: React.FC<UserNavProps> = async ({ className }) => {
  const { user } = await getAuthSession();
  return (
    <nav
      className={cn("bg-red-0 h-14 flex items-center gap-x-10 px-5", className)}
    >
      {/* Name */}
      <div className=" flex items-center gap-1.5">
        <Typography className="text-lg font-semibold">
          {user.firstName}
        </Typography>
        <Typography className="text-lg font-semibold">
          {user.lastName}
        </Typography>
      </div>
      {/* Actions */}

      {/* Links */}
      <ul className="flex items-center h-full w-full">
        {userNavLinks.map((link, i) => (
          <li
            key={i}
            className=" text-center h-full flex flex-grow items-center hover:bg-gray-600 hover:text-white transition-all"
          >
            <Link
              className="flex-1 flex items-center justify-center h-full"
              href={link.href}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserNav;
