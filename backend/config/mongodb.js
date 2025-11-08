import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database successfully!");
  } catch (err) {
    console.log("Mongodb connection failed!\n", err);
    process.exit(1);
  }
};

export default connectDb;
