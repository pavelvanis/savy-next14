import React from "react";
import { cn } from "@/lib/utils";
import { headerNavLinks } from "@/config/routes";
import { List, Typography } from "@/components/ui";

type HeaderNavListProps = PropsWithClassName & {};

const HeaderNavList: React.FC<HeaderNavListProps> = ({ className }) => {
  return (
    <List className={cn("", className)}>
      {headerNavLinks.map((link, i) => (
        <Typography key={i} className="whitespace-nowrap">{link.title}</Typography>
      ))}
    </List>
  );
};

export default HeaderNavList;
