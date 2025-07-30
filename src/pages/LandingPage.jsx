// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();

  const scrollToPreview = () => {
    const previewSection = document.getElementById("dashboard-preview");
    if (previewSection) {
      previewSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Navigation Header */}
      <nav className="bg-gradient-to-r from-emerald-50/70 via-teal-50/80 to-cyan-50/70 backdrop-blur-lg shadow-xl shadow-emerald-200/30 border-b border-emerald-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-5 sm:w-2 sm:h-6 bg-teal-500 rounded-sm"></div>
                  <div className="w-1.5 h-3 sm:w-2 sm:h-4 bg-teal-400 rounded-sm mt-2"></div>
                  <div className="w-1.5 h-4 sm:w-2 sm:h-5 bg-teal-600 rounded-sm mt-1"></div>
                </div>
                <span className="text-lg sm:text-xl font-semibold text-gray-900">
                  MediFlux
                </span>
              </div>
            </div>

            {/* Conditional Navigation Button */}
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/30 backdrop-blur-sm flex items-center space-x-2"
              >
                <span>Dashboard</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/30 backdrop-blur-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-8 sm:pb-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
              Streamline <span className="text-teal-500">Healthcare</span>{" "}
              Appointments
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>with Smart Management
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto px-4 sm:px-0">
              Book and manage your healthcare appointments easily. MediFlux
              connects patients and providers for a smoother, smarter
              experience.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-16 px-4 sm:px-0">
              <Link
                to="/login"
                className="w-full sm:w-auto gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-7 py-3 rounded-full font-medium hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 shadow-xl shadow-emerald-500/40 backdrop-blur-sm transform hover:scale-105 flex items-center justify-center"
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <svg
                    className="w-4.5 h-4 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="M9 12h6" />
                    <path d="M12 9v6" />
                  </svg>
                </div>
                <p className="text-white text-lg">Get Started</p>
              </Link>

              <button
                onClick={scrollToPreview}
                className="w-full sm:w-auto bg-white/70 backdrop-blur-md text-gray-700 px-8 py-3 rounded-full font-medium border border-white/30 hover:bg-white/80 transition-all duration-300 flex items-center justify-center shadow-xl shadow-gray-400/40 hover:shadow-2xl hover:shadow-gray-500/50 transform hover:scale-105"
              >
                <svg
                  className="mr-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Watch Preview
              </button>
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div
            id="dashboard-preview"
            className="relative max-w-6xl mx-auto px-2 sm:px-4"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-emerald-200/30 overflow-hidden border-2 border-emerald-300/60 ring-1 ring-emerald-200/40 ring-offset-4 ring-offset-emerald-50/30">
              {/* Browser Bar */}
              <div className="bg-gradient-to-r from-gray-100/80 to-emerald-50/80 backdrop-blur-sm px-2 sm:px-4 py-2 sm:py-3 flex items-center space-x-2 border-b border-white/30">
                <div className="flex space-x-1 sm:space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 mx-2 sm:mx-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 flex items-center shadow-inner">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400 hidden sm:block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span className="truncate">
                      https://mediflux.app/dashboard
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
              </div>

              {/* Real Dashboard Image */}
              <div className="relative overflow-hidden">
                <img
                  src="/Dashboard.png"
                  alt="MediFlux Dashboard Preview"
                  className="w-full h-auto object-cover object-top"
                  loading="lazy"
                />
                {/* Optional overlay for better visibility on different screens */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-emerald-50/10 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
