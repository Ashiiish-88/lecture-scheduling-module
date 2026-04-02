import Instructor from "../../models/instructor.js";
import Course from "../../models/course.js";
import Lecture from "../../models/lecture.js";


export const getInstructors = async (req, res) => {
  const instructors = await Instructor.find();
  res.json(instructors);
};

export const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

export const getLectures = async (req, res) => {
  const lectures = await Lecture.find()
    .populate("course")
    .populate("instructor");

  res.json(lectures);
};

export const createCourse = async (req, res) => {
  const { title, description, level, image } = req.body;

  const course = await Course.create({
    title,
    description,
    level,
    image
  });

  res.json(course);
};

export const createLecture = async (req, res) => {
  try {
    const { title, description, date, course, instructor } = req.body;

    const requestedDate = new Date(date);
    const startOfDay = new Date(requestedDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(requestedDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const existingLecture = await Lecture.findOne({
      instructor,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (existingLecture) {
      return res.status(400).json({
        message: "Instructor already has a lecture on this date"
      });
    }

    const lecture = await Lecture.create({
      title,
      description,
      date: startOfDay,
      course,
      instructor
    });

    res.json({
      message: "Lecture created successfully",
      lecture
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate lecture not allowed"
      });
    }

    console.error(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};