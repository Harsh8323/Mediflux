const LoadingSpinner = ({ 
  size = "medium", 
  color = "emerald", 
  text = "Loading...", 
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };

  const colorClasses = {
    emerald: "border-emerald-600 border-t-transparent",
    blue: "border-blue-600 border-t-transparent",
    white: "border-white border-t-transparent"
  };

  const textColorClasses = {
    emerald: "text-gray-700",
    blue: "text-blue-700",
    white: "text-white"
  };

  const spinner = (
    <div className="flex items-center space-x-4">
      <div 
        className={`${sizeClasses[size]} border-4 ${colorClasses[color]} rounded-full animate-spin`}
      ></div>
      {text && (
        <span className={`font-medium ${textColorClasses[color]}`}>
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-200/30 p-8 border border-white/20">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner; 