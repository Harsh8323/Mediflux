const DoctorCard = ({ doctor, onRequestAppointment, className = "" }) => {
  const availableDays = doctor.availability?.length || 0;

  return (
    <div
      className={`group relative overflow-hidden bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl border border-emerald-100/50 shadow-xl shadow-emerald-100/20 hover:shadow-2xl hover:shadow-emerald-200/40 transition-all duration-500 hover:-translate-y-1 min-h-[400px] ${className}`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 via-teal-50/20 to-cyan-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Specialty badge removed from top-right, now inline with doctor info */}

      <div className="relative p-6">
        {/* Doctor Avatar and Info */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <span className="text-emerald-700 font-bold text-xl">👨‍⚕️</span>
            </div>
            {/* Online status indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full shadow-sm">
              <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-emerald-700 transition-colors">
              {doctor.name}
            </h3>
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Available today
            </div>
            {/* Specialty badge moved here */}
            <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {doctor.specialization}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        {doctor.contactInfo && (
          <div className="mb-4 p-3 bg-gray-50/50 rounded-xl border border-gray-100/50">
            <p className="text-xs text-gray-600 font-medium mb-2">
              Contact Information
            </p>
            <div className="space-y-1">
              {doctor.contactInfo.phone && (
                <div className="flex items-center text-xs text-gray-600">
                  <span className="mr-2">📞</span>
                  <span>{doctor.contactInfo.phone}</span>
                </div>
              )}
              {doctor.contactInfo.email && (
                <div className="flex items-center text-xs text-gray-600">
                  <span className="mr-2">✉️</span>
                  <span className="truncate">{doctor.contactInfo.email}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Availability */}
        {doctor.availability && doctor.availability.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-600 font-medium mb-2">
              Available Days
            </p>
            <div className="flex flex-wrap gap-1">
              {doctor.availability.slice(0, 3).map((slot, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full font-medium"
                >
                  {slot.day.slice(0, 3)}
                </span>
              ))}
              {doctor.availability.length > 3 && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{doctor.availability.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-2 bg-blue-50/50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {availableDays}
            </div>
            <div className="text-xs text-blue-600">Days/Week</div>
          </div>
          <div className="text-center p-2 bg-green-50/50 rounded-lg">
            <div className="text-lg font-bold text-green-600">4.9</div>
            <div className="text-xs text-green-600">Rating</div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onRequestAppointment(doctor)}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-xl font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/30 group-hover:shadow-xl group-hover:shadow-emerald-500/40 flex items-center justify-center space-x-2"
        >
          <span>📅</span>
          <span>Book Appointment</span>
        </button>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 border-2 border-emerald-200 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default DoctorCard;
