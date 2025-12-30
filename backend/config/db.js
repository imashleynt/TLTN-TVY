import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://tuongvy:270303@cluster0.srmas9e.mongodb.net/coffee').then(()=>console.log("DB Connected"))
}