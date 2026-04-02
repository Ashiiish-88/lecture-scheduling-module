import mongoose from 'mongoose'

const mongoDBConnect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected!!")
    }catch(e){
        console.log(e);
    }
}

export default mongoDBConnect;