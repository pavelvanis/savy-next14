"use client";

import React from "react";
import { Card as MTCard } from "@material-tailwind/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type CardProps = React.ComponentPropsWithoutRef<typeof MTCard> &
  ({ asLink?: false; href?: never } | { asLink: true; href: string });

const Card = React.forwardRef<React.ElementRef<typeof MTCard>, CardProps>(
  ({ className, asLink, href, ...props }, ref) => {
    if (asLink) {
      return (
        <Link href={href}>
          <MTCard
            {...props}
            ref={ref}
            className={cn("p-5 border-[1.5px] border-gray-200", className)}
          />
        </Link>
      );
    }
    return (
      <MTCard
        {...props}
        ref={ref}
        className={cn("p-5 border-[1.5px] border-gray-200", className)}
      />
    );
  }
);

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
