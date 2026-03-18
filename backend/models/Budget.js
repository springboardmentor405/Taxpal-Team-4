const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  category:    { type: String, required: true },
  amount:      { type: Number, required: true },
  month:       { type: String, required: true },
  description: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("budgets", BudgetSchema);