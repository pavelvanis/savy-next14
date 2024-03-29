import { NavLinkProps } from "@/components/navlink";

// Routes will be inserted into the NextAuth middleware
export const NEXTAUTH_ROUTES: string[] = ["/dashboard", "/admin", "/settings"];

// Default redirect after login
export const DEFAULT_LOGIN_REDIRECT = "/web";

// Default redirect when user is not authorized
export const DEFAULT_UNAUTHORIZED_REDIRECT = "/";

// Links for haeder in auth layout
export const authNavLinks: NavLinkProps[] = [
  { href: "/", title: "Home" },
  { href: "#", title: "Security" },
  { href: "#", title: "Services" },
  { href: "#", title: "Privacy" },
];

// Links for haeder in public layout
export const mainNavLinks: NavLinkProps[] = [
  { href: "/", title: "Home" },
  { href: "", title: "Integration" },
  { href: "/security", title: "Security" },
  { href: "#", title: "Services" },
];

// Links for haeder in web layout
export const webNavLinks: NavLinkProps[] = [
  { href: "/web", title: "Balances" },
  { href: "#", title: "Transactions" },
  { href: "#", title: "Cards" },
];
