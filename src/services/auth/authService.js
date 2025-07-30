import storageService from "../storage/storageService.js";
import dataService from "../storage/dataService.js";
import { USER_ROLES } from "../../utils/constants.js";

class AuthService {
  constructor() {
    this.storageService = storageService;
    this.dataService = dataService;

    // Initialize data when service is created
    this.dataService.initializeData();
  }

  // Generate a simple token (in a real app, this would be JWT)
  generateToken(user) {
    return btoa(
      JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        timestamp: Date.now(),
      })
    );
  }

  // Validate credentials
  validateCredentials(email, password) {
    const user = this.dataService.findUserByEmail(email);
    if (!user) {
      return {
        valid: false,
        error: "Invalid credentials.",
        details: "Email or password is incorrect.",
      };
    }

    if (user.password !== password) {
      return {
        valid: false,
        error: "Invalid credentials.",
        details: "Email or password is incorrect.",
      };
    }

    return { valid: true, user };
  }

  async login(email, password) {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const validation = this.validateCredentials(email, password);

      if (!validation.valid) {
        return {
          success: false,
          error: validation.error,
          details: validation.details,
        };
      }

      const { user } = validation;
      const token = this.generateToken(user);

      // Store auth data
      this.storageService.setAuthToken(token);
      this.storageService.setCurrentUserRole(user.role);
      this.storageService.setCurrentUser(user);

      return {
        success: true,
        token,
        role: user.role,
        user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async register(userData) {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check if user already exists
      const existingUser = this.dataService.findUserByEmail(userData.email);
      if (existingUser) {
        return {
          success: false,
          error: "Email already registered. Please log in.",
          details: "An account with this email address already exists.",
        };
      }

      // Create new user
      const newUser = this.dataService.addUser({
        ...userData,
        role: USER_ROLES.PATIENT, // Registration is only for patients
      });

      return {
        success: true,
        user: newUser,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getPatientProfile() {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const currentUser = this.storageService.getCurrentUser();
      const role = this.storageService.getCurrentUserRole();

      if (!currentUser || role !== USER_ROLES.PATIENT) {
        return {
          success: false,
          error: "Not authorized or not a patient",
        };
      }

      return {
        success: true,
        data: currentUser,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async logout() {
    try {
      // Clear auth data
      this.storageService.clearAuthData();

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async validateToken(token) {
    try {
      if (!token) {
        return { success: true, valid: false };
      }

      // Decode token
      const tokenData = JSON.parse(atob(token));

      // Check if token is not too old (24 hours)
      const now = Date.now();
      const tokenAge = now - tokenData.timestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (tokenAge > maxAge) {
        return { success: true, valid: false };
      }

      // Check if user still exists
      const user = this.dataService.findUserById(tokenData.id);
      if (!user) {
        return { success: true, valid: false };
      }

      return { success: true, valid: true };
    } catch (error) {
      return { success: true, valid: false };
    }
  }

  getCurrentUser() {
    try {
      const user = this.storageService.getCurrentUser();
      const role = this.storageService.getCurrentUserRole();

      if (user && role) {
        return {
          user,
          role,
        };
      }

      return null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  isAuthenticated() {
    const token = this.storageService.getAuthToken();
    const role = this.storageService.getCurrentUserRole();

    return !!(token && role);
  }

  getToken() {
    return this.storageService.getAuthToken();
  }

  getRole() {
    return this.storageService.getCurrentUserRole();
  }

  // Helper method to get demo credentials for testing
  getDemoCredentials() {
    return {
      admin: {
        email: "admin@mediflux.com",
        password: "admin123",
      },
      patient: {
        email: "john.doe@email.com",
        password: "patient123",
      },
    };
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;

// Export the class for testing
export { AuthService };
