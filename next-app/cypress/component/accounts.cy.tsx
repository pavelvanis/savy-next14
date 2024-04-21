import "@/styles/globals.css";

import { TinkAccount } from "@/types/tink";
import AccountCard from "@/components/web/accounts/account-card";

describe("Accounts", () => {
  it("Accounts card rendering", () => {
    cy.fixture("accounts.json").then((accounts) => {
      accounts.forEach((account: TinkAccount) => {
        cy.mount(<AccountCard {...account} />);
      });
    });
  });
});
