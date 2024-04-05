import { Typography } from "@/components/ui";
import { cn } from "@/lib/utils";
import { TinkTransactions } from "@/types/tink";
import React from "react";
import TransactionCard from "./transaction-card";

type TransactionListProps = PropsWithClassName & TinkTransactions & {};

const TransactionList: React.FC<TransactionListProps> = ({
  className,
  transactions,
}) => {
  return (
    <section className={cn("list-col", className)}>
      {/* Accounts */}
      {transactions.length === 0 && (
        <Typography variant="lead" className="font-semibold">
          No accounts found
        </Typography>
      )}
      {transactions.map((acc, i) => (
        <TransactionCard key={i} {...acc} />
      ))}
    </section>
  );
};

export default TransactionList;