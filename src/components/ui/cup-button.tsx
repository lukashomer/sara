import React from "react";
import { Button as CupButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "destructive"
    | "link"
    | "ghost"
    | "outline"
    | "soft"
    | "brand"
    | "highlight";
  size?: "sm" | "md" | "lg" | "icon" | "pill" | "custom";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const variantMapping = {
  primary: "default",
  secondary: "secondary",
  tertiary: "outline",
  destructive: "destructive",
  link: "link",
  ghost: "ghost",
  outline: "outline",
  soft: "soft",
  brand: "brand",
  highlight: "highlight",
};

const sizeMapping = {
  sm: "sm",
  md: "default",
  lg: "lg",
  icon: "icon",
  pill: "pill",
  custom: "custom",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <CupButton
        ref={ref}
        variant={variantMapping[variant] || "default"}
        size={sizeMapping[size] || "default"}
        disabled={isLoading || disabled}
        className={cn(fullWidth && "w-full", className)}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
            {children}
          </div>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="mr-2">{icon}</span>
            )}
            {children}
            {icon && iconPosition === "right" && (
              <span className="ml-2">{icon}</span>
            )}
          </>
        )}
      </CupButton>
    );
  },
);

Button.displayName = "Button";

export { Button };
