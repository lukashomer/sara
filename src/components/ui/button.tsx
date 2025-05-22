import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[18px] text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-dark hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md",
        outline:
          "bg-white border border-gray-200 text-foreground shadow-sm hover:bg-[#F7F7F7] hover:text-secondary-foreground",
        secondary:
          "bg-[#F7F7F7] text-secondary-foreground shadow-sm hover:bg-[#EDEFF2] hover:text-primary",
        ghost: "bg-transparent hover:bg-[#F7F7F7] hover:text-primary",
        link: "bg-transparent text-primary hover:text-primary-dark underline-offset-4 hover:underline",
        soft: "bg-primary-light text-primary shadow-sm hover:bg-primary-light/80",
        brand:
          "bg-brand-blue text-white shadow-sm hover:bg-brand-darkBlue hover:shadow-md",
        highlight:
          "bg-[#9CCAF8] text-[#0D80F2] shadow-sm hover:bg-[#9CCAF8]/90 hover:shadow-md",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
        pill: "h-10 px-6 rounded-full",
        custom:
          "flex w-[135px] h-[45px] px-[18px] py-[9px] justify-center items-center gap-[9px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Export buttonVariants before component definition to fix Fast Refresh issue
export { buttonVariants };

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
  },
);
Button.displayName = "Button";

export { Button };
