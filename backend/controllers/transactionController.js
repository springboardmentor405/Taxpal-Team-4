const Transaction = require("../models/Transaction");

// GET all
exports.getAll = async (req, res) => {
  try {
    const transactions = await Transaction
      .find({ user: req.userId })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: transactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create
exports.create = async (req, res) => {
  try {
    const { description, amount, category, date, notes, type } = req.body;
    const tx = await Transaction.create({
      user: req.userId,
      description, amount, category, date, notes, type
    });
    res.status(201).json({ success: true, data: tx });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx)
      return res.status(404).json({ message: "Not found" });
    if (tx.user.toString() !== req.userId)
      return res.status(401).json({ message: "Not authorized" });

    await tx.deleteOne();
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};