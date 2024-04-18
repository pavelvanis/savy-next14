"use client";

import React from "react";
import { Typography as MTTypography } from "@material-tailwind/react";
import { cn } from "@/lib/utils";

const Typography = React.forwardRef<
  React.ElementRef<typeof MTTypography>,
  React.ComponentPropsWithoutRef<typeof MTTypography>
>(({ className, ...props }, ref) => {
  return (
    <MTTypography className={cn(" font-red", className)} {...props} ref={ref} />
  );
});

Typography.displayName = "Typography";

export { Typography };

export {
  type TypographyProps,
  type TypographyStylesType,
} from "@material-tailwind/react";
