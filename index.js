const express = require("express");
const cors = require("cors");
const mongoose = require("./model/user");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await mongoose.create({
    name,
    email,
    password,
  });
});

app.listen(3000, () => {
  console.log("Server Running");
});
