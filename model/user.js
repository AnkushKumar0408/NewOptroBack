require("dotenv").config();
const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO_URI).then(console.log("Database Connected"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema);
