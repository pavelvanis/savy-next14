import React from "react";
import { cn } from "@/lib/utils";
import { Action, NavLink } from "@/components";
import { Badge, Typography } from "@/components/ui";
import { userNavLinks } from "@/config/routes";
import { getAuthSession } from "@/lib/auth";
import { MailIcon } from "lucide-react";

type UserNavProps = PropsWithClassName & {};

const UserNav: React.FC<UserNavProps> = async ({ className }) => {
  const { user } = await getAuthSession();
  return (
    <nav
      className={cn(
        "bg-red-50 h-14 flex items-center gap-x-10 px-5",
        className
      )}
    >
      {/* Name */}
      <Typography className="text-lg font-semibold">
        {user.firstName} {user.lastName}
      </Typography>
      {/* Actions */}

      {/* Links */}
      <ul className="flex items-center h-full">
        {userNavLinks.map((link, i) => (
          <li key={i} className="px-2 h-full flex items-center">
            <NavLink key={i} {...link} className="w-20" />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserNav;
