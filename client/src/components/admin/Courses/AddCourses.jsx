import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
  Clock,
  Layers3,
  FileText,
} from "lucide-react";

const AddCourses = () => {
  const API = "http://localhost:3000/api/course/add";

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "Beginner",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(data.message || "Course added successfully");

      setFormData({
        title: "",
        description: "",
        duration: "",
        level: "Beginner",
      });

      navigate("/admin/courses");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to create course"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Create New Course
        </h1>

        <p className="text-gray-500 mt-2">
          Add professional training courses for students
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-[30px] shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur">
              <BookOpen size={34} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Course Information
              </h2>

              <p className="text-indigo-100 mt-1">
                Fill all course details carefully
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-7"
        >
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Course Title
            </label>

            <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-indigo-500 transition">
              <BookOpen
                size={20}
                className="text-gray-400 mr-3"
              />

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter course title"
                className="w-full outline-none bg-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Description
            </label>

            <div className="flex border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-indigo-500 transition">
              <FileText
                size={20}
                className="text-gray-400 mr-3 mt-1"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Enter detailed course description"
                className="w-full outline-none bg-transparent resize-none"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Duration
              </label>

              <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-indigo-500 transition">
                <Clock
                  size={20}
                  className="text-gray-400 mr-3"
                />

                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 3 Months"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Level
              </label>

              <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-indigo-500 transition">
                <Layers3
                  size={20}
                  className="text-gray-400 mr-3"
                />

                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent"
                >
                  <option value="Beginner">
                    Beginner
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Advanced">
                    Advanced
                  </option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Creating Course..." : "Create Course"}

            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourses;