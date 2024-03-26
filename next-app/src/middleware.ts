//export { default } from "next-auth/middleware";

import middleware, { NextRequestWithAuth } from "next-auth/middleware";
import { NEXTAUTH_ROUTES } from "./config/routes";

export default function customMiddleware(req: NextRequestWithAuth) {
  // Your custom middleware logic here
  console.log("Custom middleware!");

  const pathname = req.nextUrl.pathname;

  // If route is included in the secureRoute array, apply the Nextauth middleware
  if (NEXTAUTH_ROUTES.includes(pathname)) {
    return middleware(req);
  }
}
