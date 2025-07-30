import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
  };

  // Hospital themed floating icons configuration
  const hospitalIcons = [
    {
      id: 1,
      icon: "🏥",
      delay: 0,
      position: "top-16 left-16",
      size: "text-4xl",
    },
    {
      id: 2,
      icon: "🩺",
      delay: 2,
      position: "top-16 right-16",
      size: "text-3xl",
    },
    {
      id: 3,
      icon: "💊",
      delay: 4,
      position: "bottom-16 left-16",
      size: "text-3xl",
    },
    {
      id: 4,
      icon: "⚕️",
      delay: 6,
      position: "bottom-16 right-16",
      size: "text-3xl",
    },
    {
      id: 5,
      icon: "🚑",
      delay: 1,
      position: "top-1/2 left-8",
      size: "text-2xl",
    },
    {
      id: 6,
      icon: "🔬",
      delay: 3,
      position: "top-1/2 right-8",
      size: "text-2xl",
    },
    {
      id: 7,
      icon: "💉",
      delay: 5,
      position: "top-8 left-1/2",
      size: "text-2xl",
    },
    {
      id: 8,
      icon: "📋",
      delay: 7,
      position: "bottom-8 left-1/2",
      size: "text-2xl",
    },
  ];

  const HospitalIcon = ({ icon, delay, position, size }) => (
    <div
      className={`absolute ${position} ${size} text-teal-400/60 drop-shadow-lg transform-gpu`}
      style={{
        animationDelay: `${delay}s`,
        animation: `float 25s ease-in-out infinite ${delay}s`,
      }}
    >
      {icon}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Patterned Medical Icons - Following circular pattern */}
      {hospitalIcons.map((iconConfig) => (
        <HospitalIcon
          key={iconConfig.id}
          icon={iconConfig.icon}
          delay={iconConfig.delay}
          position={iconConfig.position}
          size={iconConfig.size}
        />
      ))}

      {/* Navigation Header - Same as Landing Page */}
      <nav className="bg-gradient-to-r from-emerald-50/70 via-teal-50/80 to-cyan-50/70 backdrop-blur-lg shadow-xl shadow-emerald-200/30 border-b border-emerald-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-5 sm:w-2 sm:h-6 bg-teal-500 rounded-sm"></div>
                  <div className="w-1.5 h-3 sm:w-2 sm:h-4 bg-teal-400 rounded-sm mt-2"></div>
                  <div className="w-1.5 h-4 sm:w-2 sm:h-5 bg-teal-600 rounded-sm mt-1"></div>
                </div>
                <span className="text-lg sm:text-xl font-semibold text-gray-900">
                  MediFlux
                </span>
              </Link>
            </div>
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-6">
        <div className="w-full max-w-xl relative">
          {/* Main Login Card - Increased Width */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-200/30 overflow-hidden border border-white/20 relative z-10">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 backdrop-blur-sm p-6 text-center border-b border-white/30">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200/50">
                  <span className="text-2xl">🏥</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? "Welcome Back to MediFlux" : "Join MediFlux"}
              </h2>
              <p className="text-gray-600">
                {isLogin
                  ? "Access your healthcare management system"
                  : "Create your patient account"}
              </p>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Dynamic Form */}
              {isLogin ? (
                <LoginForm onToggleMode={handleModeSwitch} />
              ) : (
                <RegisterForm onToggleMode={handleModeSwitch} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-20px) scale(1.05) rotate(1deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-30px) scale(1.1) rotate(-0.5deg);
            opacity: 1;
          }
          75% {
            transform: translateY(-15px) scale(1.03) rotate(0.8deg);
            opacity: 0.9;
          }
        }

        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
