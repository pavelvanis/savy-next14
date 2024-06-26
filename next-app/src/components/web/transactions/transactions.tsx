import React from "react";
import { TinkTransactions } from "@/types/tink";
import { ReactTableBody } from "@/components/react-table";
import {
  TransacationsMonthNavbar,
  TransactionsSortableNavbar,
} from "./transactions-navbar";
import TransactionReactTable from "./transaction-table";
import { getCurrentMonth, getPreviousMonth } from "@/lib/data-utils";
import NoDataBox from "../no-data";

type TransactionListProps = PropsWithClassName &
  TinkTransactions & {
    date: string;
  };

const TransactionList: React.FC<TransactionListProps> = ({
  date,
  transactions,
}) => {
  if (transactions.length < 1) {
    return <NoDataBox>Not transactions to show</NoDataBox>;
  } else {
    const currentMonthTransactions = getCurrentMonth(date, transactions);
    const prevMonthTransactions = getPreviousMonth(date, transactions);

    return (
      <section>
        <TransactionReactTable transactions={currentMonthTransactions}>
          <TransactionsSortableNavbar date={date} />
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
