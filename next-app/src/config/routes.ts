import { NavLinkProps } from "@/components/navlink";

// Routes will be inserted into the NextAuth middleware
export const NEXTAUTH_ROUTES: string[] = ["/dashboard", "/admin", "/settings"];

// Default redirect after login
export const DEFAULT_LOGIN_REDIRECT = "/";

// Links for haeder in auth layout
export const authNavLinks: NavLinkProps[] = [
  { href: "/", title: "Home" },
  { href: "#", title: "Security" },
  { href: "#", title: "Privacy" },
];

// Links for haeder in auth layout
export const mainNavLinks: NavLinkProps[] = [
  { href: "/", title: "Integration" },
  { href: "#", title: "Security" },
  { href: "", title: "Services" },
];
