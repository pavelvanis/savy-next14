describe("User is not sign in", () => {
  context("Home page", () => {
    beforeEach(() => {
      cy.clearAuth();
      cy.visit("/");
    });
    // Login
    it("should navigate to the login page", () => {
      cy.get('a[href*="login"]').click();

      cy.url().should("include", "/login");
    });
    // Register
    it("should navigate to the register page", () => {
      cy.get('a[href*="register"]').click();

      cy.url().should("include", "/register");
    });
    // Redirection (unauthorized)
    it("redirected into login when user is not authenticated", () => {
      cy.visit("/web");
      cy.url().should("include", "/login");
    });
  });
});
