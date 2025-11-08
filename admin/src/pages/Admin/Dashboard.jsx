import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext"; // Import AppContext for slotDateFormat
import { assets } from "../../assets/assets.js";

const Dashboard = () => {
  const { getDashData, aToken, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext); // Get slotDateFormat from AppContext

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome to your administration panel
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
        {/* Doctors Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <img
                className="w-8 h-8 lg:w-10 lg:h-10"
                src={assets.doctor_icon}
                alt="doc-icon"
              />
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-800">
                {dashData.doctors}
              </p>
              <p className="text-gray-600 font-medium">Total Doctors</p>
              <p className="text-sm text-gray-500 mt-1">
                Active medical professionals
              </p>
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
                {dashData.appointments}
              </p>
              <p className="text-gray-600 font-medium">Total Appointments</p>
              <p className="text-sm text-gray-500 mt-1">
                All scheduled bookings
              </p>
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
                {dashData.patients}
              </p>
              <p className="text-gray-600 font-medium">Total Patients</p>
              <p className="text-sm text-gray-500 mt-1">Registered users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center gap-3 px-4 lg:px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="p-2 bg-white rounded-lg border border-gray-200">
            <img className="w-5 h-5" src={assets.list_icon} alt="list-icon" />
          </div>
          <div>
            <p className="font-semibold text-lg text-gray-800">
              Latest Bookings
            </p>
            <p className="text-sm text-gray-600">
              Recent appointment activities
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6">
          {dashData.latestAppointment &&
          dashData.latestAppointment.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      <th className="px-4 py-3">Doctor</th>
                      <th className="px-4 py-3">Patient</th>
                      <th className="px-4 py-3">Date & Time</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dashData.latestAppointment.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        {/* Doctor Info */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              className="w-10 h-10 rounded-full object-cover border border-gray-200"
                              src={item.docData?.image || assets.default_avatar}
                              alt={item.docData?.name || "Doctor"}
                            />
                            <div>
                              <p className="font-medium text-gray-800">
                                {item.docData?.name || "Unknown Doctor"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.docData?.speciality || ""}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Patient Info */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              className="w-10 h-10 rounded-full object-cover border border-gray-200"
                              src={
                                item.userData?.image || assets.default_avatar
                              }
                              alt={item.userData?.name || "Patient"}
                            />
                            <div>
                              <p className="font-medium text-gray-800">
                                {item.userData?.name || "Unknown Patient"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.userData?.email || ""}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Date & Time */}
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-800">
                            {slotDateFormat(item.slotDate)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.slotTime}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          {item.cancelled ? (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                              Cancelled
                            </span>
                          ) : item.isCompleted ? (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-400 text-white border border-blue-200">
                              Completed
                            </span>
                          ) : (
                            <button
                              onClick={() => cancelAppointment(item._id)}
                              className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                            >
                              Cancel
                            </button>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          {!item.cancelled && !item.isCompleted ? (
                            <button
                              onClick={() => cancelAppointment(item._id)}
                              className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                            >
                              Cancel
                            </button>
                          ) : (
                            <span className="bg-blue-400 p-3 rounded-lg text-white">
                              No Action Needed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {dashData.latestAppointment.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    {/* Header with Status */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        {item.cancelled ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                            Cancelled
                          </span>
                        ) : item.isCompleted ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-400 text-white border border-blue-200">
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            Confirmed
                          </span>
                        )}
                      </div>
                      {!item.cancelled && !item.isCompleted && (
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    {/* Doctor Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        className="w-12 h-12 rounded-full object-cover border border-gray-200"
                        src={item.docData?.image || assets.default_avatar}
                        alt={item.docData?.name || "Doctor"}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {item.docData?.name || "Unknown Doctor"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.docData?.speciality || ""}
                        </p>
                      </div>
                    </div>

                    {/* Patient Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        src={item.userData?.image || assets.default_avatar}
                        alt={item.userData?.name || "Patient"}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {item.userData?.name || "Unknown Patient"}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {item.userData?.email || ""}
                        </p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="font-medium text-gray-800 text-center">
                        {slotDateFormat(item.slotDate)}
                      </p>
                      <p className="text-sm text-gray-500 text-center">
                        {item.slotTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Empty State for Latest Bookings */
            <div className="text-center py-8 lg:py-12">
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
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No Recent Bookings
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                There are no recent appointments. New bookings will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
