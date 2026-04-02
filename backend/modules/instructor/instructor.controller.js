import Lecture from "../../models/lecture.js";

export const getMyLectures = async (req, res) => {
  const lectures = await Lecture.find({ instructor: req.user.id })
    .populate("course");

  res.json(lectures);
};