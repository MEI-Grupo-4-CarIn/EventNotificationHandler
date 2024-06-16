const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    tokens: { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", TokenSchema);
