import React from "react";
import { InfoIcon } from "lucide-react";
import { Tooltip, Typography } from "@/components/ui";

const HelpTooltip = React.forwardRef<
  React.ElementRef<typeof Tooltip>,
  React.ComponentPropsWithoutRef<typeof Tooltip>
>(({ content, ...props }, ref) => (
  <Tooltip
    className=" bg-transparent bg-gradient-to-br from-gray-200/30 via-gray-200/30 to-gray-400/50 border border-gray-300 text-black max-w-[220px]"
    {...props}
    content={<Typography className="text-sm">{content}</Typography>}
    ref={ref}
  >
    <InfoIcon className="size-5 text-gray-600/60" />
  </Tooltip>
));

export { HelpTooltip };
