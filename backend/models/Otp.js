const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: 60 }, // OTP auto delete after 1 minutes
  },
});

const OtpModel = mongoose.model("otps", OtpSchema);

module.exports = OtpModel;
