import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "lg",
  className = "",
}) => {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`bg-gray-800 rounded-3xl p-5 md:p-6 lg:p-8 w-full ${maxWidthClasses[maxWidth]} max-h-[90vh] overflow-auto border-2 border-gray-700/50 shadow-2xl backdrop-blur-sm ${className}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200 hover:scale-110 hover:shadow-lg shadow-red-500/50"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="text-gray-300">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
