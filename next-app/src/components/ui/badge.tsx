"use client";

import React from "react";
import { Badge as MTBadge } from "@material-tailwind/react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  React.ElementRef<typeof MTBadge>,
  React.ComponentPropsWithoutRef<typeof MTBadge>
>(({ className, ...props }, ref) => (
  <MTBadge {...props} ref={ref} className={cn(" min-w-5 min-h-5 ", className)} />
));

export { Badge };
