// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// const UserModel = mongoose.model("users", UserSchema);
// module.exports = UserModel;






const mongoose = require("mongoose");
const bcrypt   = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  email:         { type: String, required: true, unique: true, lowercase: true },
  password:      { type: String, required: true },
  photo:         { type: String, default: "" },
  categories:    { type: [String], default: [] },
  notifications: {
    email:      { type: Boolean, default: true },
    app:        { type: Boolean, default: true },
    marketing:  { type: Boolean, default: true },
  },
  twoFA:         { type: Boolean, default: false },
  devices: [{
    name:      String,
    date:      String,
    isCurrent: Boolean
  }]
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("users", UserSchema);