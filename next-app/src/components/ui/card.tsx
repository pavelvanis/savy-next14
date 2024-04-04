"use client";

import React from "react";
import { Card as MTCard } from "@material-tailwind/react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  React.ElementRef<typeof MTCard>,
  React.ComponentPropsWithoutRef<typeof MTCard>
>(({ className, ...props }, ref) => {
  return (
    <MTCard
      {...props}
      ref={ref}
      className={cn("p-5 border-[1.5px] border-gray-200", className)}
    />
  );
});

const CardHeader = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "px-1 pb-4 text-xl font-bold border-b-[1.5px] border-gray-200",
        className
      )}
    />
  );
});

const CardBody = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div {...props} ref={ref} className={cn("px-1 pt-4", className)} />;
});

const CardFooter = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div {...props} ref={ref} className={cn("px-1 pt-5", className)} />;
});

export { Card, CardHeader, CardBody, CardFooter };
