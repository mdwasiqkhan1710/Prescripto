import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

//API for adding a new Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
    } = req.body;
    const imageFile = req.file;

    //Checking if we have data in all fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fee ||
      !address
    ) {
      return res.json({
        success: false,
        message:
          "Some fields are missing, please fill all the fields to proceed!",
      });
    }

    //Validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email!",
      });
    }

    //Validating strong password
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please enter a strong password!",
      });
    }

    //Hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Upload Image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fee,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor data added successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for getting all Doctors list for Admin Panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get All Appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    console.log("Fetching appointments with populated data...");

    // Populate both user and doctor data
    const appointments = await appointmentModel
      .find({})
      .populate("userId", "name image dob") // Populate user data
      .populate("docId", "name image speciality address") // Populate doctor data
      .sort({ date: -1 }); // Sort by most recent first

    console.log(`Found ${appointments.length} appointments`);

    // Transform the data to maintain compatibility with frontend
    const transformedAppointments = appointments.map((appointment) => {
      return {
        ...appointment._doc,
        userData: appointment.userId
          ? {
              name: appointment.userId.name,
              image: appointment.userId.image,
              dob: appointment.userId.dob,
            }
          : null,
        docData: appointment.docId
          ? {
              name: appointment.docId.name,
              image: appointment.docId.image,
              speciality: appointment.docId.speciality,
              address: appointment.docId.address,
            }
          : null,
      };
    });

    res.json({ success: true, appointments: transformedAppointments });
  } catch (error) {
    console.log("Error in appointmentsAdmin:", error);
    res.json({ success: false, message: error.message });
  }
};

//API for cancelling an Appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found!" });
    }

    // Check if already cancelled
    if (appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment is already cancelled!",
      });
    }

    // Update the appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Making the slot available again for the doctor
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    // Check if the slotDate exists and has the slotTime
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );

      // If the array becomes empty, you might want to remove the date key
      if (slots_booked[slotDate].length === 0) {
        delete slots_booked[slotDate];
      }
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled!" });
  } catch (error) {
    console.log("Cancel appointment error:", error);
    res.json({ success: false, message: error.message });
  }
};

//API to get doctors data for Admin Dashboard
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel
      .find({})
      .populate("userId", "name image dob") // Populate user data
      .populate("docId", "name image speciality address") // Populate doctor data
      .sort({ date: -1 }) // Sort by most recent first
      .limit(5); // Get only latest 5 appointments

    // Transform the appointments to match frontend structure
    const transformedAppointments = appointments.map((appointment) => {
      return {
        ...appointment._doc,
        userData: appointment.userId
          ? {
              name: appointment.userId.name,
              image: appointment.userId.image,
              dob: appointment.userId.dob,
            }
          : null,
        docData: appointment.docId
          ? {
              name: appointment.docId.name,
              image: appointment.docId.image,
              speciality: appointment.docId.speciality,
              address: appointment.docId.address,
            }
          : null,
      };
    });

    const dashData = {
      doctors: doctors.length,
      appointments: await appointmentModel.countDocuments(), // Get total count
      patients: users.length,
      latestAppointment: transformedAppointments,
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log("Dashboard error:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
