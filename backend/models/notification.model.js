const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    type: {
      type: String,
      enum: ["student", "attendance", "system"],
      default: "system",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);