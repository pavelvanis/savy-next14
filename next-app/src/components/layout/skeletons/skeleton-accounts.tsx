import { Card, Typography } from "@/components/ui";

export const AccountSkeleton = () => {
  return (
    <Card className="max-w-full animate-pulse bg-gray-50 rounded-xl h-40 p-4 flex flex-col justify-between">
      {/* Top */}
      <div>
        {/* Description | Amount */}
        <div className="flex justify-between">
          {/* Description */}
          <div className="flex gap-x-10 mb-2">
            <Typography
              as="div"
              className="mb-1 h-4 w-40 rounded-lg bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              className="mb-1 h-4 w-20 rounded-lg bg-gray-300"
            >
              &nbsp;
            </Typography>
          </div>
          {/* Amount */}
          <div>
            <Typography
              as="div"
              className="mb-1 h-4 w-32 rounded-lg bg-gray-300"
            >
              &nbsp;
            </Typography>
          </div>
        </div>
        {/* Iban | Actions */}
        <div className="flex justify-between">
          {/* Iban */}
          <Typography as="div" className="mb-2 h-3 w-56 rounded-lg bg-gray-300">
            &nbsp;
          </Typography>
          {/* Actions */}
          <div className="flex gap-x-2">
            <Typography
              as="div"
              className="mb-2 h-5 w-7 rounded-lg bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              className="mb-2 h-5 w-7 rounded-lg bg-gray-300"
            >
              &nbsp;
            </Typography>
          </div>
        </div>
      </div>
      <hr className="bg-gray-300 h-[3px]" />
      {/* Bottom */}
      <div className="flex gap-x-10">
        {/* Buttons */}
        <Typography
          as="div"
          variant="paragraph"
          className=" h-8 w-32 rounded-lg bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className=" h-8 w-24 rounded-lg bg-gray-300"
        >
          &nbsp;
        </Typography>
      </div>
    </Card>
  );
};
