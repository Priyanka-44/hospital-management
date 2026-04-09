const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  patientName: { 
    type: String, 
    required: true 
  },
  roomNumber: { 
    type: String, 
    required: true 
  },
  wardType: {
    type: String,
    enum: ["General", "Private", "ICU"],
    required: true
  },
  bedNumber: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    enum: ["Occupied", "Available"],
    default: "Occupied"
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Room", roomSchema);
