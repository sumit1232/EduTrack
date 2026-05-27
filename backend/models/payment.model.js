// ===============================
// models/payment.model.js
// ===============================

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    studentName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    course: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentId: {
      type: String,
      required: true,
    },

    orderId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Success", "Pending", "Failed"],
      default: "Success",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Payment",
  paymentSchema
);