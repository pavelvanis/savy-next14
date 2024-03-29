import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/navlink";
import { authNavLinks } from "@/config/routes";

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
          {authNavLinks.map(({ ...props }, i) => (
            <li className="inline-block" key={i}>
              <NavLink
                key={i}
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
