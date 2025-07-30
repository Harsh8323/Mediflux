# MediFlux - Healthcare Appointment Management System

A modern, responsive healthcare appointment management application built with React and localStorage for data persistence.

## Features

### 🏥 **Complete Healthcare Management**
- **Patient Portal**: Book appointments, view medical history, receive health tips
- **Admin Dashboard**: Manage appointments, view patients and doctors, approve/reject requests
- **Role-based Access Control**: Secure authentication with admin and patient roles
- **Real-time Updates**: Instant data synchronization using localStorage

### 💻 **Modern Architecture**
- **Frontend-Only Application**: No backend required - fully client-side with localStorage
- **React 19**: Latest React features with hooks and context
- **Tailwind CSS**: Modern, responsive design with beautiful gradients
- **Professional Structure**: Clean code organization with separation of concerns

### 🎨 **Beautiful UI/UX**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Glass Morphism Effects**: Modern backdrop blur and transparency effects
- **Loading States**: Smooth loading animations and skeleton screens
- **Interactive Components**: Hover effects, transitions, and micro-interactions

## Demo Credentials

### Admin Login
- **Email**: `admin@mediflux.com`
- **Password**: `admin123`

### Patient Login
- **Email**: `john.doe@email.com`
- **Password**: `patient123`

*Additional patient accounts are available - check the mock data for more credentials*

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - Use the demo credentials above to explore the application

## Project Structure

```
src/
├── components/
│   ├── appointments/          # Appointment-related components
│   │   └── AppointmentModal.jsx
│   ├── auth/                  # Authentication components
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── layout/                # Layout components
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   └── ui/                    # Reusable UI components
│       ├── LoadingSpinner.jsx
│       ├── Modal.jsx
│       └── StatCard.jsx
├── contexts/
│   └── AuthContext.jsx       # Authentication state management
├── data/
│   └── mockData.js           # Sample data for the application
├── pages/
│   ├── dashboard/
│   │   ├── AdminDashboard.jsx
│   │   └── PatientDashboard.jsx
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   └── ErrorPage.jsx
├── services/
│   ├── appointments/
│   │   └── appointmentService.js
│   ├── auth/
│   │   └── authService.js
│   └── storage/
│       ├── dataService.js
│       └── storageService.js
└── utils/
    └── constants.js          # Application constants
```

## Key Technologies

- **React 19** - Modern React with latest features
- **React Router Dom** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **localStorage API** - Client-side data persistence

## Data Management

The application uses a sophisticated localStorage-based data management system:

- **StorageService**: Low-level localStorage operations
- **DataService**: High-level data manipulation and business logic
- **AuthService**: Authentication and user management
- **AppointmentService**: Appointment operations and validation

## Features Overview

### For Patients
- 📅 **Book Appointments**: Request appointments with available doctors
- 👀 **View Appointments**: See all past, current, and upcoming appointments
- 📊 **Dashboard**: Personal health statistics and appointment overview
- 💡 **Health Tips**: Rotating health and wellness advice
- 👨‍⚕️ **Doctor Profiles**: View doctor specializations and availability

### For Administrators
- ✅ **Approve/Reject**: Manage appointment requests
- 👥 **Patient Management**: View all registered patients
- 👨‍⚕️ **Doctor Management**: View all available doctors
- 📈 **Analytics**: Dashboard with key statistics and metrics
- 🔄 **Real-time Updates**: Instant updates when managing appointments

## Development

### Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Code Quality
- **ESLint**: Configured for React and modern JavaScript
- **Component Structure**: Organized by feature and functionality
- **Clean Architecture**: Separation of concerns with services layer
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

*Note: localStorage is required for data persistence*

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure code quality and test functionality
5. Submit a pull request

## License

This project is for educational and demonstration purposes.

---

**MediFlux** - Streamlining healthcare appointment management with modern web technologies. 🏥✨
