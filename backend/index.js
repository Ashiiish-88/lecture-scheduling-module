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
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

mongoDBConnect();

const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  maxAge: 1000 * 60 * 60 * 24 * 7
};

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (admin && await bcrypt.compare(password, admin.password)) {
    const token = jwt.sign(
      { id: admin._id, userType: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, cookieOptions);
    return res.json({ userType: "admin" });
  }

  const instructor = await Instructor.findOne({ username });

  if (instructor && await bcrypt.compare(password, instructor.password)) {
    const token = jwt.sign(
      { id: instructor._id, userType: "instructor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, cookieOptions);
    return res.json({ userType: "instructor" });
  }

  return res.status(401).json({ message: "Invalid Credentials" });
});

app.use("/admin", adminRoutes);
app.use("/instructor", instructorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});