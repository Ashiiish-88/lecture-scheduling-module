import mongoose from 'mongoose'
import bcrypt from "bcrypt";

const instructorSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

instructorSchema.pre("save", async function () {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  
});

const Instructor = mongoose.model("Instructor",instructorSchema);

export default Instructor