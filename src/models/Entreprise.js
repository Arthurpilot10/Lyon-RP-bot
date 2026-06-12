const mongoose = require("mongoose");
module.exports = mongoose.model("Entreprise", new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  employeeCount: Number,
  founders: [String],
  createdBy: String,
  createdAt: { type: Date, default: Date.now }
}));
