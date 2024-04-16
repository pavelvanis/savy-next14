import React from "react";
import { Typography } from "@/components/ui";
import { TinkTransactions } from "@/types/tink";
import { ReactTableBody } from "@/components/react-table";
import SortableTransactionsHeader from "./transactions-sortable";
import TransacationsMonthNavbar from "./transactions-navbar";
import TransactionReactTable from "./transaction-table";

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
    return (
      <section>
        <TransactionReactTable transactions={transactions}>
          <SortableTransactionsHeader date={date} />
          <TransacationsMonthNavbar transactions={transactions} />
          <ReactTableBody className="mt-3" />
        </TransactionReactTable>
      </section>
    );
  }
};

export default TransactionList;
