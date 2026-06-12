const mongoose = require("mongoose");
module.exports = mongoose.model("User", new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  lastSalary: { type: Date, default: null },
  fines: [{ reason: String, amount: Number, date: String, officerId: String, createdAt: { type: Date, default: Date.now } }],
  onDuty: { type: Boolean, default: false },
  dutyStartedAt: { type: Date, default: null },
  dutyHistory: [{ startedAt: Date, endedAt: Date, durationMs: Number }]
}));
