const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// Get latest notifications
router.get("/", async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 }).limit(20);
  res.json(notifications);
});

module.exports = router;
