// import mongoose from "mongoose";
// export const connectDB=async ()=>{
//     try{
//         await mongoose.connect("mongodb://localhost:27017/studentDB");
//         console.log("MongoDB connected");
//     }
//     catch(error){
//         console.log("mongodb connection failed:",error.message);
//         process.exit(1);
//     }
//     };
const mongoose = require('mongoose');


async function connectDB(uri) {
try {
await mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true,
});
console.log('MongoDB connected');
} catch (err) {
console.error('MongoDB connection error:', err.message);
process.exit(1);
}
}


module.exports = connectDB;
