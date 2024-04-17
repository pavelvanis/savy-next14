import React from "react";
import { Typography } from "@/components/ui";
import { TinkTransactions } from "@/types/tink";
import { ReactTableBody } from "@/components/react-table";
import SortableTransactionsHeader from "./transactions-sortable";
import TransacationsMonthNavbar from "./transactions-navbar";
import TransactionReactTable from "./transaction-table";
import { getCurrentMonth, getPreviousMonth } from "@/lib/data-utils";

type TransactionListProps = PropsWithClassName &
  TinkTransactions & {
    date: string;
  };

const TransactionList: React.FC<TransactionListProps> = ({
  date,
  transactions,
}) => {
  if (transactions.length < 1) {
    return (
      <Typography variant="lead" className="font-semibold">
        No transactions found
      </Typography>
    );
  } else {
    const currentMonthTransactions = getCurrentMonth(date, transactions);
    const prevMonthTransactions = getPreviousMonth(date, transactions);

    return (
      <section>
        <TransactionReactTable transactions={currentMonthTransactions}>
          <SortableTransactionsHeader date={date} />
          <TransacationsMonthNavbar
            transactions={currentMonthTransactions}
            previousMonth={prevMonthTransactions}
          />
          <ReactTableBody className="mt-3" />
        </TransactionReactTable>
      </section>
    );
  }
};

export default TransactionList;
