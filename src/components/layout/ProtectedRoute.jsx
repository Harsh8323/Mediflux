import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";

// Protected Route - requires authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user, role } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Verifying access..." />;
  }

  // Enhanced authentication check
  if (!isAuthenticated || !user || !role) {
    console.log("Unauthenticated access attempt to:", location.pathname);
    // Redirect to login page with return URL and reason
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          reason: "authentication_required",
          message: "Please log in.",
        }}
        replace
      />
    );
  }

  return children;
};

// Authenticated Route - redirects to dashboard if already authenticated
export const AuthenticatedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user, role } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Checking authentication..." />;
  }

  // If user is authenticated and has valid session, redirect to dashboard
  if (isAuthenticated && user && role) {
    console.log(
      "Authenticated user accessing login page, redirecting to dashboard"
    );
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
