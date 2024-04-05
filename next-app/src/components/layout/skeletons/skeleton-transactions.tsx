import { Typography } from "@/components/ui";

export const TransactionSkeleton = () => {
  return (
    <div className="max-w-full animate-pulse flex justify-between bg-gray-50 rounded-lg p-4">
      <div className="flex items-center flex-row gap-x-7">
        {/* Date */}
        <div className="flex-none min-w-28">
          <Typography className="h-4 w-24 skeleton">&nbsp;</Typography>
        </div>
        {/* Details */}
        <div className="flex items-center gap-x-10 justify-center">
          <Typography className="h-3 w-24 skeleton">&nbsp;</Typography>
          <Typography className="h-3 w-32 skeleton">&nbsp;</Typography>
        </div>
      </div>
      {/* Amount */}
      <div className="">
        <Typography className="h-5 w-32 skeleton">&nbsp;</Typography>
      </div>
    </div>
  );
};
