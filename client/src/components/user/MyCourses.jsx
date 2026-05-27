import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Search, PlayCircle } from "lucide-react";

const MyCourses = () => {
  const API = "http://localhost:3000/api";

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH MY COURSES =================
  const getMyCourses = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API}/course/my`,
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  // ================= FILTER =================
  const filteredCourses = courses.filter((course) =>
    course?.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Courses
          </h1>
          <p className="text-gray-500">
            All enrolled courses in one place
          </p>
        </div>

        <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none bg-transparent"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading courses...</p>
      ) : filteredCourses.length === 0 ? (
        <p className="text-gray-500">
          No courses found
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-3xl shadow hover:shadow-lg transition p-5"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="text-indigo-600" />
              </div>

              <h2 className="text-xl font-bold text-gray-800">
                {course.title}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {course.description?.slice(0, 80)}
                {course.description?.length > 80 && "..."}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : course.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {course.status || "Active"}
                </span>

                <button className="flex items-center gap-1 text-indigo-600 font-medium hover:underline">
                  <PlayCircle size={18} />
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;