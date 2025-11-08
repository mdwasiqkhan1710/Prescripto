import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData } = useContext(DoctorContext);
  const { currency, calculateAge, slotDateFormat } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  // Safe calculateAge function
  const safeCalculateAge = (dob) => {
    if (!dob) return "N/A";
    try {
      const age = calculateAge(dob);
      return isNaN(age) ? "N/A" : age;
    } catch (error) {
      return "N/A";
    }
  };

  // Safe date formatting
  const safeFormatDate = (slotDate, slotTime) => {
    if (!slotDate) return "N/A";
    try {
      return slotDateFormat(slotDate) + (slotTime ? ` ${slotTime}` : "");
    } catch (error) {
      return "N/A";
    }
  };

  if (!dashData) {
    return (
      <div className="m-5 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-5">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Doctor Dashboard
        </h1>{" "}
        {/* Changed from Admin to Doctor */}
        <p className="text-gray-600 mt-2">Welcome to your Doctor's panel</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
        {/* Earnings Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <img
                className="w-8 h-8 lg:w-10 lg:h-10"
                src={assets.earning_icon}
                alt="earning-icon"
              />
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-800">
                {currency}
                {dashData.earnings || 0}
              </p>
              <p className="text-gray-600 font-medium">Earnings</p>
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <img
                className="w-8 h-8 lg:w-10 lg:h-10"
                src={assets.appointments_icon}
                alt="appointment-icon"
              />
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-800">
                {dashData.appointments || 0}
              </p>
              <p className="text-gray-600 font-medium">Total Appointments</p>
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <img
                className="w-8 h-8 lg:w-10 lg:h-10"
                src={assets.patients_icon}
                alt="patient-icon"
              />
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-800">
                {dashData.patients || 0}
              </p>
              <p className="text-gray-600 font-medium">Total Patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-2.5 px-6 py-4 bg-gray-50 border-b border-gray-200">
          <img src={assets.list_icon} alt="list" className="w-5 h-5" />
          <p className="font-semibold text-gray-800">Latest Bookings</p>
        </div>

        <div>
          {dashData.latestAppointments &&
          dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, index) => {
              // Use populated user data from userId field
              const patientName = item.userId?.name || "N/A";
              const patientImage = item.userId?.image || "";
              const patientDob = item.userId?.dob || "";

              return (
                <div
                  className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                  key={item._id || index}
                >
                  {/* Patient Image */}
                  <div className="flex-shrink-0">
                    {patientImage ? (
                      <img
                        className="rounded-full w-12 h-12 object-cover border-2 border-gray-200"
                        src={patientImage}
                        alt={`${patientName} avatar`}
                      />
                    ) : (
                      <div className="rounded-full w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-2 border-gray-200">
                        <span className="text-lg">👤</span>
                      </div>
                    )}
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="text-gray-800 font-medium truncate">
                          {patientName}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {safeFormatDate(item.slotDate, item.slotTime)}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          Age: {safeCalculateAge(patientDob)}
                        </p>
                      </div>

                      {/* Status or Action Button */}
                      <div className="flex-shrink-0">
                        {item.cancelled ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Cancelled
                          </span>
                        ) : item.isCompleted ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        ) : (
                          <button
                            onClick={() => navigate("/doctor-appointments")}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors duration-200"
                          >
                            Update Status
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No appointments found</p>
              <p className="text-gray-400 text-sm mt-1">
                When patients book appointments, they will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
