const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  type:    { type: String, required: true },
  period:  { type: String, required: true },
  format:  { type: String, required: true },
  records: { type: Number, default: 0 },
  date:    { type: String },
}, { timestamps: true });

module.exports = mongoose.model("reports", ReportSchema);