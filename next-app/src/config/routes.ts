import { NavLinkProps } from "@/components/navlink";
import { SettingsIcon, WalletIcon, ArrowRightLeftIcon } from "lucide-react";

/**
 * Routes which will be protected by auth middleware
 */
export const NEXTAUTH_ROUTES: string[] = ["/dashboard", "/admin", "/settings"];

/**
 * Default redirect after login
 */
export const DEFAULT_LOGIN_REDIRECT = "/web";

/**
 * The route for the home page
 */
export const HOME_ROUTE = "/web";

/**
 * Default redirect when user is not authorized
 */
export const DEFAULT_UNAUTHORIZED_REDIRECT = "/login";

/**
 * Links for haeder in auth layout
 */
export const authNavLinks: NavLinkProps[] = [
  { href: "/", title: "Home" },
  { href: "#", title: "Security" },
  { href: "#", title: "Services" },
  { href: "#", title: "Privacy" },
];

/**
 * Links for haeder in main layout
 */
export const headerNavLinks: NavLinkProps[] = [
  { href: "/", title: "Home" },
  { href: "#", title: "Integration" },
  { href: "#", title: "Security" },
  { href: "#", title: "Services" },
];

/**
 * Links for user navbar
 */
export const userNavLinks: NavLinkProps[] = [
  { href: "/web/accounts", title: "Accounts", icon: WalletIcon },
  {
    href: "/web/transactions",
    title: "Transactions",
    icon: ArrowRightLeftIcon,
  },
  { href: "/web/settings", title: "Settings", icon: SettingsIcon },
];

/**
 * Links for settings navbar
 * The arrays define groups which could be devide
 * @type {NavLinkProps[][]}
 */
export const settingsLinks: NavLinkProps[][] = [
  [
    {
      href: "/web/settings",
      title: "Account",
    },
    {
      href: "/web/settings/credentials",
      title: "Credentials",
    },
  ],
  [
    {
      href: "/web/settings/accounts",
      title: "Accounts",
    },
    {
      href: "/settings/transactions",
      title: "Transactions",
    },
  ],
];
