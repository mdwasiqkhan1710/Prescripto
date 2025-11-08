import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoutes.js";
import serverRouter from "./routes/doctorRoutes.js";
import userRouter from "./routes/userRoutes.js";

//App Configuration
const app = express();
const PORT = process.env.PORT || 4000;

//Middlewares
app.use(express.json());
app.use(cors());
connectDb();
connectCloudinary();

//API endpoint
app.use("/api/admin", adminRouter);
app.use("/api/doctor", serverRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}!!`);
});
