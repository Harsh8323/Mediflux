import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

const AppointmentActionButton = ({
  onClick,
  children,
  variant = "primary",
  disabled = false,
  className = "",
  size = "sm",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
  };

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const handleClick = async () => {
    if (isLoading || disabled) return;

    setIsLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center space-x-1
        ${className}
      `}
    >
      {isLoading ? (
        <LoadingSpinner size="small" color="white" text="" />
      ) : (
        children
      )}
    </button>
  );
};

export default AppointmentActionButton;
