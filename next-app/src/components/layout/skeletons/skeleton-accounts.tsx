import { Card, CardHeader, CardBody, Typography } from "@/components/ui";

export const AccountSkeleton = () => {
  return (
    <Card className="skeleton-bg">
      {/* Header */}
      <CardHeader className="flex flex-col gap-y-3">
        {/* Top */}
        <div className="flex justify-between items-center gap-y-1.5 gap-x-3 flex-wrap">
          {/* Description */}
          <div className="flex items-center gap-x-4">
            <Typography as="div" className=" h-3 min-w-28 skeleton">
              &nbsp;
            </Typography>
            <Typography
              as="div"
              className=" h-3 min-w-20 hidden sm:block skeleton"
            >
              &nbsp;
            </Typography>
          </div>
          {/* Amount */}
          <Typography as="div" className=" h-4 max-w-24 skeleton">
            &nbsp;
          </Typography>
        </div>
        {/* Bottom */}
        <div className="flex justify-between items-center gap-y-1.5 gap-x-4 flex-wrap">
          <Typography as="div" className=" h-3 max-w-40 skeleton">
            &nbsp;
          </Typography>
          <div className="flex gap-x-2">
            <Typography as="div" className=" h-5 min-w-5 skeleton">
              &nbsp;
            </Typography>
            <Typography as="div" className=" h-5 min-w-5 skeleton">
              &nbsp;
            </Typography>
          </div>
        </div>
      </CardHeader>
      {/* Body */}
      <CardBody className="flex flex-wrap gap-x-3 gap-y-1">
        <Typography as="div" className=" h-8 max-w-32 skeleton">
          &nbsp;
        </Typography>
        <Typography as="div" className=" h-8 max-w-24 skeleton">
          &nbsp;
        </Typography>
      </CardBody>
    </Card>
  );
};