import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorAlert from "../ui/ErrorAlert";
import SuccessAlert from "../ui/SuccessAlert";

const RegisterForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error and success when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Enhanced form validation
      if (!formData.name.trim()) {
        setError({
          message: "Name is required",
          details: "Please enter your full name",
        });
        return;
      }

      if (formData.name.trim().length < 2) {
        setError({
          message: "Name too short",
          details: "Please enter at least 2 characters for your name",
        });
        return;
      }

      if (!formData.email.trim()) {
        setError({
          message: "Email is required",
          details: "Please enter a valid email address",
        });
        return;
      }

      if (!formData.email.includes("@") || !formData.email.includes(".")) {
        setError({
          message: "Invalid email format",
          details:
            "Please enter a valid email address (e.g., user@example.com)",
        });
        return;
      }

      if (!formData.password.trim()) {
        setError({
          message: "Password is required",
          details: "Please create a secure password",
        });
        return;
      }

      if (formData.password.length < 6) {
        setError({
          message: "Password too short",
          details: "Password must be at least 6 characters long",
        });
        return;
      }

      if (!formData.age || formData.age < 1 || formData.age > 120) {
        setError({
          message: "Invalid age",
          details: "Please enter a valid age between 1 and 120",
        });
        return;
      }

      const result = await register(formData);

      if (result.success) {
        setSuccess("Account created successfully! Redirecting to dashboard...");

        // Small delay to show success message
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1500);
      } else {
        setError({
          message: result.error || "Registration failed",
          details: result.details || "Please try again or contact support if the problem persists"
        });
      }
    } catch (err) {
      setError({
        message: "Registration error",
        details: "Please check your information and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Success Message */}
      <SuccessAlert message={success} onClose={() => setSuccess("")} />

      {/* Error Message */}
      <ErrorAlert error={error} onClose={() => setError("")} />

      {/* Name field */}
      <div
        className="opacity-0 animate-slideIn"
        style={{
          animationDelay: "0.1s",
          animationFillMode: "forwards",
        }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <span className="text-gray-600 text-lg">👤</span>
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full pl-14 pr-6 py-4 bg-white/70 backdrop-blur-sm border border-emerald-100/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg shadow-emerald-100/20"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Email field */}
      <div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <span className="text-gray-600 text-lg">📧</span>
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="w-full pl-14 pr-6 py-4 bg-white/70 backdrop-blur-sm border border-emerald-100/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg shadow-emerald-100/20"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password field */}
      <div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <span className="text-gray-600 text-lg">🔒</span>
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password (min 8 characters)"
            className="w-full pl-14 pr-6 py-4 bg-white/70 backdrop-blur-sm border border-emerald-100/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg shadow-emerald-100/20"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Age field */}
      <div
        className="opacity-0 animate-slideIn"
        style={{
          animationDelay: "0.2s",
          animationFillMode: "forwards",
        }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <span className="text-gray-600 text-lg">🎂</span>
          </div>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Age"
            min="1"
            max="120"
            className="w-full pl-14 pr-6 py-4 bg-white/70 backdrop-blur-sm border border-emerald-100/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg shadow-emerald-100/20"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-xl shadow-emerald-500/40 backdrop-blur-sm flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <LoadingSpinner
            size="small"
            color="white"
            text="Creating Account..."
          />
        ) : (
          <>
            <span>👤</span>
            <span>Create Patient Account</span>
          </>
        )}
      </button>

      {/* Toggle to Login */}
      <div className="text-center mt-6 pt-4 border-t border-emerald-100/30">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors underline cursor-pointer"
            disabled={isLoading}
          >
            Sign In
          </button>
        </p>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
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
    </form>
  );
};

export default RegisterForm;
