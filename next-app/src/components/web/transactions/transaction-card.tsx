import { findCategoryById } from "@/actions/server/data/categories";
import { Card, Typography } from "@/components/ui";
import { cn, getAmount } from "@/lib/utils";
import { TinkTransaction } from "@/types/tink";
import { UtensilsIcon } from "lucide-react";
import React from "react";

type TransactionCardProps = PropsWithClassName & TinkTransaction & {};

const TransactionCard: React.FC<TransactionCardProps> = async ({
  descriptions,
  categories,
  dates,
  amount: { value, currencyCode },
}) => {
  const formatedValue = getAmount(value.scale, value.unscaledValue);
  const positiveValue = parseFloat(formatedValue) > 0;

  const category = await findCategoryById(categories?.pfm.id);

  return (
    <Card className="flex flex-row gap-x-7">
      <div className="flex-none min-w-24">
        <Typography className=" font-semibold text-black">
          {dates.booked}
        </Typography>
      </div>
      <div className="flex gap-x-6 justify-center">
        <Typography className="font-semibold min-w-28 text-center">
          {descriptions.original}
        </Typography>
        <Typography className="flex items-center gap-2">
          {/* TODO: Change the placeholder for real category */}
          {category?.data?.primaryName}
          Food & Drinks
          <UtensilsIcon className="size-4 text-gray-400" />
        </Typography>
      </div>
      <div className="flex-1">
        <Typography
          className={cn(
            "text-black font-bold text-xl text-end",
            positiveValue ? "text-green-700" : "text-red-700"
          )}
        >
          {positiveValue && "+"}
          {formatedValue} {currencyCode}
        </Typography>
      </div>
    </Card>
  );
};

export default TransactionCard;
