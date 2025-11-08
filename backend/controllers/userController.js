import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

//API to register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Checking if all fields are available
    if (!name || !email || !password === undefined) {
      return res.json({
        success: false,
        message: "Missing details, please fill all fields to proceed!",
      });
    }

    //Checking if all Email is Valid or not
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email!",
      });
    }

    //Checking if password length is greater than 8
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter at least 8 digit password to proceed!",
      });
    }

    //Hashing User Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = { name, email, password: hashedPassword };

    const newUser = new userModel(userData);

    const user = await newUser.save();

    //Creating a Token for New User, so that he can login to account
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    const user = await await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "No user found. Please enter valid Email!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Password!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to fecth User Profile Data
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to update user Profile
const updateProfile = async (req, res) => {
  try {
    // get userId from auth middleware
    const userId = req.userId;
    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized: missing user id",
      });
    }

    // pull other fields from body (address might be sent as JSON string via multipart)
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    // basic validation (adjust as needed)
    if (!name || !phone || !dob || !gender) {
      return res.json({
        success: false,
        message: "Please fill all required fields to proceed!",
      });
    }

    // prepare update object
    const updateObj = {
      name,
      phone,
      dob,
      gender,
    };

    // if address was sent as string (from form-data), parse it
    if (address) {
      try {
        updateObj.address =
          typeof address === "string" ? JSON.parse(address) : address;
      } catch (err) {
        // if parsing fails, return error so client can correct
        return res.json({
          success: false,
          message: "Address must be valid JSON.",
        });
      }
    }

    // update basic fields, return the new doc
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateObj, {
      new: true,
    });
    if (!updatedUser) {
      return res.json({ success: false, message: "User not found." });
    }

    // if image file is present, upload and then update image field
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      updatedUser.image = imageUrl;
      await updatedUser.save();
    }

    return res.json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//API for Booking appointment with doctor
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.json({ success: false, message: "User not authorized!" });
    }
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available!" });
    }

    let slots_booked = docData.slots_booked;

    //Checking for the availaibilty of selected slot
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot not available for booking!",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fee,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //Save new Slots data in Doctor data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked!" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//API to get all User Appointments for frontend my-appointments page
const listAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({ userId: req.userId })
      .populate("docId", "name image speciality address") // This populates doctor data
      .sort({ date: -1 });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//API to cancel Doctors appointment
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    // console.log("User ID from token:", userId);
    // console.log("Appointment ID:", appointmentId);

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found!" });
    }

    console.log("Appointment user ID:", appointmentData.userId);
    console.log("Appointment user ID type:", typeof appointmentData.userId);
    console.log("User ID type:", typeof userId);

    // FIX: Convert both to string for comparison
    if (appointmentData.userId.toString() !== userId.toString()) {
      console.log("User ID mismatch!");
      return res.json({
        success: false,
        message: "You are not authorized to cancel this appointment!",
      });
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

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//API for making payment using Razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found!",
      });
    }

    //Creating Options for appointment payment
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    //creating an Order
    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to verify Razorpay Payment Success
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status == "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment Successful!" });
    } else {
      res.json({ success: true, message: "Payment Failed!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
};
