const StatCard = ({ title, value, icon, color, className = "" }) => {
  return (
    <div className={`bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 border border-white/20 p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center shadow-lg`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard; 