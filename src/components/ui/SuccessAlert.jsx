import { useEffect } from "react";

const SuccessAlert = ({
  message,
  onClose,
  className = "",
  showIcon = true,
  autoClose = false,
  autoCloseDelay = 3000,
}) => {
  if (!message) return null;

  // Auto close functionality
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose, autoCloseDelay]);

  return (
    <div
      className={`bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-start space-x-3 ${className}`}
    >
      {showIcon && <span className="text-base flex-shrink-0 mt-0.5">✅</span>}
      <div className="flex-1">
        <p className="font-medium">
          {typeof message === "string" ? message : message.text || "Success!"}
        </p>
        {message.details && (
          <p className="text-xs mt-1 opacity-75">{message.details}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-green-700 hover:opacity-70 transition-opacity flex-shrink-0"
          aria-label="Close success message"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SuccessAlert;
