import React from "react";
import { UtensilsIcon } from "lucide-react";
import { cn, getAmount } from "@/lib/utils";
import { TinkTransaction } from "@/types/tink";
import { Card, Typography } from "@/components/ui";
import { findCategoryById } from "@/actions/server/data/categories";

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
    <Card className="flex flex-row gap-x-7 gap-y-1.5 flex-wrap items-center justify-between">
      <Typography className=" font-semibold text-black  whitespace-nowrap">
        {dates.booked}
      </Typography>
      <Typography className="font-semibold min-w-28 text-center  whitespace-nowrap">
        {descriptions.original}
      </Typography>
      <Typography className="flex items-center gap-2 whitespace-nowrap">
        {/* TODO: Change the placeholder for real category */}
        {category?.data?.primaryName}
        Food & Drinks
        <UtensilsIcon className="size-4 text-gray-400" />
      </Typography>
      <Typography
        className={cn(
          "text-black font-bold text-xl text-end ml-auto whitespace-nowrap",
          positiveValue ? "text-green-700" : "text-red-700"
        )}
      >
        {positiveValue && "+"}
        {formatedValue} {currencyCode}
      </Typography>
    </Card>
  );
};

export default TransactionCard;
