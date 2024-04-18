"use client";

import React from "react";
import {
  List as MTList,
  ListItem as MTListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";
import { cn } from "@/lib/utils";

const List = React.forwardRef<
  React.ElementRef<typeof MTList>,
  React.ComponentPropsWithoutRef<typeof MTList>
>(({ className, ...props }, ref) => (
  <MTList {...props} ref={ref} className={cn("", className)} />
));

List.displayName = "List";

const ListItem = React.forwardRef<
  React.ElementRef<typeof MTListItem>,
  React.ComponentPropsWithoutRef<typeof MTListItem>
>(({ className, ...props }, ref) => (
  <MTListItem {...props} ref={ref} className={cn("", className)} />
));

ListItem.displayName = "ListItem";

const ListDivider = React.forwardRef<
  React.ElementRef<"hr">,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr {...props} ref={ref} className={cn("my-1", className)} />
));

ListDivider.displayName = "ListDivider";

export { List, ListItem, ListDivider, ListItemPrefix, ListItemSuffix };
