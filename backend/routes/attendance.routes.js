const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getStudentAttendance,
  deleteAttendance,
} = require("../controllers/attendance.controller");

const { isAuth, isAdmin } = require("../middleware/auth.middleware");

// Admin only
router.post("/mark", isAuth, isAdmin, markAttendance);

router.get("/all", isAuth, isAdmin, getAttendance);

router.get("/student/:id", isAuth, getStudentAttendance);

router.delete("/:id", isAuth, isAdmin, deleteAttendance);

module.exports = router;