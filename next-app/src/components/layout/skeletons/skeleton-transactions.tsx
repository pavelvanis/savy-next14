import { Card, Typography } from "@/components/ui";

export const TransactionSkeleton = () => {
  return (
    <Card className="flex flex-row gap-x-7 gap-y-2.5 flex-wrap justify-between items-center skeleton-bg">
      {/* Date */}
      <Typography className="h-3.5 max-w-24 skeleton">&nbsp;</Typography>
      {/* Name */}
      <Typography className="h-3 max-w-24 skeleton">&nbsp;</Typography>
      {/* Type */}
      <Typography className="h-3 max-w-32 skeleton">&nbsp;</Typography>
      {/* Amount */}
      <Typography className="h-5 max-w-32 skeleton">&nbsp;</Typography>
    </Card>
  );
};
