import { useState } from "react";

const DemoCredentials = ({ className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors underline"
      >
        {isVisible ? "Hide" : "Show"} Demo Credentials
      </button>
      
      {isVisible && (
        <div className="mt-3 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm">
          <strong>Demo Credentials:</strong>
          <br />
          <strong>Admin:</strong> admin@mediflux.com / admin123
          <br />
          <strong>Patient:</strong> john.doe@email.com / patient123
          <br />
          <span className="text-xs text-blue-600 mt-2 block">
            Use these credentials to explore the application's features
          </span>
        </div>
      )}
    </div>
  );
};

export default DemoCredentials; 