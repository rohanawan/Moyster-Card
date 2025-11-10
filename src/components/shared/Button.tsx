import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {
  const baseClasses =
    "font-semibold rounded-xl border-none cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs h-10",
    md: "px-6 py-3 text-[13px] h-12",
    lg: "px-8 py-4 text-lg h-14",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40",
    secondary:
      "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-600/30 hover:shadow-gray-600/40",
    success:
      "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/40",
    warning:
      "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/40",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/40",
  };

  const disabledClasses =
    "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-lg";

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${
        variantClasses[variant]
      } ${disabled ? disabledClasses : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
