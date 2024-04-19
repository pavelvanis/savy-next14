# 🔐 Authentication

For handling of user session is used [NextAuth.js v5](https://next-auth.js.org). The configuration of NextAuth is in _**src/lib/auth.config.ts**_  file and the handlers are exported in  _**src/lib/auth.ts.**_

***

The session is redifiend to this declare module "next-auth" { interface Session { user: IUser; }

interface User extends IUser {} }
