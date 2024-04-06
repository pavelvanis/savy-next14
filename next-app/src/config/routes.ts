import { NavLinkProps } from "@/components/navlink";

// Routes will be inserted into the NextAuth middleware
export const NEXTAUTH_ROUTES: string[] = ["/dashboard", "/admin", "/settings"];

// Default redirect after login
export const DEFAULT_LOGIN_REDIRECT = "/web";

// Default redirect when user is not authorized
export const DEFAULT_UNAUTHORIZED_REDIRECT = "/";

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
export const mainNavLinks: NavLinkProps[] = [
  { href: "/", title: "Home" },
  { href: "", title: "Integration" },
  { href: "/security", title: "Security" },
  { href: "#", title: "Services" },
];

/**
 * Links for haeder in web layout
 */
export const webNavLinks: NavLinkProps[] = [
  { href: "/web", title: "Balances" },
  { href: "#", title: "Transactions" },
  { href: "#", title: "Cards" },
];

/**
 * Links for user navbar
 */
export const userNavLinks: NavLinkProps[] = [
  { href: "/web", title: "Home" },
  { href: "/web/accounts", title: "Accounts" },
  { href: "/web/transactions", title: "Transactions" },
  { href: "/web/settings", title: "Settings" },
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
