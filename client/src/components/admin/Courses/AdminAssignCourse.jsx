import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  User,
  BookOpen,
  Send,
  GraduationCap,
  Loader2,
} from "lucide-react";

const AdminAssignCourse = () => {
  const API = "http://localhost:3000/api";

  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
  });

  const getStudents = async () => {
    try {
      const { data } = await axios.get(
        `${API}/student/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(data.students || []);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to load students"
      );
    }
  };

  const getCourses = async () => {
    try {
      const { data } = await axios.get(
        `${API}/course/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses(data.courses || []);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to load courses"
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPageLoading(true);

        await Promise.all([
          getStudents(),
          getCourses(),
        ]);
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssign = async (e) => {
    e.preventDefault();

    if (!formData.studentId || !formData.courseId) {
      return alert(
        "Please select both student and course"
      );
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API}/course/assign`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      setFormData({
        studentId: "",
        courseId: "",
      });
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Assignment failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Assign Course
        </h1>

        <p className="text-gray-500 mt-2">
          Assign courses to students easily
        </p>
      </div>

      <div className="bg-white max-w-2xl mx-auto rounded-3xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
            <GraduationCap
              className="text-indigo-600"
              size={30}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Course Assignment
            </h2>

            <p className="text-gray-500 text-sm">
              Select a student and assign a course
            </p>
          </div>
        </div>

        {pageLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin" size={35} />
          </div>
        ) : (
          <form
            onSubmit={handleAssign}
            className="space-y-6"
          >
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Select Student
              </label>

              <div className="flex items-center border rounded-2xl px-4 py-3 focus-within:border-indigo-500">
                <User
                  className="text-gray-400 mr-3"
                  size={20}
                />

                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent"
                  required
                >
                  <option value="">
                    -- Choose Student --
                  </option>

                  {students.map((student) => (
                    <option
                      key={student._id}
                      value={student._id}
                    >
                      {student.name} ({student.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Select Course
              </label>

              <div className="flex items-center border rounded-2xl px-4 py-3 focus-within:border-indigo-500">
                <BookOpen
                  className="text-gray-400 mr-3"
                  size={20}
                />

                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent"
                  required
                >
                  <option value="">
                    -- Choose Course --
                  </option>

                  {courses.map((course) => (
                    <option
                      key={course._id}
                      value={course._id}
                    >
                      {course.title} ({course.level})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all"
            >
              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={20}
                  />
                  Assigning...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Assign Course
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminAssignCourse;