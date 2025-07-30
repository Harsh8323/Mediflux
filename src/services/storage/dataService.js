import storageService from './storageService.js';
import { mockDoctors, mockPatients, mockAppointments } from '../../data/mockData.js';
import { DEFAULT_ADMIN } from '../../utils/constants.js';

class DataService {
  constructor() {
    this.storageService = storageService;
  }

  // Initialize localStorage with mock data if not already done
  initializeData() {
    if (this.storageService.isInitialized()) {
      return;
    }

    try {
      // Initialize users (patients + admin)
      const users = [...mockPatients, DEFAULT_ADMIN];
      this.storageService.setUsers(users);

      // Initialize doctors
      this.storageService.setDoctors(mockDoctors);

      // Initialize appointments
      this.storageService.setAppointments(mockAppointments);

      // Mark as initialized
      this.storageService.setInitialized();

      console.log('Mock data initialized successfully');
    } catch (error) {
      console.error('Error initializing mock data:', error);
    }
  }

  // Helper methods for data manipulation
  generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Users management
  findUserByEmail(email) {
    const users = this.storageService.getUsers();
    return users.find(user => user.email === email);
  }

  findUserById(id) {
    const users = this.storageService.getUsers();
    return users.find(user => user.id === id);
  }

  addUser(userData) {
    const users = this.storageService.getUsers();
    const newUser = {
      ...userData,
      id: this.generateId('patient')
    };
    users.push(newUser);
    this.storageService.setUsers(users);
    return newUser;
  }

  updateUser(userId, updates) {
    const users = this.storageService.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      this.storageService.setUsers(users);
      return users[userIndex];
    }
    return null;
  }

  // Appointments management
  findAppointmentById(id) {
    const appointments = this.storageService.getAppointments();
    return appointments.find(apt => apt.id === id || apt._id === id);
  }

  findAppointmentsByPatientId(patientId) {
    const appointments = this.storageService.getAppointments();
    return appointments.filter(apt => apt.patient?.id === patientId);
  }

  findAppointmentsByStatus(status) {
    const appointments = this.storageService.getAppointments();
    return appointments.filter(apt => apt.status === status);
  }

  addAppointment(appointmentData) {
    const appointments = this.storageService.getAppointments();
    const newAppointment = {
      ...appointmentData,
      _id: this.generateId('apt'),
      id: this.generateId('apt')
    };
    appointments.push(newAppointment);
    this.storageService.setAppointments(appointments);
    return newAppointment;
  }

  updateAppointment(appointmentId, updates) {
    const appointments = this.storageService.getAppointments();
    const aptIndex = appointments.findIndex(apt => 
      apt.id === appointmentId || apt._id === appointmentId
    );
    if (aptIndex !== -1) {
      appointments[aptIndex] = { ...appointments[aptIndex], ...updates };
      this.storageService.setAppointments(appointments);
      return appointments[aptIndex];
    }
    return null;
  }

  deleteAppointment(appointmentId) {
    const appointments = this.storageService.getAppointments();
    const filteredAppointments = appointments.filter(apt => 
      apt.id !== appointmentId && apt._id !== appointmentId
    );
    this.storageService.setAppointments(filteredAppointments);
    return filteredAppointments.length !== appointments.length;
  }

  // Doctors management
  findDoctorById(id) {
    const doctors = this.storageService.getDoctors();
    return doctors.find(doc => doc._id === id || doc.id === id);
  }

  getAllDoctors() {
    return this.storageService.getDoctors();
  }

  getAllPatients() {
    const users = this.storageService.getUsers();
    return users.filter(user => user.role === 'patient');
  }

  getAllAppointments() {
    return this.storageService.getAppointments();
  }

  // Reset data
  resetData() {
    this.storageService.remove('initialized');
    this.storageService.remove('users');
    this.storageService.remove('doctors');
    this.storageService.remove('appointments');
    this.initializeData();
  }
}

// Create and export singleton instance
const dataService = new DataService();
export default dataService;

// Export class for testing
export { DataService }; 