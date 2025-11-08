import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../../../admin/src/assets/assets";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log("Error fetching appointments:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  // Enhanced safe data access functions
  const getDoctorImage = (item) => {
    // Check multiple possible locations for doctor data
    return (
      item.docData?.image || item.docId?.image || assets.random_profile_pic
    );
  };

  const getDoctorName = (item) => {
    return (
      item.docData?.name ||
      item.docId?.name ||
      "Doctor information not available"
    );
  };

  const getDoctorSpeciality = (item) => {
    return (
      item.docData?.speciality ||
      item.docId?.speciality ||
      "Speciality not specified"
    );
  };

  const getDoctorAddress = (item) => {
    const address = item.docData?.address || item.docId?.address;
    if (!address) return { line1: "Address not available", line2: "" };
    return address;
  };

  // Debug: Log each appointment when rendering
  useEffect(() => {
    if (appointments.length > 0) {
      // console.log("Current appointments state:", appointments);
    }
  }, [appointments]);

  if (loading) {
    return <div className="text-center py-8">Loading appointments...</div>;
  }

  return (
    <div>
      <p className="pb-3 mt-8 text-xl font-semibold text-[#414aafff]">
        My Appointments
      </p>
      <div>
        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => {
            const doctorImage = getDoctorImage(item);
            const doctorName = getDoctorName(item);
            const doctorSpeciality = getDoctorSpeciality(item);
            const doctorAddress = getDoctorAddress(item);

            return (
              <div
                className="mt-4 mb-15 grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-t"
                key={index}
              >
                {/*--------------Appointment Details-----------  */}
                <div>
                  <img
                    className="w-32 h-32 object-cover bg-indigo-50 rounded-lg"
                    src={doctorImage}
                    alt="Doctor"
                    onError={(e) => {
                      e.target.src = assets.random_profile_pic;
                    }}
                  />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p className="text-neutral-800 font-semibold">{doctorName}</p>
                  <p>{doctorSpeciality}</p>
                  <p className="text-zinc-700 font-medium mt-1">Address:</p>
                  <p className="text-xs">{doctorAddress.line1}</p>
                  <p className="text-xs">{doctorAddress.line2}</p>
                  <p className="text-sm mt-1">
                    <span className="text-sm text-neutral-700 font-medium">
                      Date & Time:
                    </span>
                    {item.slotDate} | {item.slotTime}
                  </p>
                </div>

                <div></div>

                {/*--------------Buttons-----------  */}
                <div className="flex flex-col gap-3 justify-end mb-2">
                  {!item.cancelled && item.payment && !item.isCompleted && (
                    <button className="text-medium text-black bg-indigo-200 font-bold text-center sm:min-w-48 py-2 border border-black rounded cursor-pointer">
                      Paid
                    </button>
                  )}
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <button
                      onClick={() => appointmentRazorpay(item._id)}
                      className="text-sm text-black-900 bg-indigo-200 font-bold text-center sm:min-w-48 py-2 border border-black rounded cursor-pointer hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white transition-colors duration-200"
                    >
                      Pay Online Now
                    </button>
                  )}
                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-sm text-black-900 bg-indigo-200 font-bold text-center sm:min-w-48 py-2 border border-black rounded cursor-pointer hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white transition-colors duration-200"
                    >
                      Cancel Appointment
                    </button>
                  )}
                  {item.cancelled && (
                    <button className="text-sm text-red-600 font-bold text-center sm:min-w-48 py-2 border border-red rounded cursor-pointer">
                      Appointment Cancelled
                    </button>
                  )}
                  {item.isCompleted && (
                    <button className="text-sm text-white bg-blue-400 font-bold text-center sm:min-w-48 py-2 border border-blue-200 rounded cursor-pointer">
                      Appointment Completed
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
