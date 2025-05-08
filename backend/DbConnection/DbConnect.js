import mongoose from "mongoose";
const dbconnection=async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/VirtualBusiness');
        console.log("Connected");
    }catch(err){
        console.log("Not connected",err);
    }
}
export default dbconnection;


