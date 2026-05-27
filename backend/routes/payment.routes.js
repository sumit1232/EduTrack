// ===============================
// routes/payment.routes.js
// ===============================

const express = require("express");

const router = express.Router();

const {
  createOrder,
  verifyPayment,
  getPayments,
} = require("../controllers/payment.controller");

// ===============================
// Create Razorpay Order
// ===============================
router.post("/create-order", createOrder);

// ===============================
// Verify Payment
// ===============================
router.post("/verify", verifyPayment);

// ===============================
// Get All Payments
// ===============================
router.get("/all", getPayments);

module.exports = router;