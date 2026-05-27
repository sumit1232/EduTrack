const express = require("express");
const router = express.Router();

const Notification = require("../models/notification.model");

// GET ALL
router.get("/", async (req, res) => {
  const notifications = await Notification.find()
    .sort({ createdAt: -1 });

  res.json({ notifications });
});

// MARK AS READ
router.patch("/read/:id", async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, {
    read: true,
  });

  res.json({ message: "Marked as read" });
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted" });
});

module.exports = router;