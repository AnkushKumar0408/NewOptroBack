const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ankushpal7228:ankush0408@cluster0.w5zlrts.mongodb.net/optronix"
  )
  .then(console.log("Database Connected"));

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema);
