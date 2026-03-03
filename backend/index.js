const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/Taxpal")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.json("No record existed");
  }

  // compare hashed password
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    res.json("success");
  } else {
    res.json("password is incorrect");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json("User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json("Account created");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
