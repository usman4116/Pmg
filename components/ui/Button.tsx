import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "quiet" | "clay";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, external, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans tracking-wide text-xs uppercase font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2";

    const variantStyles = {
      primary:
        "bg-[var(--foreground)] text-[var(--sky)] hover:opacity-90 active:scale-[0.98]",
      secondary:
        "border border-hairline text-[var(--foreground)] hover:border-[var(--foreground)] active:scale-[0.98]",
      quiet:
        "text-[var(--subtle)] hover:text-[var(--foreground)] underline-offset-8 hover:underline p-0",
      clay:
        "bg-[var(--clay)] text-[#F6F1E7] hover:bg-[#B35838] active:scale-[0.98] shadow-sm",
    };

    const sizeStyles = {
      sm: "px-4 py-2 rounded-full text-[11px]",
      md: "px-6 py-3 rounded-full text-xs",
      lg: "px-8 py-4 rounded-full text-sm",
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      variant !== "quiet" && sizeStyles[size],
      className
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={combinedClassName}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
