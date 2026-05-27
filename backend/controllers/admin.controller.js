const User = require("../models/user.model.js");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Course = require("../models/course.model.js");
const Enrollment = require("../models/enrollment.model.js");

// ===============================
// Register Admin
// ===============================
const registerAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check Existing Admin
    const adminExists = await User.findOne({ email });

    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create Admin
    const admin = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      success: true,
      message: "Admin Registered Successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Login Admin
// ===============================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find Admin
    const admin = await User.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Check Role
    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    // Check Password
    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate Token
    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Admin Login Successful",
      token,
      user: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// controllers/admin.controller.js
// ===============================

// ===============================
// GET ADMIN PROFILE
// ===============================
const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(
      req.user.id
    ).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE ADMIN SETTINGS
// ===============================
const updateAdminSettings = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      notifications,
    } = req.body;

    const admin = await User.findById(
      req.user.id
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // =========================
    // EMAIL CHECK
    // =========================
    if (
      email &&
      email !== admin.email
    ) {
      const exists = await User.findOne({
        email,
      });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    // =========================
    // UPDATE DATA
    // =========================
    admin.name = name || admin.name;

    admin.email = email || admin.email;

    admin.notifications =
      notifications ?? admin.notifications;

    // =========================
    // UPDATE PASSWORD
    // =========================
    if (password && password.length >= 6) {
      const hashedPassword =
        await bcrypt.hash(password, 10);

      admin.password = hashedPassword;
    }

    await admin.save();

    res.status(200).json({
      success: true,
      message:
        "Settings updated successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================
// CREATE USER
// ==========================
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// ASSIGN COURSE TO USER
// ==========================
const assignCourseToUser = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({
        success: false,
        message: "User or Course not found",
      });
    }

    // check already enrolled
    const already = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (already) {
      return res.status(400).json({
        success: false,
        message: "User already enrolled in this course",
      });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
      progress: 0,
      status: "Active",
    });

    res.status(201).json({
      success: true,
      message: "Course assigned successfully",
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
  registerAdmin,
  loginAdmin,
    getAdminProfile,
  updateAdminSettings,
    createUser,
  assignCourseToUser,
};