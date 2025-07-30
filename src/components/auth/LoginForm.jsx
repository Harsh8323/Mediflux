import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorAlert from "../ui/ErrorAlert";
import SuccessAlert from "../ui/SuccessAlert";
import AuthRedirectAlert from "../ui/AuthRedirectAlert";
import DemoCredentials from "../ui/DemoCredentials";

const LoginForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Show access message if redirected from protected route
  const accessMessage = location.state?.message;
  const fromPath = location.state?.from?.pathname;

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
      // Validate form
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
      }

      if (!formData.email.includes("@")) {
        setError("Please enter a valid email address");
        return;
      }

      const result = await login(formData.email, formData.password);

      if (result.success) {
        setSuccess("Login successful! Redirecting...");

        // Small delay to show success message
        setTimeout(() => {
          const from = location.state?.from?.pathname || "/dashboard";
          console.log("Login successful, redirecting to:", from);
          navigate(from, { replace: true });
        }, 1000);
      } else {
        setError({
          message: result.error || "Login failed",
          details: result.details || "Please check your credentials and try again"
        });
      }
    } catch (err) {
      setError({
        message: "Connection error",
        details: "Please check your internet connection and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Access Required Message */}
      <AuthRedirectAlert message={accessMessage} fromPath={fromPath} />

      {/* Success Message */}
      <SuccessAlert message={success} onClose={() => setSuccess("")} />

      {/* Error Message */}
      <ErrorAlert error={error} onClose={() => setError("")} />

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
            placeholder="Password"
            className="w-full pl-14 pr-6 py-4 bg-white/70 backdrop-blur-sm border border-emerald-100/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg shadow-emerald-100/20"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Demo Credentials Helper */}
      <DemoCredentials />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-xl shadow-emerald-500/40 backdrop-blur-sm flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <LoadingSpinner size="small" color="white" text="Signing In..." />
        ) : (
          <>
            <span>🏥</span>
            <span>Sign In to MediFlux</span>
          </>
        )}
      </button>

      {/* Toggle to Register */}
      <div className="text-center mt-6 pt-4 border-t border-emerald-100/30">
        <p className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors underline cursor-pointer"
            disabled={isLoading}
          >
            Register as Patient
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
