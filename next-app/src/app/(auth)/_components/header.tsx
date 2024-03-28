import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { NavLink, NavLinkProps } from "@/components/navlink";

const links: NavLinkProps[] = [
  { href: "#", title: "Docs" },
  { href: "#", title: "About" },
  { href: "#", title: "Security" },
];

const AuthHeader = ({ className }: PropsWithClassName) => {
  return (
    <header
      className={cn("h-16 flex justify-between align-center px-8", className)}
    >
      <div className="flex justify-center items-center">
        <Image
          src="/logo.png"
          width={64}
          height={64}
          className="p-2"
          alt="logo"
        />
      </div>
      <nav className="flex">
        <ul className="flex justify-between items-center gap-x-2 ">
          {links.map(({ ...props }) => (
            <li className="inline-block">
              <NavLink
                className="inline-block text-center uppercase"
                {...props}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default AuthHeader;
