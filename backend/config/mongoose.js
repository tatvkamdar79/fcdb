const mongoose = require("mongoose");
const url = process.env.DB_URI;

module.exports.connectToDatabase = async () => {
  try {
    const db = await mongoose.connect(url);
    console.log("Successfully connected to database");
    return db;
  } catch (err) {
    console.log("error connecting to db", err);
  }
};
