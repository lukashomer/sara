import React from "react";
import { Input as CupInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, iconPosition = "left", error, hint, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-1">
        <CupInput
          ref={ref}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "bg-[#F7F7F7] focus:bg-[#EDEFF2] disabled:bg-[#F7F7F7] disabled:opacity-50",
            error && "border-[#D32F2F] focus-visible:ring-[#D32F2F]",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#D32F2F]">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
