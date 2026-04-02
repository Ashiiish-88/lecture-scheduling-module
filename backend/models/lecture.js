import mongoose from 'mongoose'

const lectureSchema = new mongoose.Schema({
  title: String,
  description: String,

  date: {
    type: Date,
    required: true,
    set: (value) => {
      const normalizedDate = new Date(value);
      normalizedDate.setUTCHours(0, 0, 0, 0);
      return normalizedDate;
    }
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true
  }
});

lectureSchema.index({ instructor: 1, date: 1 }, { unique: true });


const Lecture = mongoose.model("Lecture",lectureSchema);

export default Lecture
