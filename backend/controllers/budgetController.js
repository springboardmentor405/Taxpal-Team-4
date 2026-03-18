const Budget = require("../models/Budget");

// GET all
exports.getAll = async (req, res) => {
  try {
    const budgets = await Budget
      .find({ user: req.userId })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: budgets });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create
exports.create = async (req, res) => {
  try {
    const { category, amount, month, description } = req.body;
    const budget = await Budget.create({
      user: req.userId,
      category, amount, month, description
    });
    res.status(201).json({ success: true, data: budget });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget)
      return res.status(404).json({ message: "Not found" });
    if (budget.user.toString() !== req.userId)
      return res.status(401).json({ message: "Not authorized" });

    await budget.deleteOne();
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};