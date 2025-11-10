import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "daily" | "weekly" | "success" | "info" | "warning" | "danger";
  position?: "corner" | "inline";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "info",
  position = "inline",
  className = "",
}) => {
  const baseClasses = "font-bold text-xs uppercase tracking-wider shadow-lg";

  const positionClasses = {
    corner: "absolute -top-0.5 -right-0.5 px-3 py-1.5 z-10",
    inline: "inline-block px-4 py-2",
  };

  const cornerRadius =
    position === "corner"
      ? "rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-none"
      : "rounded-2xl";

  const variantClasses = {
    daily:
      "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/40",
    weekly:
      "bg-gradient-to-r from-purple-600 to-violet-700 text-white shadow-purple-600/40",
    success:
      "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/40",
    info: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/40",
    warning:
      "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/40",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/40",
  };

  return (
    <div
      className={`${baseClasses} ${positionClasses[position]} ${cornerRadius} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Badge;
