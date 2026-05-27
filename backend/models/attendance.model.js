const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    date: {
      type: String, // "2026-05-25"
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      default: "Present",
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);