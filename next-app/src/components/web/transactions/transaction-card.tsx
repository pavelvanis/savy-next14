import { Card, Typography } from "@/components/ui";
import { getAmount } from "@/lib/utils";
import { TinkTransaction } from "@/types/tink";
import { UtensilsIcon } from "lucide-react";
import React from "react";

type TransactionCardProps = PropsWithClassName & TinkTransaction & {};

const TransactionCard: React.FC<TransactionCardProps> = ({
  descriptions,
  dates,
  amount: { value, currencyCode },
}) => {
  return (
    <Card className="flex flex-row gap-x-7">
      <div className="flex-none min-w-24">
        <Typography className=" font-semibold text-black">
          {dates.booked}
        </Typography>
      </div>
      <div className="flex gap-x-5 justify-center">
        <Typography className="font-semibold min-w-28 text-center">
          {descriptions.original}
        </Typography>
        <Typography className="flex items-center gap-2">
          Food & Drinks
          <UtensilsIcon className="size-4 text-gray-500" />
        </Typography>
      </div>
      <div className="flex-1">
        <Typography className="text-black font-bold text-xl text-end">
          {getAmount(value.scale, value.unscaledValue)} {currencyCode}
        </Typography>
      </div>
    </Card>
  );
};

export default TransactionCard;
