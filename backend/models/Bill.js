const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Paid", "Unpaid", "Partial"],
    default: "Unpaid"
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "Insurance"],
    default: "Cash"
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bill", billSchema);
