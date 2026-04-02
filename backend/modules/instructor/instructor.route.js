import express from "express";
import { isLoggedIn } from "../../middleware/auth.js";
import { getMyLectures } from "./instructor.controller.js";

const router = express.Router();

router.get("/lectures", isLoggedIn, getMyLectures);

export default router;