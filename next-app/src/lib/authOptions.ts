import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = {
          id: "123",
          name: "John Smith",
          email: "john.smith@example.com",
        };
        return user;
      },
    }),
  ],
};

export default authOptions;
