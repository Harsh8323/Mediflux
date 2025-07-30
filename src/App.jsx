import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute, {
  AuthenticatedRoute,
} from "./components/layout/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/dashboard/admin";
import PatientDashboard from "./pages/dashboard/patient";
import ErrorPage from "./pages/error";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <AuthenticatedRoute>
              <LoginPage />
            </AuthenticatedRoute>
          }
        />
        <Route path="/error" element={<ErrorPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRouter />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  );
}

// Dashboard Router Component to handle role-based routing
function DashboardRouter() {
  const { role } = useAuth();

  if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "patient") {
    return <PatientDashboard />;
  } else {
    // Fallback to login if role is undefined
    return <Navigate to="/login" replace />;
  }
}

export default App;
