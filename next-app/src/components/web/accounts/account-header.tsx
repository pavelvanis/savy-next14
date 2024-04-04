import React from "react";
import { BarChart3Icon, FileBarChart2Icon } from "lucide-react";
import { Typography, Chip, CardHeader } from "@/components/ui";
import { cn, getAmount } from "@/lib/utils";
import { TinkAccount } from "@/types/types";
import { Action } from "@/components";

type AccountHeaderProps = TinkAccount & PropsWithClassName & {};

const AccountHeader: React.FC<AccountHeaderProps> = ({
  name,
  identifiers,
  balances,
  type,
  className,
  ...props
}) => {
  const { value, currencyCode } = balances.booked.amount;
  const { scale, unscaledValue } = value;
  const { iban } = identifiers.iban;
  return (
    <CardHeader className={cn("flex flex-col gap-y-1.5", className)}>
      {/* Top */}
      <div className="flex justify-between">
        <div className="flex gap-x-8">
          <Typography className=" text-lg font-bold">{name}</Typography>
          <Chip
            variant="ghost"
            className=" font-medium "
            value={type}
          />
        </div>
        <Typography className="text-black font-bold text-xl">
          {getAmount(scale, unscaledValue)} {currencyCode}
        </Typography>
      </div>
      {/* bottom */}
      <div className="flex justify-between">
        <Typography className=" font-semibold">{iban}</Typography>
        {/* Actions */}
        <div className="flex gap-x-2">
          <Action>
            <FileBarChart2Icon className="p-0.5" />
          </Action>
          <Action>
            <BarChart3Icon className="p-0.5" />
          </Action>
        </div>
      </div>
    </CardHeader>
  );
};

export default AccountHeader;
