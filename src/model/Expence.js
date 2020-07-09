const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenceSchema = new Schema(
  {
    title: {
      type: String,
    },
    moneyStatus: {
      type: String,
    },
    transactionAmount: {
      type: Number,
    },
    date: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Expence", expenceSchema);
