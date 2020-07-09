const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
