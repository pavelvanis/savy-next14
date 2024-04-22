import React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui";

interface NoDataBoxProps extends React.ComponentProps<typeof Typography> {}

const NoDataBox: React.FC<NoDataBoxProps> = ({
  children,
  className,
  variant,
  ...props
}) => {
  return (
    <Typography
      variant={variant || "lead"}
      className={cn(
        "text-lg flex-center text-center py-10 px-16 font-medium rounded-lg border-2 border-dashed border-gray-500/50 text-gray-500",
        className
      )}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default NoDataBox;
