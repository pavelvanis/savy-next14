"use client";

import Link from "next/link";
import { Button, IconButton, ButtonGroup } from "@material-tailwind/react";

type LinkType = React.ComponentProps<typeof Link>;
type ButtonType = React.ComponentProps<typeof Button>;

interface LinkButtonProps extends LinkType, React.PropsWithChildren {
  buttonProps?: Omit<ButtonType, "children">;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  buttonProps,
  children,
  ...props
}) => (
  <Link {...props}>
    <Button {...buttonProps}>{children}</Button>
  </Link>
);

export { Button, IconButton, ButtonGroup, LinkButton };

export { type ButtonProps } from "@material-tailwind/react";
