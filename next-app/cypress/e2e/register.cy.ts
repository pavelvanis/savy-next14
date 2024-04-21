describe("Register", () => {
  beforeEach(() => {
    cy.visit("/register");
  });
  context("unsuccessful", () => {
    it("shows errors when fields are empty", () => {
      cy.get("[data-testid='cypress-register-email']").type("a@a.aa");
      cy.get("[data-testid='cypress-register-password']").type("password");
      cy.get("[data-testid='cypress-register-btn']").click();

      cy.get("[data-testid='cypress-register-firstName-error']").should(
        "be.visible"
      );
    });
  });
});
