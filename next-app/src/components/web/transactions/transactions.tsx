"use client";

import React from "react";
import { getAmount } from "@/lib/utils";
import { Typography } from "@/components/ui";
import { TinkTransaction, TinkTransactions } from "@/types/tink";
import { ReactTable, ReactTableBody } from "@/components/react-table";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SortableTransactionsHeader from "./transactions-sortable";
import TransactionCard from "./transaction-card";

type TransactionListProps = PropsWithClassName &
  TinkTransactions & {
    date: string;
  };

const transactionColumns: ColumnDef<TinkTransaction>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "date",
    accessorFn: (data) => data.dates.booked,
  },
  {
    accessorKey: "amount",
    accessorFn: (data) =>
      getAmount(data.amount.value.scale, data.amount.value.unscaledValue),
  },
  {
    accessorKey: "status",
    accessorFn: (data) => data.status,
  },
  {
    accessorKey: "description",
    accessorFn: (data) => data.descriptions.display,
  },
  {
    accessorKey: "currencyCode",
    accessorFn: (data) => data.amount.currencyCode,
  },
  {
    accessorKey: "accountId",
    accessorFn: (data) => data.accountId,
  },
];

const TransactionList: React.FC<TransactionListProps> = ({
  date,
  transactions,
}) => {
  const table = useReactTable({
    data: transactions,
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (transactions.length < 1) {
    return (
      <Typography variant="lead" className="font-semibold">
        No accounts found
      </Typography>
    );
  } else {
    return (
      <section>
        <ReactTable Component={TransactionCard} table={table}>
          <SortableTransactionsHeader date={date} />
          <ReactTableBody className="mt-3" />
        </ReactTable>
      </section>
    );
  }
};

export default TransactionList;
