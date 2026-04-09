const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// GET all rooms
router.get("/", async (req, res) => {
  const rooms = await Room.find().sort({ createdAt: -1 });
  res.json(rooms);
});

// POST create room allocation
router.post("/", async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    await Notification.create({
      message: `Room allocated to ${room.patientName}`,
      type: "Room"
    });
    res.json({ message: "Room allocated", room });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update room allocation
router.put("/:id", async (req, res) => {
  try {
    const updated = await Room.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE room allocation
router.delete("/:id", async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room de-allocated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
