import React from "react";
import { BarChart3Icon, FileBarChart2Icon } from "lucide-react";
import { Action } from "@/components";
import { cn, getAmount } from "@/lib/utils";
import { TinkAccount } from "@/types/types";
import { Typography, Chip, CardHeader } from "@/components/ui";

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
    <CardHeader className={cn("flex flex-col gap-y-3", className)}>
      {/* Top */}
      <div className="flex justify-between gap-y-1 gap-x-3 flex-wrap">
        <div className="flex gap-x-4">
          <Typography className=" text-lg font-bold">{name}</Typography>
          <Chip
            variant="ghost"
            className=" font-medium hidden sm:block "
            value={type}
          />
        </div>
        <Typography className="text-black font-bold text-xl">
          {getAmount(scale, unscaledValue)} {currencyCode}
        </Typography>
      </div>
      {/* bottom */}
      <div className="flex justify-between items-center gap-y-1 flex-wrap">
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
