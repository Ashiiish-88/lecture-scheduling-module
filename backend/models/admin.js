import mongoose from 'mongoose'
import bcrypt from "bcrypt";

const adminSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});


const Admin = mongoose.model("Admin",adminSchema);

export default Admin