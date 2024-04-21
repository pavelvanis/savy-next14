import { TinkAccount, TinkAccounts } from "@/types/tink";
import AccountCard from "@/components/web/accounts/account-card";
import AccountsList from "@/components/web/accounts/accounts";
import { TestWrapper } from "../test-wrapper";

describe("Accounts", () => {
  // Only card rendering is tested here
  it("Accounts card rendering", () => {
    cy.fixture("accounts.json").then(({ accounts }: TinkAccounts) => {
      accounts.forEach((account: TinkAccount) => {
        cy.mount(
          <TestWrapper>
            <AccountCard {...account} />
          </TestWrapper>
        );
      });
    });
  });

  // All card in react-table sortable list rendering is tested here
  it("Accounts sortable list rendering", () => {
    cy.fixture("accounts.json").then((accounts: TinkAccounts) => {
      cy.mount(
        <TestWrapper>
          <AccountsList {...accounts} />
        </TestWrapper>
      );
    });
  });
});
