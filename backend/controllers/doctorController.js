import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailablity = async (req, res) => {
  try {
    // destructure docId from the request body
    const { docId } = req.body;

    if (!docId) {
      return res.json({
        success: false,
        message: "Missing docId in request body.",
      });
    }

    // find the doctor by id
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found." });
    }

    // toggle availability
    const updated = await doctorModel.findByIdAndUpdate(
      docId,
      { available: !docData.available },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Doctor availability changed successfully!",
      doctor: updated,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message || "Error changing availability.",
    });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

//API for Doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid Credentials!" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Password!" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

//API to get Doctor Appointments for Doctor Panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;

    // Populate the userId field with user data
    const appointments = await appointmentModel
      .find({ docId })
      .populate("userId", "name image dob phone") // Specify the fields you want from user
      .populate("docId", "name image speciality"); // Also populate doctor data if needed

    // console.log("Populated appointments:", appointments);

    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Appointments error:", error);
    return res.json({ success: false, message: error.message });
  }
};

//API to mark Appointment Completed in Doctor's panel
const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId.toString() == docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed!" });
    } else {
      return res.json({
        success: false,
        message: "Failed to mark appointment completed!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

//API to mark Appointment Cancelled in Doctor's panel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId.toString() == docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled!" });
    } else {
      return res.json({
        success: false,
        message: "Failed to cancel this appointment!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

//API to get Doctor Dashboard
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;

    // Populate the userId field to get user data
    const appointments = await appointmentModel
      .find({ docId })
      .populate("userId", "name image dob phone"); // Add this populate

    let earnings = 0;
    appointments.forEach((item) => {
      // Changed from map to forEach since we're not returning anything
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];
    appointments.forEach((item) => {
      // Changed from map to forEach
      if (!patients.includes(item.userId.toString())) {
        patients.push(item.userId.toString());
      }
    });

    // Get latest appointments with populated user data
    const latestAppointments = appointments
      .sort((a, b) => b.date - a.date) // Sort by date descending (newest first)
      .slice(0, 5);

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: latestAppointments,
    };

    console.log("Dashboard data:", dashData); // Debug log

    res.json({ success: true, dashData });
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.json({ success: false, message: error.message });
  }
};

//API to get doctor profile
const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.json({ success: false, message: error.message });
  }
};

//API to update Doctor profile data from Doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const { fees, address, available } = req.body;

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res.json({ success: true, message: "Profile Updated!" });
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailablity,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
