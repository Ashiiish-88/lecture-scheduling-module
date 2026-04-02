import express from "express";
import { isLoggedIn } from "../../middleware/auth.js";
import { getInstructors, getCourses, getLectures, createCourse, createLecture } from "./admin.controller.js";

const router = express.Router();

router.get("/instructors", isLoggedIn, getInstructors);
router.get("/courses", isLoggedIn, getCourses);
router.get("/lectures", isLoggedIn, getLectures);
router.post("/course", isLoggedIn, createCourse);
router.post("/lecture", isLoggedIn, createLecture);

export default router;