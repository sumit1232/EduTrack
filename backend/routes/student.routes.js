// ===============================
// routes/student.routes.js
// ===============================

const express = require("express");

const router = express.Router();

const {
  addStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller.js");

const {
  isAuth,
  isAdmin,
} = require("../middleware/auth.middleware.js");

// ===============================
// Routes
// ===============================

// Add Student
router.post(
  "/add",
  isAuth,
  isAdmin,
  addStudent
);

// Get All Students
router.get(
  "/all",
  isAuth,
  isAdmin,
  getStudents
);

// Get Single Student
router.get(
  "/:id",
  isAuth,
  isAdmin,
  getStudent
);

// Update Student
router.put(
  "/update/:id",
  isAuth,
  isAdmin,
  updateStudent
);

// Delete Student
router.delete(
  "/delete/:id",
  isAuth,
  isAdmin,
  deleteStudent
);

module.exports = router;