import mongoose from "mongoose";

// me idhr bs mongodb atlas connect krrha hu apne cluster se
export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://Kalpit:mongodb@cluster0.ng9lvns.mongodb.net/food-delivery"
    )
    .then(() => console.log("Connected to MongoDB"));
};
