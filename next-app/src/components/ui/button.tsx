"use client";

import Link from "next/link";
import { Button, IconButton, ButtonGroup } from "@material-tailwind/react";
import { cn } from "@/lib/utils";

type LinkType = React.ComponentProps<typeof Link>;
type ButtonType = React.ComponentProps<typeof Button>;

interface LinkButtonProps extends LinkType, React.PropsWithChildren {
  buttonProps?: Omit<ButtonType, "children">;
  link?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  buttonProps = {},
  link = true,
  children,
  className,
  ...props
}) => {
  const { variant = "text", size = "sm", ...restButtonProps } = buttonProps;

  const button = (
    <Button
      variant={variant}
      className={cn(
        "text-black border border-black hover:ring-0 ring-1 ring-inset transition-all ring-black bg-gray-300/30 hover:bg-gray-200/50",
        buttonProps.className
      )}
      size={size}
      {...restButtonProps}
    >
      {children}
    </Button>
  );

  return link ? <Link {...props}>{button}</Link> : button;
};

LinkButton.displayName = "LinkButton";

export { Button, IconButton, ButtonGroup, LinkButton };

export { type ButtonProps } from "@material-tailwind/react";
