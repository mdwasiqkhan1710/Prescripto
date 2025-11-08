import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (aToken) {
        setLoading(true);
        await getAllAppointments();
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 lg:p-6">
      {/* Header */}
      <div className="mb-4 lg:mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
          All Appointments
        </h1>
        <p className="text-sm lg:text-base text-gray-600 mt-1">
          {appointments?.length || 0} appointment
          {appointments?.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12 lg:py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : appointments && appointments.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-4 py-4 px-6 bg-gray-50 border-b border-gray-300 text-sm font-semibold text-gray-700">
              <p>#</p>
              <p>Patient Name</p>
              <p>Age</p>
              <p>Date & Time</p>
              <p>Doctor</p>
              <p>Fees</p>
              <p>Actions</p>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {appointments.map((item, index) => (
                <div
                  className="grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-4 items-center py-4 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 text-sm text-gray-700"
                  key={index}
                >
                  <p className="font-medium">{index + 1}</p>

                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      src={item.userData?.image || assets.default_avatar}
                      alt="patient"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.userData?.name || "Unknown Patient"}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-32">
                        {item.userData?.email || ""}
                      </p>
                    </div>
                  </div>

                  <p>
                    {item.userData?.dob
                      ? calculateAge(item.userData.dob)
                      : "N/A"}
                  </p>

                  <div>
                    <p className="font-medium">
                      {slotDateFormat(item.slotDate)}
                    </p>
                    <p className="text-xs text-gray-500">{item.slotTime}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 bg-gray-100"
                      src={item.docData?.image || assets.default_avatar}
                      alt="doctor"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.docData?.name || "Unknown Doctor"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.docData?.speciality || ""}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold text-green-600">
                    {currency}
                    {item.amount}
                  </p>

                  <div>
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
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {appointments.map((item, index) => (
              <div
                className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
                key={index}
              >
                {/* Header with Patient and Status */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                      src={item.userData?.image || assets.default_avatar}
                      alt="patient"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.userData?.name || "Unknown Patient"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Age:{" "}
                        {item.userData?.dob
                          ? calculateAge(item.userData.dob)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  {item.cancelled ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-400 text-white border border-blue-200">
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {/* Appointment Details */}
                <div className="space-y-3">
                  {/* Date & Time */}
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium text-gray-700">
                      Date & Time:
                    </span>
                    <span>
                      {slotDateFormat(item.slotDate)}, {item.slotTime}
                    </span>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 bg-gray-100"
                      src={item.docData?.image || assets.default_avatar}
                      alt="doctor"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {item.docData?.name || "Unknown Doctor"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.docData?.speciality || ""}
                      </p>
                    </div>
                  </div>

                  {/* Fee */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-700">
                      Consultation Fee:
                    </span>
                    <span className="font-semibold text-green-600">
                      {currency}
                      {item.amount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-8 lg:p-12 text-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400"
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
          <h3 className="text-lg lg:text-xl font-semibold text-gray-700 mb-2">
            No Appointments Found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {appointments
              ? "There are no appointments scheduled at the moment."
              : "Could not load appointments data."}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
