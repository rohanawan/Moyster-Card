import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "glass"
    | "gradient"
    | "success"
    | "info"
    | "warning"
    | "danger";
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  className = "",
  hover = false,
}) => {
  const baseClasses =
    "rounded-2xl p-5 md:p-6 lg:p-7 shadow-lg transition-all duration-300";

  const hoverClasses = hover
    ? "hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
    : "";

  const variantClasses = {
    default: "bg-gray-800 border border-gray-700",
    glass: "bg-white/10 backdrop-blur-lg border border-white/20",
    gradient:
      "bg-gradient-to-br from-slate-800 to-slate-700 border border-white/10",
    success: "bg-green-500/15 border-2 border-green-500 text-green-100",
    info: "bg-blue-500/15 border-2 border-blue-400 text-blue-100",
    warning: "bg-amber-500/15 border-2 border-amber-500 text-amber-100",
    danger: "bg-red-500/15 border-2 border-red-500 text-red-100",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
