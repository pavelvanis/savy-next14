import React from "react";
import { AlignRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Menu, MenuHandler, IconButton, MenuList } from "@/components/ui";

type Hidden = "sm" | "md" | "lg" | "xl" | "2xl";

type HeaderMenuProps = PropsWithClassName &
  React.PropsWithChildren & {
    loginState: boolean;
    hidden?: Hidden;
  };

export const HeaderMenu: React.FC<HeaderMenuProps> = ({
  className,
  children,
  hidden = "md",
}) => {
  return (
    <Menu allowHover>
      <MenuHandler>
        <IconButton
          variant="text"
          className={cn(
            "user-nav-link max-w-8 max-h-8 ",
            `${hidden}:hidden`,
            className
          )}
        >
          <AlignRightIcon className="icon" />
        </IconButton>
      </MenuHandler>
      <MenuList className={cn(className)}>{children}</MenuList>
    </Menu>
  );
};
