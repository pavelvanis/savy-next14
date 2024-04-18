import React from "react";
import { cn } from "@/lib/utils";
import {
  Button,
  ButtonProps,
  LinkButton,
  Typography,
  TypographyProps,
} from "@/components/ui";
import { LucideIcon, MoveLeftIcon } from "lucide-react";
import Link from "next/link";

/**
 * Props for the components.
 * Extends from React.PropsWithChildren and PropsWithClassName for additional React and CSS functionality.
 */
interface ComponentProps
  extends React.PropsWithChildren<any>,
    PropsWithClassName {}

/**
 * Higher-order function to create a component with a specified tag and default class name.
 * @param {React.ElementType} Tag - The HTML tag or React component to render.
 * @param {string} defaultClassName - The default CSS class to apply to the component.
 * @returns {React.FC<ComponentProps>} A React functional component.
 */
const createComponent = (
  Tag: React.ElementType,
  defaultClassName: string
): React.FC<ComponentProps> => {
  return ({ children, className }: ComponentProps) => (
    <Tag className={cn(defaultClassName, className)}>{children}</Tag>
  );
};

/** Main page component. Renders a <main> tag with the `"page-container"` class. */
export const Page = createComponent("div", "page-container");

/** Page header component. Renders a <div> tag with the `"page-header"` class. */
export const PageHeader = createComponent("div", "page-header");

/** Page body component. Renders a <div> tag with the `"page-body"` class. */
export const PageBody = createComponent("div", "page-body");

// Navbar title props
type NavbarTitleProps = {
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: TypographyProps["variant"];
  className?: string;
};

// Navbar button props
type NavbarButtonProps = {
  children: string;
  icon?: LucideIcon;
  link: string | null;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
};

/** Define the properties for the PageNavbar component */
export interface PageNavbarProps
  extends React.PropsWithChildren,
    PropsWithClassName {
  title: NavbarTitleProps;
  callbackUrl?: string;
  button: false | NavbarButtonProps;
}

/**
 * Page navbar component. Renders a page header with a title and a button.
 * You can also pass children to the component and configure className.
 */
// TODO: Optimize this component and make more user friendly
export const PageNavbar: React.FC<PageNavbarProps> = ({
  title,
  button,
  callbackUrl,
  children,
  className,
}) => (
  <PageHeader className={cn(className)}>
    <div className="flex items-center flex-wrap gap-x-3 gap-y-4">
      {callbackUrl && (
        <LinkButton
          href={callbackUrl}
          className="group mr-5"
          buttonProps={{ className: "py-1" }}
        >
          <MoveLeftIcon className="size-6 group-hover:-translate-x-1 transition-all" />
        </LinkButton>
      )}
      {/* Title */}
      <Typography
        variant={title.variant || "h2"}
        className={cn("font-bold", title.className)}
        children={title.children}
      />
      {/* Icon */}
      {title.icon && <title.icon className="size-8" />}
    </div>
    {/* Button */}
    {button && (
      <div>
        <Button
          variant={button.variant || "outlined"}
          size={button.size || "sm"}
          className={cn("btn-hover py-1 px-2 sm:py-2 sm:px-4", className)}
          disabled={!button.link}
        >
          {button.link ? (
            <Link className=" flex items-center gap-2" href={button.link}>
              {button.icon && <button.icon className="size-5" />}
              <span className="hidden sm:block">{button.children}</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              {button.icon && <button.icon className="size-5" />}
              <span className="hidden sm:block">{button.children}</span>
            </div>
          )}
        </Button>
      </div>
    )}
    {/* Childrens */}
    {children}
  </PageHeader>
);

/**
 * Page content error component. Renders an error message in a Typography component.
 *
 * @param {string} message The error message to display.
 */
export const PageContentError: React.FC<{ message: string }> = ({
  message,
}) => (
  <Typography variant="lead" className=" font-medium">
    {message}
  </Typography>
);

/**
 * Page content helper component.
 * Renders an helper texts to user or can be used to show legends.
 *
 * @param {string} message The error message to display.
 */
export const PageContentHelper: React.FC<{
  message?: string;
  children?: React.ReactNode;
}> = ({ message, children }) => (
  <Typography className="text-sm text-gray-600">
    * {message || children}
  </Typography>
);
