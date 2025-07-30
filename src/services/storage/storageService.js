import { STORAGE_KEYS } from '../../utils/constants.js';

class StorageService {
  constructor() {
    this.storage = window.localStorage;
  }

  // Generic methods
  get(key) {
    try {
      const data = this.storage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key: ${key}`, error);
      return null;
    }
  }

  set(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key: ${key}`, error);
      return false;
    }
  }

  remove(key) {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key: ${key}`, error);
      return false;
    }
  }

  clear() {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage', error);
      return false;
    }
  }

  // Auth-specific methods
  getAuthToken() {
    return this.get(STORAGE_KEYS.AUTH_TOKEN);
  }

  setAuthToken(token) {
    return this.set(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  removeAuthToken() {
    return this.remove(STORAGE_KEYS.AUTH_TOKEN);
  }

  getCurrentUser() {
    return this.get(STORAGE_KEYS.USER);
  }

  setCurrentUser(user) {
    return this.set(STORAGE_KEYS.USER, user);
  }

  removeCurrentUser() {
    return this.remove(STORAGE_KEYS.USER);
  }

  getCurrentUserRole() {
    return this.get(STORAGE_KEYS.ROLE);
  }

  setCurrentUserRole(role) {
    return this.set(STORAGE_KEYS.ROLE, role);
  }

  removeCurrentUserRole() {
    return this.remove(STORAGE_KEYS.ROLE);
  }

  // Data methods
  getUsers() {
    return this.get(STORAGE_KEYS.USERS) || [];
  }

  setUsers(users) {
    return this.set(STORAGE_KEYS.USERS, users);
  }

  getDoctors() {
    return this.get(STORAGE_KEYS.DOCTORS) || [];
  }

  setDoctors(doctors) {
    return this.set(STORAGE_KEYS.DOCTORS, doctors);
  }

  getAppointments() {
    return this.get(STORAGE_KEYS.APPOINTMENTS) || [];
  }

  setAppointments(appointments) {
    return this.set(STORAGE_KEYS.APPOINTMENTS, appointments);
  }

  // Utility methods
  isInitialized() {
    return this.get('initialized') === true;
  }

  setInitialized() {
    return this.set('initialized', true);
  }

  // Clear all auth data
  clearAuthData() {
    this.removeAuthToken();
    this.removeCurrentUser();
    this.removeCurrentUserRole();
  }
}

// Create and export singleton instance
const storageService = new StorageService();
export default storageService;

// Export class for testing
export { StorageService }; 