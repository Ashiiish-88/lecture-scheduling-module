import mongoose from 'mongoose'

const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    level: String,
    image: String
})

const Course = mongoose.model("Course",courseSchema);

export default Course