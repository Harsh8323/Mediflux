import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import appointmentService from "../../../services/appointments/appointmentService";
import AppointmentModal from "../../../components/appointments/AppointmentModal";
import Navbar from "../../../components/layout/Navbar";
import StatCard from "../../../components/ui/StatCard";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import DoctorCard from "../../../components/doctors/DoctorCard";
import { HEALTH_TIPS } from "../../../utils/constants";

function PatientDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentModal, setAppointmentModal] = useState({
    isOpen: false,
    selectedDoctor: null,
  });
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
  });

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % HEALTH_TIPS.length);
    }, 5000);
    return () => clearInterval(tipInterval);
  }, []);

  useEffect(() => {
    loadPatientData();
  }, []);

  const loadPatientData = async () => {
    try {
      const [appointmentsResult, doctorsResult] = await Promise.all([
        appointmentService.getPatientAppointments(),
        appointmentService.getPatientDoctors(),
      ]);

      if (appointmentsResult.success) {
        setAppointments(appointmentsResult.data);

        // Calculate stats
        const appointments = appointmentsResult.data;
        setStats({
          totalAppointments: appointments.length,
          upcomingAppointments: appointments.filter(
            (apt) => apt.status === "pending" || apt.status === "confirmed"
          ).length,
          completedAppointments: appointments.filter(
            (apt) => apt.status === "completed"
          ).length,
          pendingAppointments: appointments.filter(
            (apt) => apt.status === "pending"
          ).length,
        });
      }

      if (doctorsResult.success) {
        setDoctors(doctorsResult.data);
      }
    } catch (error) {
      console.error("Error loading patient data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestAppointment = (doctor) => {
    setAppointmentModal({
      isOpen: true,
      selectedDoctor: doctor,
    });
  };

  const handleCloseModal = () => {
    setAppointmentModal({
      isOpen: false,
      selectedDoctor: null,
    });
  };

  const handleAppointmentSuccess = () => {
    // Refresh appointments data
    loadPatientData();
  };

  const upcomingAppointments = appointments
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const nextAppointment = appointments
    .filter((app) => app.status === "pending" || app.status === "confirmed")
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <LoadingSpinner fullScreen text="Loading your dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ddece6] via-[#ddece6] to-[#ffffff]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Enhanced Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-3xl mb-8 border-2 border-emerald-200/50 shadow-xl shadow-emerald-100/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/50"></div>
          <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-300/20 rounded-full -translate-x-20 -translate-y-20 blur-xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-300/20 rounded-full translate-x-16 translate-y-16 blur-xl"></div>

          <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl shadow-emerald-200/30">
            <div className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Left: Welcome Content */}
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-white/80 backdrop-blur-sm border-2 border-emerald-200/50 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/40 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        {/* Three-bar logo */}
                        <div className="flex space-x-1.5">
                          <div className="w-2.5 h-8 bg-teal-500 rounded-sm"></div>
                          <div className="w-2.5 h-5 bg-teal-400 rounded-sm mt-3"></div>
                          <div className="w-2.5 h-6 bg-teal-600 rounded-sm mt-2"></div>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xs">💖</span>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        Hello,
                        <br />
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          {user?.name || "Patient"}
                        </span>
                      </h1>
                      <p className="text-lg text-gray-600 mt-2">
                        Your Personal Health Dashboard
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200/50 shadow-sm">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm text-emerald-700 font-medium">
                        Health Monitoring Active
                      </span>
                    </div>
                    <div className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200/50 shadow-sm">
                      <span className="text-sm text-blue-700 font-medium">
                        {new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Quick Health Stats */}
                <div className="lg:col-span-1">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                      Your Health Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Total Appointments
                        </span>
                        <span className="text-lg font-bold text-blue-600">
                          {stats.totalAppointments}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Upcoming</span>
                        <span className="text-lg font-bold text-green-600">
                          {stats.upcomingAppointments}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Pending Approval
                        </span>
                        <span className="text-lg font-bold text-orange-600">
                          {stats.pendingAppointments}
                        </span>
                      </div>
                      {nextAppointment && (
                        <div className="pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">
                            Next Appointment
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(
                              nextAppointment.date
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Appointments"
            value={stats.totalAppointments}
            icon="📅"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="Upcoming"
            value={stats.upcomingAppointments}
            icon="⏰"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            title="Completed"
            value={stats.completedAppointments}
            icon="✅"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            title="Pending Approval"
            value={stats.pendingAppointments}
            icon="⏳"
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        {/* Main Content Grid */}
        {upcomingAppointments.length > 0 ? (
          // Layout when appointments exist: 2/3 for appointments+doctors, 1/3 for health tips
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Your Appointments */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 border border-white/20 p-6 min-h-[300px]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Appointments
                  </h2>
                </div>

                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment._id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 backdrop-blur-sm rounded-xl border border-emerald-100/50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-700 font-semibold">
                            🩺
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {appointment.doctor?.name || "Doctor"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {appointment.doctor?.specialization || "General"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(appointment.date).toLocaleDateString()} at{" "}
                            {appointment.time}
                          </p>
                          {appointment.reason && (
                            <p className="text-xs text-gray-500 mt-1">
                              Reason: {appointment.reason}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : appointment.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {appointment.status === "cancelled"
                            ? "rejected"
                            : appointment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Doctors */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 border border-white/20 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Available Doctors ({doctors.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {doctors.map((doctor) => (
                    <DoctorCard
                      key={doctor._id}
                      doctor={doctor}
                      onRequestAppointment={handleRequestAppointment}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-8">
              {/* Health Tips */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 border border-white/20 p-6 min-h-[300px] flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Health Tip
                </h2>
                <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50 flex-1 flex items-center justify-center">
                  <p className="text-gray-700 text-sm leading-relaxed text-center">
                    {HEALTH_TIPS[currentTipIndex]}
                  </p>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  {HEALTH_TIPS.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentTipIndex
                          ? "bg-emerald-600"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Next Appointment */}
              {nextAppointment && (
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 border border-white/20 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Next Appointment
                  </h2>
                  <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-700 font-semibold">
                          🩺
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {nextAppointment.doctor?.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {nextAppointment.doctor?.specialization}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(nextAppointment.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Time:</strong> {nextAppointment.time}
                      </p>
                      <p>
                        <strong>Status:</strong>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            nextAppointment.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {nextAppointment.status}
                        </span>
                      </p>
                      {nextAppointment.reason && (
                        <p>
                          <strong>Reason:</strong> {nextAppointment.reason}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Layout when no appointments: Full width grid with doctors taking more space
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Available Doctors - Takes 3/4 width when no appointments */}
            <div className="lg:col-span-3">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 border border-white/20 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Available Doctors ({doctors.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {doctors.map((doctor) => (
                    <DoctorCard
                      key={doctor._id}
                      doctor={doctor}
                      onRequestAppointment={handleRequestAppointment}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Health Tips - Takes 1/4 width when no appointments */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 border border-white/20 p-6 min-h-[300px] flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Health Tip
                </h2>
                <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50 flex-1 flex items-center justify-center">
                  <p className="text-gray-700 text-sm leading-relaxed text-center">
                    {HEALTH_TIPS[currentTipIndex]}
                  </p>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  {HEALTH_TIPS.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentTipIndex
                          ? "bg-emerald-600"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* No Appointments Message */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 border border-white/20 p-6">
                <div className="text-center py-4 text-gray-500">
                  <span className="text-4xl mb-4 block">📅</span>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    No Appointments Yet
                  </h3>
                  <p className="text-sm">
                    Book your first appointment with one of our available
                    doctors!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={appointmentModal.isOpen}
        onClose={handleCloseModal}
        doctor={appointmentModal.selectedDoctor}
        onSuccess={handleAppointmentSuccess}
      />
    </div>
  );
}

export default PatientDashboard;
