import { TinkTransaction, TinkTransactions } from "@/types/tink";
import TransactionCard from "@/components/web/transactions/transaction-card";
import { TestWrapper } from "../test-wrapper";
import TransactionList from "@/components/web/transactions/transactions";
import { groupByMonth } from "@/lib/utils";

describe("Transactions", () => {
  let transactions: TinkTransactions;

  // Load transactions fixture
  before(() => {
    cy.fixture("transactions.json").then(({ ...loaded }: TinkTransactions) => {
      transactions = loaded;
    });
  });

  // Only card rendering is tested here
  it("Transaction card rendering", () => {
    transactions.transactions.forEach((transaction: TinkTransaction) => {
      cy.mount(
        <TestWrapper>
          <TransactionCard {...transaction} />
        </TestWrapper>
      );
    });
  });

  // All card in react-table sortable list rendering is tested here
  it("Transactions sortable list rendering", () => {
    const transactionsByMonth = groupByMonth(transactions.transactions);
    cy.mount(
      <TestWrapper>
        {Object.entries(transactionsByMonth).map(([date]) => (
          <TransactionList key={date} {...transactions} date={date} />
        ))}
      </TestWrapper>
    );
  });
});
