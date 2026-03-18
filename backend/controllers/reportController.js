const Report      = require("../models/Report");
const Transaction = require("../models/Transaction");

// GET all
exports.getAll = async (req, res) => {
  try {
    const reports = await Report
      .find({ user: req.userId })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST generate
exports.generate = async (req, res) => {
  try {
    const { type, period, format } = req.body;
    const records = await Transaction.countDocuments({ user: req.userId });

    const report = await Report.create({
      user: req.userId,
      type, period, format, records,
      date: new Date().toLocaleDateString("en-IN")
    });
    res.status(201).json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};