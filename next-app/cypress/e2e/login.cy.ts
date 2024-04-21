describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  context("unsuccessful", () => {
    it("submit empty fields", () => {
      cy.getBySel("cypress-login-btn").click();

      cy.getBySel("cypress-login-email-error")
        .should("be.visible")
        .and("contain.text", "Email is required");
      cy.getBySel("cypress-login-password-error")
        .should("be.visible")
        .and("contain.text", "Password is too small");
    });
  });
});
