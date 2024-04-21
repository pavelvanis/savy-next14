import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    env: {
      user: {
        firstName: "John",
        lastName: "Doe",
        email: "test@test.com",
        password: "password",
        confirmPassword: "password",
      },
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
