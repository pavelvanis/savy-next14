"use client";
import React from "react";
import {
  IconButton,
  IconButton as MTIconButton,
} from "@material-tailwind/react";
import { cn } from "@/lib/utils";

const Action = React.forwardRef<
  React.ElementRef<typeof MTIconButton>,
  React.ComponentPropsWithoutRef<typeof MTIconButton>
>(({ className, variant, ...props }, ref) => {
  return (
    <IconButton
      ref={ref}
      {...props}
      variant={variant || "outlined"}
      className={cn(
        " h-7 w-7 border-2 border-gray-700 hover:bg-gray-200 transition-all ",
        className
      )}
    />
  );
});

Action.displayName = "Action";

export { Action };
