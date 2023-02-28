const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("mongoDB"));
    console.log("Connected to Database");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
