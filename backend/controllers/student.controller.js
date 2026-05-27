// ===============================
// controllers/student.controller.js
// ===============================

const Student = require("../models/student.model.js");

const bcrypt = require("bcryptjs");

const cloudinary = require("cloudinary").v2;
const createNotification = require("../utils/createNotification.js");

// ===============================
// Add Student
// ===============================
const addStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      course,
      status,
    } = req.body;

    // Check Student
    const studentExists = await Student.findOne({ email });

    if (studentExists) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload Image
    let imageUrl = "";

    if (req.files && req.files.image) {
      const file = req.files.image;

      const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
          folder: "students",
        }
      );

      imageUrl = result.secure_url;
    }

    // Create Student
    const student = await Student.create({
      name,
      email,
      phone,
      password: hashedPassword,
      image: imageUrl,
      course,
      status,
    });

    // ✅ AUTO NOTIFICATION (IMPORTANT)
    await createNotification({
      title: "New Student Added",
      message: `${student.name} has been registered successfully.`,
      type: "student",
    });

    res.status(201).json({
      success: true,
      message: "Student Added Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Students
// ===============================
const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("course")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// Get Single Student
// ===============================
// ===============================
// Get Single Student
// ===============================
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(
      req.params.id
    ).populate("course");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Student
// ===============================
const updateStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      course,
      status,
    } = req.body;

    let updateData = {
      name,
      email,
      phone,
      course,
      status,
    };

    // Upload New Image
    if (req.files && req.files.image) {
      const file = req.files.image;

      const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
          folder: "students",
        }
      );

      updateData.image = result.secure_url;
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Student
// ===============================
const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};