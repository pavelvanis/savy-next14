import { Typography } from "@/components/ui";
import { cn, getAmount } from "@/lib/utils";
import { TinkTransaction, TinkTransactions } from "@/types/tink";
import React from "react";

interface TransacationsMonthNavbarProps extends PropsWithClassName {
  date: string;
  transactions: TinkTransaction[];
}

const TransacationsMonthNavbar: React.FC<TransacationsMonthNavbarProps> = ({
  date,
  transactions,
  className,
}) => {
  const currencyCode = transactions[0].amount.currencyCode;
  return (
    <div className="bg-gray-300/40 border-2 border-gray-400/40 rounded-lg p-2 mt-2 flex gap-2 flex-wrap">
      <div className=" flex-1 flex-center gap-x-2 text-center">
        Income:{" "}
        <BalanceText
          amount={getIncomeAmount(transactions)}
          currencyCode={currencyCode}
        />
      </div>
      <div className=" flex-1 flex-center gap-x-2 text-center">
        Expenses:{" "}
        <BalanceText
          amount={getExpensesAmount(transactions)}
          currencyCode={currencyCode}
        />
      </div>
      <div className=" flex-1 flex-center gap-x-2 text-center">
        Bilance:{" "}
        <BalanceText
          amount={getBilance(transactions)}
          currencyCode={currencyCode}
        />
      </div>
    </div>
  );
};

export default TransacationsMonthNavbar;

const BalanceText: React.FC<{ amount: number; currencyCode: string }> = ({
  amount,
  currencyCode,
}) => {
  const positive = amount > 0;
  return (
    <Typography
      className={cn(
        "text-center font-normal whitespace-nowrap",
        positive ? "text-green-800" : "text-red-800"
      )}
    >
      {getFormatedAmount(amount, currencyCode)}
    </Typography>
  );
};

const getIncomeAmount = (transactions: TinkTransaction[]): number => {
  return transactions
    .filter((transaction) => {
      const amount = getAmount(
        transaction.amount.value.scale,
        transaction.amount.value.unscaledValue
      );
      return amount > 0;
    })
    .reduce((acc, transaction) => {
      return (
        acc +
        getAmount(
          transaction.amount.value.scale,
          transaction.amount.value.unscaledValue
        )
      );
    }, 0);
};

const getExpensesAmount = (transactions: TinkTransaction[]): number => {
  return transactions
    .filter((transaction) => {
      const amount = getAmount(
        transaction.amount.value.scale,
        transaction.amount.value.unscaledValue
      );
      return amount < 0;
    })
    .reduce((acc, transaction) => {
      return (
        acc +
        getAmount(
          transaction.amount.value.scale,
          transaction.amount.value.unscaledValue
        )
      );
    }, 0);
};

const getBilance = (transactions: TinkTransaction[]): number => {
  return transactions.reduce((acc, transaction) => {
    return (
      acc +
      getAmount(
        transaction.amount.value.scale,
        transaction.amount.value.unscaledValue
      )
    );
  }, 0);
};

const getFormatedAmount = (amount: number, currencyCode: string): string => {
  const positive = amount > 0 ? "+" : "";
  return (
    positive +
    amount.toLocaleString("en-US").replace(/,/g, " ") +
    " " +
    currencyCode
  );
};
