"use client";

import React from "react";
import "@/styles/components/button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "round-secondary";
  size?: "sm" | "md" | "lg" | "xs";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
      primary: "bg-primary-600 text-white",
      secondary: "bg-neutral-900 text-sec",
      "round-secondary": "bg-neutral-900 text-sec rounded-full",
      outline: "border border-border bg-transparent outline text-text-primary",
    };

    const sizeStyles = {
      xs: "text-xs h-8 px-2 ",
      sm: "text-sm h-9 px-3 ",
      md: "text-md h-10 px-4",
      lg: "text-lg h-11 px-5",
    };

    const fullWidthStyle = fullWidth ? "w-full" : "";

    const getStyles = () => {
      return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidthStyle} ${className}`;
    };

    return (
      <button
        ref={ref}
        className={getStyles() + `${isLoading || disabled ? " cursor-not-allowed" : ""}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]"></span>
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;