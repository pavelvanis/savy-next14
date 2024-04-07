import React from "react";
import {
  Menu,
  MenuHandler,
  IconButton,
  MenuList,
  Typography,
  MenuLinkItem,
} from "@/components/ui";
import {
  AlignRightIcon,
  BookOpenTextIcon,
  KeyRoundIcon,
  LogOutIcon,
} from "lucide-react";
import { headerNavLinks, userNavLinks } from "@/config/routes";

type HeaderMenuProps = PropsWithClassName & {
  loginState: boolean;
};

export const HeaderMenu: React.FC<HeaderMenuProps> = ({
  className,
  loginState,
}) => {
  return (
    <Menu allowHover>
      <MenuHandler>
        <IconButton
          variant="text"
          className="user-nav-link max-w-8 max-h-8 md:hidden "
        >
          <AlignRightIcon className="icon" />
        </IconButton>
      </MenuHandler>
      <MenuList className={className}>
        {headerNavLinks.map((link, i) => (
          <MenuLinkItem href={link.href} key={link.title}>
            <Typography className="whitespace-nowrap text-sm">
              {link.title}
            </Typography>
          </MenuLinkItem>
        ))}
        <div className="sm:hidden active:select-none focus:outline-none ">
          <hr className=" my-1" />
          {userNavLinks.map((link, i) => (
            <MenuLinkItem href={link.href} key={link.title}>
              <Typography className="whitespace-nowrap font-normal">
                {link.title}
              </Typography>
              {link.icon && <link.icon className="menu-icon" />}
            </MenuLinkItem>
          ))}
        </div>
        <hr className=" my-1" />
        {loginState ? <LogOut /> : <LoginRegister />}
      </MenuList>
    </Menu>
  );
};

const LogOut = () => (
  <MenuLinkItem
    href="/logout"
    className=" bg-gradient-to-br from-white to-red-50 border border-red-50 "
  >
    <Typography className="whitespace-nowrap font-normal">Signout</Typography>
    <LogOutIcon className="menu-icon" />
  </MenuLinkItem>
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
