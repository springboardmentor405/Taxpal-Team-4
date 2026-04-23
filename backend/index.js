const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const OtpModel = require("./models/Otp");
const nodemailer = require("nodemailer");
require("dotenv").config();

// ── NEW: Dashboard models ──
const Transaction = require("./models/Transaction");
const Budget = require("./models/Budget");
const Report = require("./models/Report");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/Taxpal")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ── JWT Middleware ──
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer"))
    return res.status(401).json({ message: "Not authorized" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "taxpal_secret",
    );
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Token invalid" });
  }
};

// ════════════════════════════════════
// YOUR EXISTING ROUTES — unchanged
// ════════════════════════════════════

// NEW — returns object with token
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.json({ message: "No record existed" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ message: "Password is incorrect" });

  // ── Generate JWT token ──
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "taxpal_secret",
    { expiresIn: "7d" },
  );

  res.json({
    message: "success",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});
// REMOVE manual hashing — let model do it
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.json("User already exists");

    // ── DON'T hash here — model pre-save hook will hash ──
    const user = await UserModel.create({ name, email, password });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "taxpal_secret",
      { expiresIn: "7d" },
    );

    res.json({
      message: "Account created",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.json("User not found");

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    await OtpModel.create({ email, otp });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
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
  if (!otpRecord) return res.json({ message: "Invalid OTP" });
  res.json({ message: "OTP verified" });
});

// REMOVE manual hashing here too — let pre-save hook do it
app.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.json("User not found");

  // ── Don't hash manually — pre-save hook handles it ──
  user.password = password; // ← plain password, hook will hash
  await user.save();
  await OtpModel.deleteMany({ email });
  res.json("Password updated");
});

// ════════════════════════════════════
// NEW: Dashboard Routes
// ════════════════════════════════════

// ── TRANSACTIONS ──
app.get("/api/transactions", protect, async (req, res) => {
  try {
    const txs = await Transaction.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: txs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/transactions", protect, async (req, res) => {
  try {
    const { description, amount, category, date, notes, type } = req.body;
    const tx = await Transaction.create({
      user: req.userId,
      description,
      amount,
      category,
      date,
      notes,
      type,
    });
    res.status(201).json({ success: true, data: tx });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/transactions/:id", protect, async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ message: "Not found" });
    if (tx.user.toString() !== req.userId)
      return res.status(401).json({ message: "Not authorized" });
    await tx.deleteOne();
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── BUDGETS ──
app.get("/api/budgets", protect, async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: budgets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/budgets", protect, async (req, res) => {
  try {
    const { category, amount, month, description } = req.body;
    const budget = await Budget.create({
      user: req.userId,
      category,
      amount,
      month,
      description,
    });
    res.status(201).json({ success: true, data: budget });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/budgets/:id", protect, async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: "Not found" });
    if (budget.user.toString() !== req.userId)
      return res.status(401).json({ message: "Not authorized" });
    await budget.deleteOne();
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── REPORTS ──
app.get("/api/reports", protect, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT — update transaction
app.put("/api/transactions/:id", protect, async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ message: "Not found" });
    if (tx.user.toString() !== req.userId)
      return res.status(401).json({ message: "Not authorized" });

    const { description, amount, category, date, notes } = req.body;
    tx.description = description;
    tx.amount = amount;
    tx.category = category;
    tx.date = date;
    tx.notes = notes;
    await tx.save();

    res.json({ success: true, data: tx });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get profile
// ── GET profile ──
app.get("/api/settings/profile", protect, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── UPDATE categories ──
app.put("/api/settings/categories", protect, async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.userId,
      { categories: req.body.categories },
      { new: true },
    ).select("-password");
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── UPDATE notifications ──
app.put("/api/settings/notifications", protect, async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.userId,
      { notifications: req.body.notifications },
      { new: true },
    ).select("-password");
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── UPDATE 2FA ──
app.put("/api/settings/2fa", protect, async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.userId,
      { twoFA: req.body.twoFA },
      { new: true },
    ).select("-password");
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── CHANGE password ──
app.put("/api/settings/password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await UserModel.findById(req.userId);

    // ── Compare current password ──
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res.status(400).json({ message: "Current password is incorrect" });

    // ── Set plain password — pre-save hook will hash ──
    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE profile
app.put("/api/settings/profile", protect, async (req, res) => {
  try {
    const { name, email } = req.body;

    // check if email taken by another user
    const existing = await UserModel.findOne({ email });
    if (existing && existing._id.toString() !== req.userId)
      return res.status(400).json({ message: "Email already taken" });

    const user = await UserModel.findByIdAndUpdate(
      req.userId,
      { name, email },
      { new: true },
    ).select("-password");

    // update localStorage token info
    res.json({ success: true, data: user, message: "Profile updated!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/reports", protect, async (req, res) => {
  try {
    const { type, period, format } = req.body;
    const records = await Transaction.countDocuments({ user: req.userId });
    const report = await Report.create({
      user: req.userId,
      type,
      period,
      format,
      records,
      date: new Date().toLocaleDateString("en-IN"),
    });
    res.status(201).json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3001, () => console.log("🚀 Server running on port 3001"));
