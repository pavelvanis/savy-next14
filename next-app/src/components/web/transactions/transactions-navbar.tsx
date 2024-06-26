import {
  cn,
  getBalance,
  getExpensesAmount,
  getFormatedDate,
  getIncomeAmount,
} from "@/lib/utils";
import React from "react";
import { ChevronRightIcon } from "lucide-react";
import { TinkTransaction } from "@/types/tink";
import { BalanceLine, BalanceText } from "../balance";
import {
  calculateIncreasePercentage,
  getMonthBalances,
  MonthBalances,
} from "@/lib/data-utils";
import {
  ReactTableButton,
  ReactTableHeader,
  ReactTableInput,
} from "@/components/react-table";
import { LinkButton, Typography } from "@/components/ui";

interface TransacationsMonthNavbarProps extends PropsWithClassName {
  transactions: TinkTransaction[];
  previousMonth?: TinkTransaction[];
}

export const TransacationsMonthNavbar: React.FC<
  TransacationsMonthNavbarProps
> = ({ transactions, className, previousMonth }) => {
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

interface TransactionsSortableNavbarProps {
  date: string;
}

// TODO: Change the date format for the clients locale
export const TransactionsSortableNavbar: React.FC<
  TransactionsSortableNavbarProps
> = ({ date }) => {
  const formatedDate = getFormatedDate(date);
  return (
    <ReactTableHeader>
      <Typography
        variant="h4"
        className="font-bold capitalize whitespace-nowrap mr-2 ms-1"
      >
        {formatedDate}
      </Typography>

      <LinkButton
        href={`/web/transactions/${date}`}
        buttonProps={{
          variant: "text",
          className:
            "bg-gray-300/30 hover:bg-gray-400/30 mr-4 px-2.5 py-1.5 flex-center gap-x-1 border-none ring-0",
        }}
      >
        <Typography className="text-xs font-medium">Details</Typography>
        <ChevronRightIcon className="size-4" />
      </LinkButton>
      <div className="flex flex-1 gap-x-2 ">
        <ReactTableInput
          column="description"
          label="Search by description..."
        />
        <ReactTableButton column="amount" label="Sort by amount" />
      </div>
    </ReactTableHeader>
  );
};
