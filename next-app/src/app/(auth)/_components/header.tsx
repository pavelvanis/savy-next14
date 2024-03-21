import React from "react";
import { cn } from "@/lib/utils";

const AuthHeader = ({ className }: PropsWithClassName) => {
  return (
    <header
      className={cn("h-14 flex justify-between align-center px-8", className)}
    >
      <div className="flex justify-center items-center">logo</div>
      <nav className="flex">
        <ul className="flex justify-between items-center gap-x-10 ">
          <li>docs</li>
          <li>about</li>
          <li>security</li>
        </ul>
      </nav>
    </header>
  );
};

export default AuthHeader;
