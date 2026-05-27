const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");

// =========================
// Add Course
// =========================
const addCourse = async (req, res) => {
  try {
    const { title, description, duration, level } = req.body;

    // Validation
    if (!title || !description || !duration) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Check duplicate
    const courseExists = await Course.findOne({ title });

    if (courseExists) {
      return res.status(400).json({
        success: false,
        message: "Course already exists",
      });
    }

    const course = await Course.create({
      title,
      description,
      duration,
      level,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get All Courses
// =========================
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Single Course
// =========================
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GET MY COURSES
// ==========================
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user.id,
    }).populate("course");

    const courses = enrollments
      .filter((item) => item.course) // safety check
      .map((item) => ({
        _id: item.course._id,
        title: item.course.title,
        description: item.course.description,
        image: item.course.image || null,

        progress: item.progress || 0,
        status: item.status || "Active",

        enrolledAt: item.createdAt,
      }));

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("getMyCourses error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

module.exports = {
  getMyCourses,
};

// =========================
// Update Course
// =========================
const updateCourse = async (req, res) => {
  try {
    const { title, description, duration, level } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Optional duplicate check (only if title is changed)
    if (title && title !== course.title) {
      const exists = await Course.findOne({ title });
      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Course title already exists",
        });
      }
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.duration = duration || course.duration;
    course.level = level || course.level;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Delete Course
// =========================
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  getMyCourses
};