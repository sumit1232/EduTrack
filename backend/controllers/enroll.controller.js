const Enrollment = require("../models/enrollment.model");
const Course = require("../models/course.model");
const User = require("../models/user.model");
const Student = require("../models/student.model");

// =========================
// STUDENT SELF ENROLL
// =========================
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Check course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check already enrolled
    const exists = await Enrollment.findOne({
      user: req.user.id,
      course: courseId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled",
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      user: req.user.id,
      course: courseId,
    });

    res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// ADMIN ASSIGN COURSE
// =========================
const assignCourseToStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // =========================
    // Check Student
    // =========================
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // =========================
    // Check Course
    // =========================
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // =========================
    // Already Assigned
    // =========================
    const exists = await Enrollment.findOne({
      user: studentId,
      course: courseId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Course already assigned",
      });
    }

    // =========================
    // Create Enrollment
    // =========================
    const enrollment = await Enrollment.create({
      user: studentId,
      course: courseId,
    });

    res.status(201).json({
      success: true,
      message: "Course assigned successfully",
      enrollment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET MY COURSES
// =========================
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user.id,
    })
      .populate("course")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// UPDATE PROGRESS
// =========================
const updateProgress = async (req, res) => {
  try {
    const { enrollmentId } = req.params;

    const { progress, status } = req.body;

    const enrollment = await Enrollment.findById(
      enrollmentId
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    enrollment.progress = progress ?? enrollment.progress;

    enrollment.status = status || enrollment.status;

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: "Progress updated",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  enrollCourse,
  assignCourseToStudent,
  getMyCourses,
  updateProgress,
};