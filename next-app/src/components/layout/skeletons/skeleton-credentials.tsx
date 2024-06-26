import { Card, Typography } from "@/components/ui";

export const CredentialsSkeleton = () => {
  return (
    <Card className="p-3 skeleton-bg">
      <div className="flex items-center justify-between w-full mb-4 mt-1">
        {/* Title */}
        <Typography as="div" className=" h-4 w-52 skeleton">
          &nbsp;
        </Typography>
        {/* Last update */}
        <Typography as="div" className=" h-3.5 w-32 skeleton ">
          &nbsp;
        </Typography>
      </div>
      {/* Info */}
      <ul className=" space-y-2 ms-1">
        <li className=" h-3 w-52 skeleton">&nbsp;</li>
        <li className=" h-3 w-64 skeleton"> &nbsp;</li>
      </ul>
    </Card>
  );
};
