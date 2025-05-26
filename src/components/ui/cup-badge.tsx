import React from "react";
import { Badge as CupBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
}

const Badge = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) => {
  return (
    <CupBadge
      variant={variant}
      size={size}
      className={cn(className)}
      {...props}
    >
      {children}
    </CupBadge>
  );
};

export { Badge };
