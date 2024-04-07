import React from "react";
import { cn } from "@/lib/utils";
import { List } from "@/components/ui";
import { NavLink } from "@/components/navlink";
import { headerNavLinks } from "@/config/routes";

type HeaderNavListProps = PropsWithClassName & {};

export const HeaderPublicNavList: React.FC<HeaderNavListProps> = ({
  className,
}) => {
  return (
    <List className={cn("gap-x-4", className)}>
      {headerNavLinks.map((link, i) => (
        <NavLink {...link} />
      ))}
    </List>
  );
};

export const HeaderAuthNavList: React.FC<HeaderNavListProps> = ({
  className,
}) => {
  return (
    <List className={cn("gap-x-4", className)}>
      {headerNavLinks.map((link, i) => (
        <NavLink {...link} />
      ))}
    </List>
  );
};

