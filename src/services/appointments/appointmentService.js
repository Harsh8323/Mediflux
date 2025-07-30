import storageService from '../storage/storageService.js';
import dataService from '../storage/dataService.js';
import { USER_ROLES, APPOINTMENT_STATUS } from '../../utils/constants.js';

class AppointmentService {
  constructor() {
    this.storageService = storageService;
    this.dataService = dataService;
  }

  // Patient endpoints
  async getPatientAppointments() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const currentUser = this.storageService.getCurrentUser();
      if (!currentUser) {
        return {
          success: false,
          error: 'Not authenticated'
        };
      }

      const appointments = this.dataService.findAppointmentsByPatientId(currentUser.id);
      
      return {
        success: true,
        data: appointments || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getPatientDoctors() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));

      const doctors = this.dataService.getAllDoctors();
      
      return {
        success: true,
        data: doctors || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async requestAppointment(appointmentData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const currentUser = this.storageService.getCurrentUser();
      if (!currentUser) {
        return {
          success: false,
          error: 'Not authenticated'
        };
      }

      // Find the doctor
      const doctor = this.dataService.findDoctorById(appointmentData.doctorId);
      if (!doctor) {
        return {
          success: false,
          error: 'Doctor not found'
        };
      }

      // Create new appointment
      const newAppointment = this.dataService.addAppointment({
        patient: currentUser,
        doctor: doctor,
        date: appointmentData.date,
        time: appointmentData.time,
        reason: appointmentData.reason || '',
        status: APPOINTMENT_STATUS.PENDING
      });

      return {
        success: true,
        data: newAppointment
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getPatientProfile() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));

      const currentUser = this.storageService.getCurrentUser();
      if (!currentUser) {
        return {
          success: false,
          error: 'Not authenticated'
        };
      }

      return {
        success: true,
        data: currentUser
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Admin endpoints
  async getAllPatients() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 250));

      const role = this.storageService.getCurrentUserRole();
      if (role !== USER_ROLES.ADMIN) {
        return {
          success: false,
          error: 'Access denied - Admin only'
        };
      }

      const patients = this.dataService.getAllPatients();
      
      return {
        success: true,
        data: patients || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getAllDoctors() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));

      const role = this.storageService.getCurrentUserRole();
      if (role !== USER_ROLES.ADMIN) {
        return {
          success: false,
          error: 'Access denied - Admin only'
        };
      }

      const doctors = this.dataService.getAllDoctors();
      
      return {
        success: true,
        data: doctors || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getPendingAppointments() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const role = this.storageService.getCurrentUserRole();
      if (role !== USER_ROLES.ADMIN) {
        return {
          success: false,
          error: 'Access denied - Admin only'
        };
      }

      const pendingAppointments = this.dataService.findAppointmentsByStatus(APPOINTMENT_STATUS.PENDING);
      
      return {
        success: true,
        data: pendingAppointments || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updateAppointmentStatus(appointmentId, status) {
    try {
      // Enhanced validation
      if (!appointmentId || typeof appointmentId !== "string" || appointmentId.trim() === "") {
        throw new Error("Valid appointment ID is required");
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));

      const role = this.storageService.getCurrentUserRole();
      if (role !== USER_ROLES.ADMIN) {
        return {
          success: false,
          error: 'Access denied - Admin only'
        };
      }

      // Validate status
      if (!Object.values(APPOINTMENT_STATUS).includes(status)) {
        return {
          success: false,
          error: 'Invalid appointment status'
        };
      }

      // Update appointment
      const updatedAppointment = this.dataService.updateAppointment(appointmentId, { status });
      
      if (!updatedAppointment) {
        return {
          success: false,
          error: 'Appointment not found'
        };
      }

      return {
        success: true,
        data: updatedAppointment
      };
    } catch (error) {
      console.error("Error updating appointment status:", {
        appointmentId,
        status,
        error: error.message,
      });
      return {
        success: false,
        error: error.message || "Failed to update appointment status"
      };
    }
  }

  // Utility methods for dashboard stats
  async getDashboardStats() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));

      const role = this.storageService.getCurrentUserRole();

      if (role === USER_ROLES.ADMIN) {
        const [patientsResult, pendingResult, doctorsResult] = await Promise.all([
          this.getAllPatients(),
          this.getPendingAppointments(),
          this.getAllDoctors(),
        ]);

        return {
          success: true,
          data: {
            totalPatients: patientsResult.success ? patientsResult.data.length : 0,
            pendingAppointments: pendingResult.success ? pendingResult.data.length : 0,
            totalDoctors: doctorsResult.success ? doctorsResult.data.length : 0,
            totalAppointments: pendingResult.success ? pendingResult.data.length : 0,
          },
        };
      } else if (role === USER_ROLES.PATIENT) {
        const appointmentsResult = await this.getPatientAppointments();
        const appointments = appointmentsResult.success ? appointmentsResult.data : [];

        const today = new Date().toISOString().split("T")[0];
        const todayAppointments = appointments.filter(
          (apt) => apt.date && apt.date.split("T")[0] === today
        );

        return {
          success: true,
          data: {
            totalAppointments: appointments.length,
            upcomingAppointments: appointments.filter(
              (apt) => apt.status === APPOINTMENT_STATUS.PENDING || apt.status === APPOINTMENT_STATUS.CONFIRMED
            ).length,
            completedAppointments: appointments.filter(
              (apt) => apt.status === APPOINTMENT_STATUS.COMPLETED
            ).length,
            pendingAppointments: appointments.filter(
              (apt) => apt.status === APPOINTMENT_STATUS.PENDING
            ).length,
            todayAppointments: todayAppointments.length,
          },
        };
      }

      return {
        success: false,
        error: "Invalid role",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Helper methods
  async getAllAppointments() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));

      const role = this.storageService.getCurrentUserRole();
      if (role !== USER_ROLES.ADMIN) {
        return {
          success: false,
          error: 'Access denied - Admin only'
        };
      }

      const appointments = this.dataService.getAllAppointments();
      
      return {
        success: true,
        data: appointments || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get appointments by date range
  async getAppointmentsByDateRange(startDate, endDate) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const appointments = this.dataService.getAllAppointments();
      const start = new Date(startDate);
      const end = new Date(endDate);

      const filteredAppointments = appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= start && aptDate <= end;
      });

      return {
        success: true,
        data: filteredAppointments
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Create and export a singleton instance
const appointmentService = new AppointmentService();
export default appointmentService;

// Export the class for testing
export { AppointmentService }; 