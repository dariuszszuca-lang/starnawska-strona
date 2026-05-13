import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "narrow" | "default" | "wide" | "full";
  as?: React.ElementType;
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-[1440px]",
};

export function Container({
  className,
  size = "default",
  as: Comp = "div",
  ...props
}: ContainerProps) {
  return (
    <Comp
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizes[size], className)}
      {...props}
    />
  );
}
