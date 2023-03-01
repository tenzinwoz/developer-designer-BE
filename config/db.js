import mongoose from "mongoose";
import config from "config";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.get("mongoDB"));
    console.log("Connected to Database");
  } catch (error) {
    console.log(error.message);
  }
};
