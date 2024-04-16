import React from "react";
import { Typography } from "../ui";
import { cn, getFormatedAmount } from "@/lib/utils";

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
  return (
    <Typography
      className={cn(
        "text-center font-normal whitespace-nowrap",
        positive ? "text-green-800" : "text-red-800",
        className
      )}
    >
      {getFormatedAmount(amount, currencyCode)}
    </Typography>
  );
};
