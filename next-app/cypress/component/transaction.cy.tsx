import "@/styles/globals.css";

import { TinkTransaction } from "@/types/tink";
import TransactionCard from "@/components/web/transactions/transaction-card";

describe("Transactions", () => {
  it("Transaction card rendering", () => {
    cy.fixture("transactions.json").then((transactions) => {
      transactions.forEach((transaction: TinkTransaction) => {
        cy.mount(<TransactionCard {...transaction} />);
      });
    });
  });
});
