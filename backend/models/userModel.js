import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter valid email address."],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://plus.unsplash.com/premium_photo-1739178656557-16b949fea186?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
    },
    address: {
      type: Object,
      required: true,
      default: {
        line1: "",
        line2: "",
      },
    },
    gender: {
      type: String,
      default: "Not specified",
    },
    dob: {
      type: Date,
      default: null,
    },
    phone: {
      type: String,
      default: "0000-000-000",
    },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
