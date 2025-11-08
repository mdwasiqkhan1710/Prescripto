import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const DoctorAppointments = () => {
  const {
    getAppointments,
    appointments,
    dToken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  // const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  // Safe calculateAge function to prevent NaN
  const safeCalculateAge = (dob) => {
    if (!dob) return "N/A";
    try {
      const age = calculateAge(dob);
      return isNaN(age) ? "N/A" : age;
    } catch (error) {
      return "N/A";
    }
  };

  // Format date safely
  const safeFormatDate = (slotDate, slotTime) => {
    if (!slotDate) return "N/A";
    try {
      return slotDateFormat(slotDate) + (slotTime ? ` ${slotTime}` : "");
    } catch (error) {
      return "N/A";
    }
  };

  // Get status color based on appointment status
  const getStatusColor = (item) => {
    if (item.cancelled) return "text-red-600 bg-red-50";
    if (item.isCompleted) return "text-green-600 bg-green-50";
    return "text-blue-600 bg-blue-50";
  };

  const getStatusText = (item) => {
    if (item.cancelled) return "Cancelled";
    if (item.isCompleted) return "Completed";
    return "Upcoming";
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            All Appointments
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and view all patient appointments
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-3">
          <div className="bg-white border border-gray-300 rounded-lg px-4 py-2">
            <p className="text-sm text-gray-600">
              Total:{" "}
              <span className="font-semibold">{appointments.length}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1.5fr] gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm font-semibold text-gray-700 text-center">#</p>
          <p className="text-sm font-semibold text-gray-700">Patient Name</p>
          <p className="text-sm font-semibold text-gray-700 text-center">
            Payment
          </p>
          <p className="text-sm font-semibold text-gray-700 text-center">Age</p>
          <p className="text-sm font-semibold text-gray-700">Date & Time</p>
          <p className="text-sm font-semibold text-gray-700 text-center">
            Fees
          </p>
          <p className="text-sm font-semibold text-gray-700 text-center">
            Actions
          </p>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {appointments.length > 0 ? (
            appointments.reverse().map((item, index) => {
              const patientName = item.userId?.name || "N/A";
              const patientImage = item.userId?.image || "";
              const patientDob = item.userId?.dob || "";
              const paymentMode = item.payment ? "Online" : "Cash";
              const fees = item.amount || 0;

              return (
                <div
                  key={item._id}
                  className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1.5fr] gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  <p className="text-sm text-gray-600 text-center flex items-center justify-center">
                    {index + 1}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {patientImage ? (
                        <img
                          src={patientImage}
                          alt="patient"
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-2 border-gray-200">
                          <span className="text-lg">👤</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {patientName}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                          item
                        )}`}
                      >
                        {getStatusText(item)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        paymentMode === "Online"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {paymentMode}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 text-center flex items-center justify-center">
                    {safeCalculateAge(patientDob)}
                  </p>

                  <div className="flex items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {safeFormatDate(item.slotDate, item.slotTime)}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-gray-900 text-center flex items-center justify-center">
                    {currency}
                    {fees}
                  </p>

                  <div className="flex items-center justify-center gap-2">
                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className="w-20 px-2 h-8 mr-2 flex items-center justify-center bg-green-200 hover:bg-green-400 rounded-lg transition-colors duration-200 group"
                        title="Mark as Completed"
                      >
                        Complete
                      </button>
                    )}
                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="w-18 h-8 flex items-center justify-center bg-red-300 hover:bg-red-500 rounded-lg transition-colors duration-200 group"
                        title="Cancel Appointment"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
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
              <p className="text-gray-500 text-lg font-medium mb-2">
                No appointments found
              </p>
              <p className="text-gray-400 text-sm">
                When patients book appointments, they will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {appointments.length > 0 ? (
          appointments.reverse().map((item, index) => {
            const patientName = item.userId?.name || "N/A";
            const patientImage = item.userId?.image || "";
            const patientDob = item.userId?.dob || "";
            const paymentMode = item.payment ? "Online" : "Cash";
            const fees = item.amount || 0;

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
              >
                {/* Header with patient info and status */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    {patientImage ? (
                      <img
                        src={patientImage}
                        alt="patient"
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-2 border-gray-200">
                        <span className="text-xl">👤</span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {patientName}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                          item
                        )}`}
                      >
                        {getStatusText(item)}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      paymentMode === "Online"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {paymentMode}
                  </span>
                </div>

                {/* Appointment details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Age</p>
                    <p className="text-sm font-medium text-gray-900">
                      {safeCalculateAge(patientDob)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Fees</p>
                    <p className="text-sm font-medium text-gray-900">
                      {currency}
                      {fees}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                    <p className="text-sm font-medium text-gray-900">
                      {safeFormatDate(item.slotDate, item.slotTime)}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className="flex items-center gap-1 px-3 py-2 bg-green-200 hover:bg-green-400 rounded-lg transition-colors duration-200 text-green-700 text-sm font-medium"
                      >
                        Complete
                      </button>
                    )}
                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="flex items-center gap-1 px-3 py-2 bg-red-200 hover:bg-red-500 rounded-lg transition-colors duration-200 text-red-700 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
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
            <p className="text-gray-500 font-medium mb-2">
              No appointments scheduled
            </p>
            <p className="text-gray-400 text-sm">
              Appointments will appear here when patients book with you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
