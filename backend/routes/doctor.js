const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

router.get("/", async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
});

router.post("/", async (req, res) => {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.json(doctor);
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
