const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Pending", "Inactive"],
      default: "Active",
    },

    role: {
      type: String,
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Student",
  studentSchema
);