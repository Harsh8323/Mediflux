import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import appointmentService from "../../../services/appointments/appointmentService";
import Navbar from "../../../components/layout/Navbar";
import StatCard from "../../../components/ui/StatCard";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import AppointmentActionButton from "../../../components/appointments/AppointmentActionButton";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import SuccessAlert from "../../../components/ui/SuccessAlert";

function AdminDashboard() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    pendingAppointments: 0,
    totalAppointments: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState({
    type: "",
    message: "",
  });
  const [showAllPatients, setShowAllPatients] = useState(false);
  const [showAllDoctors, setShowAllDoctors] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [patientsResult, doctorsResult, pendingResult] =
          await Promise.all([
            appointmentService.getAllPatients(),
            appointmentService.getAllDoctors(),
            appointmentService.getPendingAppointments(),
          ]);

        if (patientsResult.success) {
          setPatients(patientsResult.data);
        }

        if (doctorsResult.success) {
          setDoctors(doctorsResult.data);
        }

        if (pendingResult.success) {
          setPendingAppointments(pendingResult.data);
        }

        setStats({
          totalPatients: patientsResult.success
            ? patientsResult.data.length
            : 0,
          totalDoctors: doctorsResult.success ? doctorsResult.data.length : 0,
          pendingAppointments: pendingResult.success
            ? pendingResult.data.length
            : 0,
          totalAppointments: pendingResult.success
            ? pendingResult.data.length
            : 0,
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleAppointmentStatusUpdate = async (appointmentId, newStatus) => {
    // Validate appointment ID before making the request
    if (
      !appointmentId ||
      typeof appointmentId !== "string" ||
      appointmentId.trim() === ""
    ) {
      const errorMsg = "Invalid appointment ID format";
      console.error(errorMsg, appointmentId);
      setActionFeedback({
        type: "error",
        message: "Invalid appointment ID",
      });
      throw new Error(errorMsg);
    }

    try {
      const result = await appointmentService.updateAppointmentStatus(
        appointmentId,
        newStatus
      );

      if (result.success) {
        // Show success feedback
        setActionFeedback({
          type: "success",
          message: `Appointment ${
            newStatus === "confirmed" ? "confirmed" : "cancelled"
          } successfully`,
        });

        // Auto-hide feedback after 3 seconds
        setTimeout(() => {
          setActionFeedback({ type: "", message: "" });
        }, 3000);

        // Refresh pending appointments
        const pendingResult = await appointmentService.getPendingAppointments();
        if (pendingResult.success) {
          setPendingAppointments(pendingResult.data);
          setStats((prev) => ({
            ...prev,
            pendingAppointments: pendingResult.data.length,
          }));
        }
        return result;
      }
      throw new Error(result.error || "Update failed");
    } catch (error) {
      console.error("Error updating appointment status:", error);
      setActionFeedback({
        type: "error",
        message: "Failed to update appointment status",
      });

      // Auto-hide error after 5 seconds
      setTimeout(() => {
        setActionFeedback({ type: "", message: "" });
      }, 5000);

      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <LoadingSpinner fullScreen text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Feedback Alerts */}
        {actionFeedback.message && (
          <div className="mb-6">
            {actionFeedback.type === "success" ? (
              <SuccessAlert
                message={actionFeedback.message}
                onClose={() => setActionFeedback({ type: "", message: "" })}
              />
            ) : (
              <ErrorAlert
                error={actionFeedback.message}
                onClose={() => setActionFeedback({ type: "", message: "" })}
              />
            )}
          </div>
        )}

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
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xs">⭐</span>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        Welcome back,
                        <br />
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          {user?.name || "Admin"}
                        </span>
                      </h1>
                      <p className="text-lg text-gray-600 mt-2">
                        Hospital Administration Dashboard
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200/50 shadow-sm">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm text-emerald-700 font-medium">
                        System Online
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

                {/* Right: Quick Stats */}
                <div className="lg:col-span-1">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                      Today's Overview
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Pending Appointments
                        </span>
                        <span className="text-lg font-bold text-orange-600">
                          {stats.pendingAppointments}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Total Patients
                        </span>
                        <span className="text-lg font-bold text-blue-600">
                          {stats.totalPatients}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Available Doctors
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          {stats.totalDoctors}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            icon="👥"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="Total Doctors"
            value={stats.totalDoctors}
            icon="👨‍⚕️"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            title="Pending Appointments"
            value={stats.pendingAppointments}
            icon="⏰"
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
          <StatCard
            title="Total Appointments"
            value={stats.totalAppointments}
            icon="📅"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Pending Appointments
                </h2>
              </div>

              {pendingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {pendingAppointments.slice(0, 5).map((appointment) => (
                    <div
                      key={appointment._id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 backdrop-blur-sm rounded-xl border border-emerald-100/50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-700 font-semibold">
                            {appointment.patient?.name?.charAt(0) || "P"}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {appointment.patient?.name || "Unknown Patient"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {appointment.doctor?.name || "Unknown Doctor"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.doctor?.specialization || ""}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(appointment.date).toLocaleDateString()} at{" "}
                            {appointment.time}
                          </p>
                          {appointment.reason && (
                            <p className="text-xs text-gray-500 mt-1">
                              {appointment.reason}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <AppointmentActionButton
                          onClick={() =>
                            handleAppointmentStatusUpdate(
                              appointment.id,
                              "confirmed"
                            )
                          }
                          variant="primary"
                          size="sm"
                        >
                          ✅ Confirm
                        </AppointmentActionButton>
                        <AppointmentActionButton
                          onClick={() =>
                            handleAppointmentStatusUpdate(
                              appointment.id,
                              "cancelled"
                            )
                          }
                          variant="danger"
                          size="sm"
                        >
                          ❌ Cancel
                        </AppointmentActionButton>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-4 block">📅</span>
                  <p>No pending appointments</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Patients */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {showAllPatients ? "All Patients" : "Recent Patients"}
                </h2>
                <button
                  onClick={() => setShowAllPatients(!showAllPatients)}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
                >
                  {showAllPatients ? "Show Less" : "View All"}
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {(showAllPatients ? patients : patients.slice(0, 5)).map(
                  (patient) => (
                    <div
                      key={patient.id || patient._id}
                      className="flex items-center space-x-3 p-3 hover:bg-emerald-50/50 rounded-lg transition-colors duration-200"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-700 font-semibold text-sm">
                          {patient.name?.charAt(0) || "P"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {patient.name}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {patient.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          Age: {patient.age}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {!showAllPatients && patients.length > 5 && (
                <div className="text-center pt-4 border-t border-gray-100 mt-4">
                  <p className="text-xs text-gray-500">
                    + {patients.length - 5} more patients
                  </p>
                </div>
              )}
            </div>

            {/* Doctors List */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 border border-white/20 p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {showAllDoctors ? "All Doctors" : "Available Doctors"} (
                  {doctors.length})
                </h2>
                <button
                  onClick={() => setShowAllDoctors(!showAllDoctors)}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
                >
                  {showAllDoctors ? "Show Less" : "View All"}
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {(showAllDoctors ? doctors : doctors.slice(0, 4)).map(
                  (doctor) => (
                    <div
                      key={doctor._id}
                      className="flex items-center space-x-3 p-3 hover:bg-emerald-50/50 rounded-lg transition-colors duration-200"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 font-semibold text-sm">
                          {doctor.name?.charAt(0) || "D"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {doctor.specialization}
                        </p>
                        {doctor.contactInfo && (
                          <div className="text-xs text-gray-500 mt-1">
                            {doctor.contactInfo.phone && (
                              <p>📞 {doctor.contactInfo.phone}</p>
                            )}
                            {doctor.contactInfo.email && (
                              <p>✉️ {doctor.contactInfo.email}</p>
                            )}
                          </div>
                        )}
                        {doctor.availability &&
                          doctor.availability.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {doctor.availability.length} day
                              {doctor.availability.length !== 1 ? "s" : ""}{" "}
                              available
                            </p>
                          )}
                      </div>
                    </div>
                  )
                )}
              </div>

              {!showAllDoctors && doctors.length > 4 && (
                <div className="text-center pt-4 border-t border-gray-100 mt-4">
                  <p className="text-xs text-gray-500">
                    + {doctors.length - 4} more doctors
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
