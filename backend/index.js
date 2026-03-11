const express = require("express");
const mongoose = require("mongoose");

const UserModel = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const OtpModel = require("./models/Otp");
const nodemailer = require("nodemailer");
require("dotenv").config();
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
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASS);
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
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Email from frontend:", email);

    const user = await UserModel.findOne({ email });

    console.log("User from DB:", user);

    if (!user) {
      return res.json("User not found");
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await OtpModel.create({ email, otp });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for Reset Password",
      text: `Your OTP is ${otp}`,
    });

    res.json({ Status: "OTP Sent" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Email sending failed" });
  }
});

app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const otpRecord = await OtpModel.findOne({ email, otp });

  if (!otpRecord) {
    return res.json({ message: "Invalid OTP" });
  }

  res.json({ message: "OTP verified" });
});

app.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.json("User not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;

  await user.save();

  await OtpModel.deleteMany({ email });

  res.json("Password updated");
});
