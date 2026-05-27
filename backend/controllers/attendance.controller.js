const Attendance = require("../models/attendance.model");
const Student = require("../models/student.model");
const createNotification = require("../utils/createNotification");

const markAttendance = async (req, res) => {
  try {
    const { student, date, status } = req.body;

    const attendance = await Attendance.create({
      student,
      date,
      status,
      markedBy: req.user.id,
    });

    const studentInfo = await Student.findById(student);

    // ✅ AUTO NOTIFICATION
    await createNotification({
      title: "Attendance Marked",
      message: `${studentInfo.name} marked as ${status} on ${date}`,
      type: "attendance",
    });

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      attendance,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get Attendance (All)
// =======================
const getAttendance = async (req, res) => {
  try {
    const data = await Attendance.find()
      .populate("student", "name email image")
      .populate("markedBy", "name");

    res.status(200).json({
      success: true,
      attendance: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get Student Attendance
// =======================
const getStudentAttendance = async (req, res) => {
  try {
    const data = await Attendance.find({
      student: req.params.id,
    });

    res.status(200).json({
      success: true,
      attendance: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Delete Attendance
// =======================
const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Attendance deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getAttendance,
  getStudentAttendance,
  deleteAttendance,
};