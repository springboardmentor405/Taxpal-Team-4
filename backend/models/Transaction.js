const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  description: { type: String, required: true },
  amount:      { type: Number, required: true },
  category:    { type: String, required: true },
  date:        { type: String, required: true },
  notes:       { type: String, default: "" },
  type:        { type: String, enum: ["income", "expense"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("transactions", TransactionSchema);