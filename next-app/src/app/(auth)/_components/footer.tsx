import React from "react";
import { cn } from "@/lib/utils";

const AuthFooter = ({ className }: PropsWithClassName) => {
  return (
    <footer className={cn("flex justify-between py-5 px-8", className)}>
      <div className="flex flex-col justify-between">
        <div>Min logo</div>
        <div className="font-light text-xs">Copyright © Pavel Vanis</div>
      </div>
      <div className="flex gap-10">
        <ul>
          <li>link</li>
          <li>link</li>
          <li>link</li>
          <li>link</li>
        </ul>
        <ul>
          <li>link</li>
          <li>link</li>
          <li>link</li>
          <li>link</li>
        </ul>
      </div>
    </footer>
  );
};

export default AuthFooter;
