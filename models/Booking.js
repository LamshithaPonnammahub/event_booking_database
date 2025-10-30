// import mongoose from "mongoose";
// // import mongoose from "mongooose";
// const studentSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     age:{
//         type:Number,
//         required:true
//     },
//     course:{
//         type:String,
//     required:true},
// grade:{
//     type: String,
//     default:"A"
// },
// createdAt:{
//     type:Date,default:Date.now}


   
// });
// export const Student=mongoose.model("Student",studentSchema);
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  event: { type: String, required: true, trim: true },
  ticketType: { type: String, default: "General" },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

