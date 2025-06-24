require("dotenv").config();
const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO_URI).then(console.log("Database Connected"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  gender: String,
  dob: String,
  address: String,
  password: String,
  latitude: String,
  longitude: String,
  deviceInfo: String,
});

module.exports = mongoose.model("user", userSchema);
