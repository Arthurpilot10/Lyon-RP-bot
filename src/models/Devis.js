const mongoose = require("mongoose");
module.exports = mongoose.model("Devis", new mongoose.Schema({
  entreprise: String,
  targetId: String,
  authorId: String,
  description: String,
  amount: Number,
  status: { type: String, default: "en attente" },
  createdAt: { type: Date, default: Date.now }
}));
