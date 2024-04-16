import { getBalance, getExpensesAmount, getIncomeAmount } from "@/lib/utils";
import React from "react";
import { TinkTransaction } from "@/types/tink";
import { BalanceText } from "../balance";

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
    <div className=" bg-gradient-to-br from-gray-300/30 to-gray-300/60 border-2 border-gray-400/30 rounded-lg p-2 mt-2 flex gap-2 flex-wrap">
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
