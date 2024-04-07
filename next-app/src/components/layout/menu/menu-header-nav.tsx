import React from "react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/auth/logout-button";
import { headerNavLinks, userNavLinks } from "@/config/routes";
import { MenuItem, MenuLinkItem, Typography } from "@/components/ui";
import { BookOpenTextIcon, KeyRoundIcon, LogOutIcon } from "lucide-react";

type HeaderNavListProps = PropsWithClassName & {};

export const HeaderPublicMenuList: React.FC<HeaderNavListProps> = ({
  className,
}) => {
  return (
    <div className={cn(className)}>
      {headerNavLinks.map((link, i) => (
        <MenuLinkItem href={link.href} key={i}>
          <Typography className="whitespace-nowrap text-sm">
            {link.title}
          </Typography>
        </MenuLinkItem>
      ))}
      <hr className="my-1" />
    </div>
  );
};

export const HeaderUserMenuList: React.FC<
  HeaderNavListProps & { loginState: boolean }
> = ({ className, loginState }) => {
  if (loginState)
    return (
      <div className={cn(className)}>
        {userNavLinks.map((link, i) => (
          <MenuLinkItem href={link.href} key={i}>
            <Typography className="whitespace-nowrap font-normal">
              {link.title}
            </Typography>
            {link.icon && <link.icon className="menu-icon" />}
          </MenuLinkItem>
        ))}
        <hr className="my-1" />
      </div>
    );
};

export const HeaderAuthMenuList: React.FC<
  HeaderNavListProps & { loginState: boolean }
> = ({ className, loginState }) => {
  return (
    <div className={cn(className)}>
      {loginState ? <LogOut /> : <LoginRegister />}
    </div>
  );
};
const LogOut = () => (
  <LogoutButton>
    <MenuItem className=" bg-gradient-to-br from-white to-red-50 border border-red-50 ">
      <Typography className="whitespace-nowrap font-medium">Signout</Typography>
      <LogOutIcon className="menu-icon" />
    </MenuItem>
  </LogoutButton>
);

const LoginRegister = () => (
  <>
    <MenuLinkItem href="/login">
      <Typography className="whitespace-nowrap font-medium">Login</Typography>
      <KeyRoundIcon className="menu-icon" />
    </MenuLinkItem>
    <MenuLinkItem href="/register">
      <Typography className="whitespace-nowrap font-medium">
        Register
      </Typography>
      <BookOpenTextIcon className="menu-icon" />
    </MenuLinkItem>
  </>
);
