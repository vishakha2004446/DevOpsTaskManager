import mongoose from "mongoose";

const connectDB = async() => {
    try{
       console.log("Attempting to connect to MongoDB at:", process.env.MONGO_URI);
       await mongoose.connect(process.env.MONGO_URI);
       console.log("MongoDB connected successfully");
    }catch(err){
        console.error("MongoDB connection failed:", err.message);
        console.error("Full error:", err);
        process.exit(1);
    }
};
export default connectDB;