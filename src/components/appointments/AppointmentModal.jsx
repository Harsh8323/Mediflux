import { useState, useEffect } from "react";
import appointmentService from "../../services/appointments/appointmentService";
import { APPOINTMENT_TIMES } from "../../utils/constants";
import Modal from "../ui/Modal";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorAlert from "../ui/ErrorAlert";

const AppointmentModal = ({ isOpen, onClose, doctor, onSuccess }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastSubmittedAppointment, setLastSubmittedAppointment] =
    useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate form
      if (!formData.date || !formData.time) {
        setError("Please select both date and time");
        return;
      }

      // Check if date is in the future
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        setError("Please select a future date");
        return;
      }

      const result = await appointmentService.requestAppointment({
        doctorId: doctor._id,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
      });

      if (result.success) {
        setShowSuccess(true);
        setLastSubmittedAppointment({
          date: formData.date,
          time: formData.time,
          reason: formData.reason,
          doctorName: doctor?.name,
        });
        setFormData({ date: "", time: "", reason: "" });

        setTimeout(() => {
          setShowSuccess(false);
          onSuccess && onSuccess();
          onClose();
        }, 2000);
      } else {
        setError(result.error || "Failed to request appointment");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false);
      setError("");
      setLastSubmittedAppointment(null);
    }
  }, [isOpen]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      {showSuccess ? (
        <div className="text-center py-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Appointment Requested!
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Your request has been submitted successfully.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
            <p className="text-green-800">
              <strong>
                Dr. {lastSubmittedAppointment?.doctorName || doctor?.name}
              </strong>
              <br />
              <strong>Date:</strong>{" "}
              {lastSubmittedAppointment?.date
                ? new Date(lastSubmittedAppointment.date).toLocaleDateString()
                : "N/A"}
              <br />
              <strong>Time:</strong>{" "}
              {lastSubmittedAppointment?.time
                ? lastSubmittedAppointment.time
                : "N/A"}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Compact Header */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Book Appointment
            </h3>
            {doctor && (
              <div className="flex items-center justify-center space-x-3 p-3 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-lg border border-emerald-100/50">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 text-sm">👨‍⚕️</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">
                    Dr. {doctor.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {doctor.specialization}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Error Alert */}
          <ErrorAlert error={error} onClose={() => setError("")} />

          {/* Compact Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Date and Time Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={today}
                  className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-emerald-100/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-sm"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-emerald-100/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-sm"
                  required
                  disabled={isLoading}
                >
                  <option value="">Select time</option>
                  {APPOINTMENT_TIMES.map((time) => (
                    <option key={time} value={time}>
                      {time === "09:00"
                        ? "9:00 AM"
                        : time === "09:30"
                        ? "9:30 AM"
                        : time === "10:00"
                        ? "10:00 AM"
                        : time === "10:30"
                        ? "10:30 AM"
                        : time === "11:00"
                        ? "11:00 AM"
                        : time === "11:30"
                        ? "11:30 AM"
                        : time === "14:00"
                        ? "2:00 PM"
                        : time === "14:30"
                        ? "2:30 PM"
                        : time === "15:00"
                        ? "3:00 PM"
                        : time === "15:30"
                        ? "3:30 PM"
                        : time === "16:00"
                        ? "4:00 PM"
                        : time === "16:30"
                        ? "4:30 PM"
                        : time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reason Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Reason (Optional)
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Brief description of your concern..."
                rows={2}
                maxLength={200}
                className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-emerald-100/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 resize-none text-sm"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.reason.length}/200 characters
              </p>
            </div>

            {/* Compact Availability Info */}
            {doctor?.availability && doctor.availability.length > 0 && (
              <div className="bg-blue-50/50 border border-blue-200/30 rounded-lg p-2">
                <p className="text-xs font-medium text-blue-900 mb-1">
                  Available:{" "}
                  {doctor.availability
                    .slice(0, 2)
                    .map((slot) => slot.day.slice(0, 3))
                    .join(", ")}
                  {doctor.availability.length > 2 &&
                    ` +${doctor.availability.length - 2} more`}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-3 rounded-lg font-medium transition-colors text-sm"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 px-3 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 text-sm"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="small" color="white" text="" />
                    <span>Requesting...</span>
                  </>
                ) : (
                  <>
                    <span>📅</span>
                    <span>Book Appointment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default AppointmentModal;
