// Application constants
export const USER_ROLES = {
  ADMIN: 'admin',
  PATIENT: 'patient'
};

export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  ROLE: 'role',
  USERS: 'users',
  DOCTORS: 'doctors',
  APPOINTMENTS: 'appointments'
};

export const APPOINTMENT_TIMES = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

export const HEALTH_TIPS = [
  "🥗 Maintain a balanced diet with plenty of vegetables and fruits",
  "🏃‍♂️ Exercise regularly - aim for at least 30 minutes daily",
  "💧 Stay hydrated by drinking 8 glasses of water daily",
  "😴 Get 7-9 hours of quality sleep each night",
  "🧘‍♀️ Practice stress management through meditation or yoga",
];

export const DEFAULT_ADMIN = {
  id: 'admin-001',
  email: 'admin@mediflux.com',
  password: 'admin123',
  name: 'Admin User',
  role: USER_ROLES.ADMIN
}; 