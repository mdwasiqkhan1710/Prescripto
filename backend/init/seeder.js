import mongoose from "mongoose";
import dotenv from "dotenv";
import doctors from "../init/data.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGODB_URI not set in .env");
  process.exit(1);
}

// const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connected to Database successfully!");
//   } catch (err) {
//     console.log("Mongodb connection failed!\n", err);
//     process.exit(1);
//   }
// };

// connectDb();

const seedData = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    //Deleting old data
    await doctorModel.deleteMany({});

    // Loop through doctors and hash password
    for (let i = 0; i < doctors.length; i++) {
      const doc = { ...doctors[i] };

      // Hash password
      const salt = await bcrypt.genSalt(10);
      doc.password = await bcrypt.hash(doc.password, salt);

      // Save in DB
      await doctorModel.create(doc);
      console.log(`Inserted: ${doc.name}`);
    }
    console.log("Doctors seeding complete!");
    process.exit(0);

  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedData();