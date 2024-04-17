import {
  cn,
  getBalance,
  getExpensesAmount,
  getIncomeAmount,
} from "@/lib/utils";
import React from "react";
import { TinkTransaction } from "@/types/tink";
import { BalanceLine, BalanceText } from "../balance";
import {
  calculateIncreasePercentage,
  getMonthBalances,
  MonthBalances,
} from "@/lib/data-utils";

interface TransacationsMonthNavbarProps extends PropsWithClassName {
  transactions: TinkTransaction[];
  previousMonth?: TinkTransaction[];
}

const TransacationsMonthNavbar: React.FC<TransacationsMonthNavbarProps> = ({
  transactions,
  className,
  previousMonth,
}) => {
  const currentBalances = getMonthBalances(transactions);
  const previousBalances = getMonthBalances(previousMonth || []);

  const percentageBalances: MonthBalances | undefined = previousBalances
    ? {
        income: calculateIncreasePercentage(
          previousBalances.income,
          currentBalances.income
        ),
        expenses: calculateIncreasePercentage(
          previousBalances.expenses,
          currentBalances.expenses
        ),
        balance: calculateIncreasePercentage(
          previousBalances.income,
          currentBalances.income
        ),
      }
    : undefined;

  const currencyCode = transactions[0].amount.currencyCode;

  return (
    <div
      className={cn(
        " bg-gradient-to-br from-gray-300/30 to-gray-300/60 border-2 border-gray-400/30 rounded-lg p-2 mt-2 flex gap-2 flex-wrap",
        className
      )}
    >
      <div className=" flex-1 flex-center gap-x-2 text-center">
        Income:{" "}
        <BalanceText
          amount={getIncomeAmount(transactions)}
          currencyCode={currencyCode}
        />
        {percentageBalances && (
          <BalanceLine amount={percentageBalances.income} />
        )}
      </div>
      <div className=" flex-1 flex-center gap-x-2 text-center">
        Expenses:{" "}
        <BalanceText
          amount={getExpensesAmount(transactions)}
          currencyCode={currencyCode}
        />
        {percentageBalances && (
          <BalanceLine amount={percentageBalances.expenses} />
        )}
      </div>
      <div className=" flex-1 flex-center gap-x-2 text-center">
        Balance:{" "}
        <BalanceText
          amount={getBalance(transactions)}
          currencyCode={currencyCode}
        />
      </div>
    </div>
  );
};

export default TransacationsMonthNavbar;
