import dotenv from "dotenv";
import mongoDBConnect from "./config/config.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import Admin from "./models/admin.js";
import Instructor from "./models/instructor.js";
import adminRoutes from "./modules/admin/admin.route.js";
import instructorRoutes from "./modules/instructor/instructor.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));

mongoDBConnect();

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (admin && await bcrypt.compare(password, admin.password)) {
    const token = jwt.sign(
      { id: admin._id, userType: "admin" },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true });
    return res.json({ userType: "admin" });
  }

  const instructor = await Instructor.findOne({ username });

  if (instructor && await bcrypt.compare(password, instructor.password)) {
    const token = jwt.sign(
      { id: instructor._id, userType: "instructor" },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true });
    return res.json({ userType: "instructor" });
  }

  return res.status(401).json({ message: "Invalid Credentials" });
});

app.use("/admin", adminRoutes);
app.use("/instructor", instructorRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});