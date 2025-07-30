const ErrorAlert = ({ 
  error, 
  onClose, 
  type = "error",
  className = "",
  showIcon = true 
}) => {
  if (!error) return null;

  const typeStyles = {
    error: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-700",
      icon: "❌"
    },
    warning: {
      bg: "bg-yellow-50 border-yellow-200", 
      text: "text-yellow-700",
      icon: "⚠️"
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-700", 
      icon: "ℹ️"
    }
  };

  const styles = typeStyles[type];

  return (
    <div className={`${styles.bg} border ${styles.text} px-4 py-3 rounded-xl text-sm flex items-start space-x-3 ${className}`}>
      {showIcon && (
        <span className="text-base flex-shrink-0 mt-0.5">
          {styles.icon}
        </span>
      )}
      <div className="flex-1">
        <p className="font-medium">
          {typeof error === 'string' ? error : error.message || 'An error occurred'}
        </p>
        {error.details && (
          <p className="text-xs mt-1 opacity-75">
            {error.details}
          </p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`${styles.text} hover:opacity-70 transition-opacity flex-shrink-0`}
          aria-label="Close error"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorAlert; 