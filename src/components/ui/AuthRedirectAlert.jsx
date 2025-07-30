const AuthRedirectAlert = ({ message, fromPath, onClose, className = "" }) => {
  if (!message) return null;

  return (
    <div
      className={`bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl text-sm flex items-start space-x-3 ${className}`}
    >
      <span className="text-base flex-shrink-0 mt-0.5">🔒</span>
      <div className="flex-1">
        <p className="font-medium">{message}</p>
        {fromPath && (
          <p className="text-xs mt-1 opacity-75">
            You were trying to access: {fromPath}
          </p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-amber-700 hover:opacity-70 transition-opacity flex-shrink-0"
          aria-label="Close message"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default AuthRedirectAlert;
