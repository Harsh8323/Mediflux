import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/auth/authService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on app start
    const checkAuth = async () => {
      try {
        const token = authService.getToken();
        const storedRole = authService.getRole();

        if (token && storedRole) {
          // Validate token by trying to make an authenticated request
          const isValid = await authService.validateToken(token);

          if (isValid.valid) {
            setRole(storedRole);

            // Try to get user profile based on role
            if (storedRole === "patient") {
              try {
                const profileResult = await authService.getPatientProfile();
                if (profileResult.success) {
                  setUser(profileResult.data);
                  localStorage.setItem(
                    "user",
                    JSON.stringify(profileResult.data)
                  );
                }
              } catch (error) {
                console.log("Could not fetch profile");
              }
            } else if (storedRole === "admin") {
              // For admin, we don't have a profile endpoint, so we'll use stored data
              const storedUser = localStorage.getItem("user");
              if (storedUser) {
                setUser(JSON.parse(storedUser));
              } else {
                // Set a default admin user
                const adminUser = {
                  name: "Admin User",
                  email: "admin@mediflux.com",
                };
                setUser(adminUser);
                localStorage.setItem("user", JSON.stringify(adminUser));
              }
            }
          } else {
            // Token is invalid, clear auth data
            await authService.logout();
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        await authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const result = await authService.login(email, password);

      if (result.success) {
        setRole(result.role);

        // Get user profile for patients, set default for admin
        if (result.role === "patient") {
          try {
            const profileResult = await authService.getPatientProfile();
            if (profileResult.success) {
              setUser(profileResult.data);
              localStorage.setItem("user", JSON.stringify(profileResult.data));
            }
          } catch (error) {
            console.log("Could not fetch profile");
          }
        } else if (result.role === "admin") {
          const adminUser = { name: "Admin User", email: email };
          setUser(adminUser);
          localStorage.setItem("user", JSON.stringify(adminUser));
        }

        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const result = await authService.register(userData);

      if (result.success) {
        // After successful registration, automatically log them in
        const loginResult = await authService.login(
          userData.email,
          userData.password
        );

        if (loginResult.success) {
          setRole("patient"); // Registration is only for patients
          setUser(result.user);
          localStorage.setItem("user", JSON.stringify(result.user));
          return { success: true };
        } else {
          return {
            success: false,
            error:
              "Registration successful but login failed. Please try logging in.",
          };
        }
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setRole(null);
    }
  };

  const isAuthenticated = !!user && !!role;

  const value = {
    user,
    role,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
