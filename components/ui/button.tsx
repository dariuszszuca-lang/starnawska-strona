import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background hover:bg-gray-800 active:scale-[0.98]",
        lime:
          "bg-brand-lime text-brand-forest-deep hover:bg-brand-lime-hover hover:shadow-[0_0_0_4px_rgba(163,199,51,0.18),0_12px_40px_rgba(163,199,51,0.45)] hover:-translate-y-0.5 active:scale-[0.98] font-semibold",
        forest:
          "bg-brand-forest text-foreground-on-dark hover:bg-brand-forest-deep active:scale-[0.98]",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-surface hover:border-foreground active:scale-[0.98]",
        ghost:
          "bg-transparent text-foreground hover:bg-gray-100 active:scale-[0.98]",
        "outline-dark":
          "border border-border-on-dark bg-transparent text-foreground-on-dark hover:bg-white/5 hover:border-brand-lime active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
