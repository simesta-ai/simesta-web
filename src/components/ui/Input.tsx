"use client";

import React from "react";
import { TriangleAlert, CircleAlert } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const inputId =
      props.id || `input-${Math.random().toString(36).substring(2, 9)}`;

    const baseInputStyles =
      "form-input transition-colors focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50";
    const errorInputStyles = error ? "border-error-500" : "border-border";
    const widthStyles = fullWidth ? "w-full" : "";
    const paddingStyles = leftIcon
      ? "padding-10"
      : rightIcon
      ? "padding-10"
      : "";

    return (
      <div className={`${widthStyles} ${className} gap-2 flex flex-col`}>
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
          </label>
        )}
        <div
          className={`relative ${
            isFocused ? "focused-input" : ""
          } gap-2 flex items-center ${baseInputStyles} ${errorInputStyles} ${widthStyles} ${paddingStyles}`}
        >
          {leftIcon && (
            <div className="translate-y-10 text-text-tertiary">{leftIcon}</div>
          )}
          <input
            ref={ref}
            id={inputId}
            className="w-full transparent"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {rightIcon && (
            <div className="translate-y-10 text-text-tertiary">{rightIcon}</div>
          )}
        </div>
        {hint && !error ? (
          <div className="flex items-center gap-2">
            <CircleAlert className="warn-icon"  size={16} />
            <p className="text-text-tertiary text-sm error-text">{hint}</p>
          </div>
        ) : null}
        {error ? (
          <div className="flex gap-2">
            <TriangleAlert className="error-icon" size={16} />
            <p className="text-error-500 text-sm error-text">{error}</p>
          </div>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
