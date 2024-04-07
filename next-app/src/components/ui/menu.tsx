"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

const MenuLinkItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> &
    React.ComponentPropsWithoutRef<typeof MenuItem>
>(({ className, ...props }, ref) => (
  <Link {...props} ref={ref} className="user-nav-link rounded-lg ">
    <MenuItem
      {...props}
      className={cn(
        "flex items-center justify-between hover:bg-inherit transition-all gap-x-2 group",
        className
      )}
    />
  </Link>
));

export { Menu, MenuHandler, MenuList, MenuItem, MenuLinkItem };
