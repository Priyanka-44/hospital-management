const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");

// GET all bills
router.get("/", async (req, res) => {
  const bills = await Bill.find().sort({ createdAt: -1 });
  res.json(bills);
});

// POST create bill
router.post("/", async (req, res) => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    await Notification.create({
  message: `New bill generated for ${bill.patientName}`,
  type: "Billing"
});
    res.json({ message: "Bill created", bill });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update bill
router.put("/:id", async (req, res) => {
  try {
    const updated = await Bill.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE bill
router.delete("/:id", async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.json({ message: "Bill deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
