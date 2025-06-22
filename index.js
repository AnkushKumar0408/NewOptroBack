const express = require("express");
const cors = require("cors");
const mongoose = require("./model/user");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is backend for Optronix");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await mongoose.create({
    name,
    email,
    password,
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});
