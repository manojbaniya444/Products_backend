const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "normal",
    },
  },
  {
    timestamps: true,
  }
);

const UserProducts = mongoose.model("User", userSchema);
module.exports = UserProducts;
