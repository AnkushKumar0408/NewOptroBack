const express = require("express");
const bcrypt = require("bcrypt");
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

app.post("/register", async (req, res) => {
  const {
    fullName,
    email,
    phone,
    gender,
    dob,
    address,
    password,
    confirmPassword,
    latitude,
    longitude,
    deviceInfo,
  } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  let user = await mongoose.create({
    fullName,
    email,
    phone,
    gender,
    dob,
    address,
    password: hashedPassword,
    confirmPassword: hashedPassword,
    latitude,
    longitude,
    deviceInfo,
  });
});

// app.post("/register", async (req, res) => {
//   try {
//     const customer = new mongoose(req.body);
//     await customer.save();
//     res.status(201).send("Registered");
//   } catch (err) {
//     console.error(err);
//     res.status(400).send("Error");
//   }
// });

// app.post("/register", async (req, res) => {
//   try {
//     const {
//       fullName,
//       email,
//       phone,
//       gender,
//       dob,
//       address,
//       password,
//       confirmPassword,
//       latitude,
//       longitude,
//       deviceInfo,
//     } = req.body;

//     // Check if password and confirmPassword match
//     if (password !== confirmPassword) {
//       return res.status(400).send("Passwords do not match");
//     }

//     // Hash the password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const user = await mongoose.create({
//       fullName,
//       email,
//       phone,
//       gender,
//       dob,
//       address,
//       password: hashedPassword, // Store hashed password
//       confirmPassword: hashedPassword, // Optional: or remove this field altogether
//       latitude,
//       longitude,
//       deviceInfo,
//     });

//     res.status(201).send("Registered");
//   } catch (err) {
//     console.error(err);
//     res.status(400).send("Error");
//   }
// });

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
