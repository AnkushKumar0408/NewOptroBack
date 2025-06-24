const express = require("express");
const cors = require("cors");
const User = require("./model/user");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://new-optro.vercel.app/", // your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("This is backend for Optronix");
});

app.post('/register', async (req, res) => {
  try {
    const customer = new User(req.body);
    await customer.save();
    res.status(201).send('Registered');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error');
  }
});

app.get("/customer/:phone", async (req, res) => {
  try {
    const customer = await User.findOne({ phone: req.params.phone }); // ✅ correct
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
