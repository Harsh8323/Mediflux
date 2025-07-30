import { USER_ROLES, APPOINTMENT_STATUS } from '../utils/constants.js';

// Sample doctors data
export const mockDoctors = [
  {
    _id: 'doc-001',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    contactInfo: {
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@mediflux.com'
    },
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
      { day: 'Friday', startTime: '09:00', endTime: '15:00' }
    ]
  },
  {
    _id: 'doc-002',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatology',
    contactInfo: {
      phone: '+1 (555) 234-5678',
      email: 'michael.chen@mediflux.com'
    },
    availability: [
      { day: 'Monday', startTime: '10:00', endTime: '18:00' },
      { day: 'Tuesday', startTime: '10:00', endTime: '18:00' },
      { day: 'Wednesday', startTime: '10:00', endTime: '18:00' },
      { day: 'Friday', startTime: '09:00', endTime: '16:00' }
    ]
  },
  {
    _id: 'doc-003',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrics',
    contactInfo: {
      phone: '+1 (555) 345-6789',
      email: 'emily.rodriguez@mediflux.com'
    },
    availability: [
      { day: 'Monday', startTime: '08:00', endTime: '16:00' },
      { day: 'Tuesday', startTime: '08:00', endTime: '16:00' },
      { day: 'Wednesday', startTime: '08:00', endTime: '16:00' },
      { day: 'Thursday', startTime: '08:00', endTime: '16:00' },
      { day: 'Friday', startTime: '08:00', endTime: '14:00' }
    ]
  },
  {
    _id: 'doc-004',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    contactInfo: {
      phone: '+1 (555) 456-7890',
      email: 'james.wilson@mediflux.com'
    },
    availability: [
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
      { day: 'Friday', startTime: '09:00', endTime: '17:00' }
    ]
  },
  {
    _id: 'doc-005',
    name: 'Dr. Lisa Thompson',
    specialization: 'General Practice',
    contactInfo: {
      phone: '+1 (555) 567-8901',
      email: 'lisa.thompson@mediflux.com'
    },
    availability: [
      { day: 'Monday', startTime: '07:00', endTime: '19:00' },
      { day: 'Tuesday', startTime: '07:00', endTime: '19:00' },
      { day: 'Wednesday', startTime: '07:00', endTime: '19:00' },
      { day: 'Thursday', startTime: '07:00', endTime: '19:00' },
      { day: 'Friday', startTime: '07:00', endTime: '17:00' }
    ]
  }
];

// Sample patients data
export const mockPatients = [
  {
    id: 'patient-001',
    email: 'john.doe@email.com',
    password: 'patient123',
    name: 'John Doe',
    age: 34,
    role: USER_ROLES.PATIENT
  },
  {
    id: 'patient-002',
    email: 'jane.smith@email.com',
    password: 'patient123',
    name: 'Jane Smith',
    age: 28,
    role: USER_ROLES.PATIENT
  },
  {
    id: 'patient-003',
    email: 'bob.johnson@email.com',
    password: 'patient123',
    name: 'Bob Johnson',
    age: 45,
    role: USER_ROLES.PATIENT
  },
  {
    id: 'patient-004',
    email: 'alice.brown@email.com',
    password: 'patient123',
    name: 'Alice Brown',
    age: 52,
    role: USER_ROLES.PATIENT
  },
  {
    id: 'patient-005',
    email: 'mike.wilson@email.com',
    password: 'patient123',
    name: 'Mike Wilson',
    age: 39,
    role: USER_ROLES.PATIENT
  }
];

// Sample appointments data
export const mockAppointments = [
  {
    _id: 'apt-001',
    id: 'apt-001',
    patient: mockPatients[0],
    doctor: mockDoctors[0],
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    time: '10:00',
    reason: 'Regular checkup',
    status: APPOINTMENT_STATUS.PENDING
  },
  {
    _id: 'apt-002',
    id: 'apt-002',
    patient: mockPatients[1],
    doctor: mockDoctors[1],
    date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    time: '14:00',
    reason: 'Skin consultation',
    status: APPOINTMENT_STATUS.CONFIRMED
  },
  {
    _id: 'apt-003',
    id: 'apt-003',
    patient: mockPatients[2],
    doctor: mockDoctors[2],
    date: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
    time: '09:30',
    reason: 'Child vaccination',
    status: APPOINTMENT_STATUS.PENDING
  },
  {
    _id: 'apt-004',
    id: 'apt-004',
    patient: mockPatients[0],
    doctor: mockDoctors[4],
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    time: '11:00',
    reason: 'Follow-up appointment',
    status: APPOINTMENT_STATUS.COMPLETED
  },
  {
    _id: 'apt-005',
    id: 'apt-005',
    patient: mockPatients[3],
    doctor: mockDoctors[3],
    date: new Date(Date.now() + 432000000).toISOString(), // 5 days from now
    time: '15:30',
    reason: 'Knee pain evaluation',
    status: APPOINTMENT_STATUS.PENDING
  }
]; 