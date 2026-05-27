import React, { useEffect, useState } from "react";
import axios from "axios";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  Users,
  BookOpen,
  GraduationCap,
  Activity,
  TrendingUp,
  Download,
} from "lucide-react";

const AdminDashboard = () => {
  const API = "http://localhost:3000/api";

  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    enrollments: 0,
    activeStudents: 0,
  });

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [studentRes, courseRes] =
        await Promise.all([
          axios.get(`${API}/student/all`, {
            headers,
          }),

          axios.get(`${API}/course/all`, {
            headers,
          }),
        ]);

      const studentData =
        studentRes.data.students || [];

      const courseData =
        courseRes.data.courses || [];

      setStudents(studentData);
      setCourses(courseData);

      setStats({
        students: studentData.length,
        courses: courseData.length,
        enrollments: studentData.filter(
          (s) => s.course
        ).length,
        activeStudents: studentData.filter(
          (s) => s.status === "Active"
        ).length,
      });
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const exportStudentsExcel = () => {
    const excelData = students.map((student) => ({
      Name: student.name,
      Email: student.email,
      Phone: student.phone,
      Course: student.course,
      Status: student.status,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Students"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "students.xlsx");
  };

  const exportCoursesExcel = () => {
    const excelData = courses.map((course) => ({
      Title: course.title,
      Description: course.description,
      Duration: course.duration,
      Level: course.level,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Courses"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "courses.xlsx");
  };

  const StatCard = ({
    title,
    value,
    icon,
    color,
  }) => (
    <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's your LMS overview.
        </p>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={exportStudentsExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2"
        >
          <Download size={18} />
          Download Students Excel
        </button>

        <button
          onClick={exportCoursesExcel}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2"
        >
          <Download size={18} />
          Download Courses Excel
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard
              title="Total Students"
              value={stats.students}
              icon={
                <Users
                  className="text-white"
                  size={28}
                />
              }
              color="bg-blue-500"
            />

            <StatCard
              title="Total Courses"
              value={stats.courses}
              icon={
                <BookOpen
                  className="text-white"
                  size={28}
                />
              }
              color="bg-indigo-500"
            />

            <StatCard
              title="Enrollments"
              value={stats.enrollments}
              icon={
                <GraduationCap
                  className="text-white"
                  size={28}
                />
              }
              color="bg-green-500"
            />

            <StatCard
              title="Active Students"
              value={stats.activeStudents}
              icon={
                <Activity
                  className="text-white"
                  size={28}
                />
              }
              color="bg-orange-500"
            />
          </div>

          {/* Tables */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Students */}
            <div className="bg-white rounded-3xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Recent Students
                </h2>

                <TrendingUp
                  className="text-indigo-500"
                  size={22}
                />
              </div>

              <div className="space-y-4">
                {students
                  .slice(0, 5)
                  .map((student) => (
                    <div
                      key={student._id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="w-14 h-14 rounded-2xl object-cover"
                        />

                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {student.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {student.email}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          student.status ===
                          "Active"
                            ? "bg-green-100 text-green-600"
                            : student.status ===
                              "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Courses */}
            <div className="bg-white rounded-3xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Available Courses
                </h2>

                <BookOpen
                  className="text-indigo-500"
                  size={22}
                />
              </div>

              <div className="space-y-4">
                {courses
                  .slice(0, 5)
                  .map((course) => (
                    <div
                      key={course._id}
                      className="border rounded-2xl p-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {course.title}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {course.duration}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            course.level ===
                            "Beginner"
                              ? "bg-green-100 text-green-600"
                              : course.level ===
                                "Intermediate"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {course.level}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;