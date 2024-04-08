import React from "react";
import { EllipsisIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { settingsLinks } from "@/config/routes";
import { MenuLinkItem, Typography } from "@/components/ui";
import { Menu, MenuHandler, IconButton, MenuList } from "@/components/ui";

type HeaderNavListProps = PropsWithClassName & {};

const SettingsMenuList: React.FC<HeaderNavListProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      {settingsLinks.map((list, i) => (
        <>
          {list.map(({ ...props }, j) => (
            <MenuLinkItem key={j} href={props.href}>
              <Typography className="whitespace-nowrap text-sm">
                {props.title}
              </Typography>
            </MenuLinkItem>
          ))}
          {settingsLinks.length - 1 !== i && <hr className="my-1" />}
        </>
      ))}
    </div>
  );
};

type HeaderMenuProps = PropsWithClassName & React.PropsWithChildren & {};

export const SettingsMenu: React.FC<HeaderMenuProps> = ({ className }) => {
  return (
    <Menu allowHover>
      <MenuHandler>
        <IconButton
          variant="text"
          className={cn("user-nav-link max-w-8 max-h-8 ", className)}
        >
          <EllipsisIcon className="icon" />
        </IconButton>
      </MenuHandler>
      <MenuList className={cn(className)}>
        <SettingsMenuList />
      </MenuList>
    </Menu>
  );
};
