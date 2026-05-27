const express = require("express");

const router = express.Router();

const {
  addCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  getMyCourses,
} = require("../controllers/course.controller");

const {
  isAuth,
  isAdmin,
} = require("../middleware/auth.middleware");

const {
  enrollCourse,
  assignCourseToStudent,
} = require("../controllers/enroll.controller");

// =========================
// ADMIN ROUTES
// =========================
router.post(
  "/add",
  isAuth,
  isAdmin,
  addCourse
);

router.put(
  "/update/:id",
  isAuth,
  isAdmin,
  updateCourse
);

router.delete(
  "/delete/:id",
  isAuth,
  isAdmin,
  deleteCourse
);

// =========================
// USER COURSE FEATURES
// =========================

// Get My Courses
router.get(
  "/my",
  isAuth,
  getMyCourses
);

// Student Enroll
router.post(
  "/enroll",
  isAuth,
  enrollCourse
);

// Admin Assign Course
router.post(
  "/assign",
  isAuth,
  isAdmin,
  assignCourseToStudent
);

// =========================
// PUBLIC / COMMON ROUTES
// =========================

// Get All Courses
router.get(
  "/all",
  isAuth,
  getCourses
);

// Get Single Course
router.get(
  "/:id",
  isAuth,
  getCourse
);

module.exports = router;