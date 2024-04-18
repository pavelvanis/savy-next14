"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type CustomLinkProps = React.ComponentProps<typeof Link> &
  PropsWithClassName & {
    onActive: string;
  };

/**
 * **onActive** is property which is added to className when the link is active
 */
const CustomLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  CustomLinkProps
>(({ onActive, className, ...props }, ref) => {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link
      ref={ref}
      className={cn(className, isActive ? onActive : "")}
      {...props}
    />
  );
});

CustomLink.displayName = "CustomLink";

export default CustomLink;
