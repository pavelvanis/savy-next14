"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui";
import { LucideIcon } from "lucide-react";

export type NavLinkProps = PropsWithClassName & {
  href: string;
  title: string;
  icon?: LucideIcon;
};

export const NavLink = ({ title, className, ...props }: NavLinkProps) => {
  const pathname = usePathname();
  const active = pathname === props.href;
  return (
    <Typography
      className={cn(
        "hover:font-semibold transition-all w-20 text-center",
        active && "font-semibold",
        className
      )}
      as={Link}
      {...props}
    >
      {title}
    </Typography>
  );
};
