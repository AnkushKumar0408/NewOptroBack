const express = require("express");
const cors = require("cors");
const mongoose = require("./model/user");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://new-optro.vercel.app", // your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("This is backend for Optronix");
});

// app.post("/register", async (req, res) => {
//   const {
//     fullName,
//     email,
//     phone,
//     gender,
//     dob,
//     address,
//     password,
//     confirmPassword,
//     latitude,
//     longitude,
//     deviceInfo,
//   } = req.body;
//   let user = await mongoose.create({
//     fullName,
//     email,
//     phone,
//     gender,
//     dob,
//     address,
//     password,
//     confirmPassword,
//     latitude,
//     longitude,
//     deviceInfo,
//   });
// });

app.post("/register", async (req, res) => {
  try {
    const customer = new mongoose(req.body);
    await customer.save();
    res.status(201).send("Registered");
  } catch (err) {
    console.error(err);
    res.status(400).send("Error");
  }
});

app.get("/customer/:phone", async (req, res) => {
  try {
    const customer = await mongoose.findOne({ phone: req.params.phone });
    if (!customer) return res.status(404).send("Not found");
    res.json(customer);
  } catch (err) {
    res.status(400).send("Error");
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});

module.exports = app;
