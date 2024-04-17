import React from "react";
import { cn, getFormatedAmount } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Typography } from "../ui";

interface BalanceTextProps extends PropsWithClassName {
  amount: number;
  currencyCode: string;
}

export const BalanceText: React.FC<BalanceTextProps> = ({
  amount,
  currencyCode,
  className,
}) => {
  const positive = amount > 0;
  const isZero = amount === 0;
  return (
    <Typography
      className={cn(
        "text-center font-semibold whitespace-nowrap",
        positive ? "text-green-800" : "text-red-800",
        isZero && "text-gray-600",
        className
      )}
    >
      {getFormatedAmount(amount, currencyCode)}
    </Typography>
  );
};

interface BalanceLineProps extends PropsWithClassName {
  amount: number;
}

export const BalanceLine: React.FC<BalanceLineProps> = ({ amount }) => {
  const isPositive = amount >= 0;
  return (
    <Typography
      as="span"
      className={cn(
        "font-normal flex-center gap-x-1",
        isPositive ? "text-green-800" : "text-red-800"
      )}
    >
      {isPositive ? (
        <TrendingUp className={cn("size-5")} strokeWidth={1.3} />
      ) : (
        <TrendingDown className={cn("size-5")} strokeWidth={1.3} />
      )}
      {amount}%
    </Typography>
  );
};
