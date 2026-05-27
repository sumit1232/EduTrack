import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookOpen, Plus, Search, Trash2, Pencil } from "lucide-react";

const Courses = () => {
  const API = "http://localhost:3000/api/course";
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const getCourses = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${API}/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses(data?.courses || []);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this course?");
      if (!confirmDelete) return;

      const { data } = await axios.delete(`${API}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(data?.message || "Deleted");
      getCourses();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    (course?.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Courses</h1>
          <p className="text-gray-500 mt-2">
            Manage all training courses
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/addcourses")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2"
        >
          <Plus size={20} />
          Add Course
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl shadow mb-6">
        <div className="flex items-center border rounded-2xl px-4 py-3">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-4 px-6 text-left">Course</th>
              <th className="py-4 px-6 text-left">Duration</th>
              <th className="py-4 px-6 text-left">Level</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr key={course._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <BookOpen className="text-indigo-600" size={20} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {course.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">{course.duration}</td>

                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        course.level === "Beginner"
                          ? "bg-green-100 text-green-600"
                          : course.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {course.level}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/editcourses/${course._id}`)
                        }
                        className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-200"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No Courses Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;