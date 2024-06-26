import { cn } from "@/lib/utils";
import React from "react";

type div = React.HTMLProps<HTMLDivElement>;

interface HeroProps extends Omit<div, "size"> {}

const Hero: React.FC<HeroProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("p-5 w-full flex items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface HeroSideProps extends div {}

export const HeroSide: React.FC<HeroSideProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("flex-1 bg-transparent", className)} {...props}>
    {children}
  </div>
);

export default Hero;
