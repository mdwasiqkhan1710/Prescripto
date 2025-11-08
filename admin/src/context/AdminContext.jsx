// AdminContext.jsx
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const storedToken = localStorage.getItem("aToken") || "";
  const [aToken, setAToken] = useState(storedToken);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const headers = { atoken: aToken || "" };

      if (!headers.atoken && aToken) headers.Authorization = aToken;

      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        { headers }
      );

      if (data.success) {
        setDoctors(data.doctors);
        // console.log("doctors:", data.doctors);
      } else {
        // show backend message (e.g. unauthorized)
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (err) {
      console.error(err);
      // Axios errors may have err.response.data.message
      const msg =
        err.response?.data?.message || err.message || "Something went wrong";
      toast.error(msg);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { atoken: aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        await getAllDoctors();
      } else {
        toast.error(data.message || "Failed to change availability");
      }
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken: aToken },
      });
      // console.log("Appointments:", data.appointments);
      if (data.success) {
        setAppointments(data.appointments);
        // console.log(data.appointments);
      } else {
        toast.error(data.message || "Unable to fetch all appointments data!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken: aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken: aToken },
      });

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
