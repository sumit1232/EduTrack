import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

const EditCourses = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "Beginner",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getCourse = async () => {
    try {
      const { data } = await axios.get(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        title: data.course.title,
        description: data.course.description,
        duration: data.course.duration,
        level: data.course.level,
      });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load course");
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.put(
        `${API}/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message || "Course updated successfully");

      navigate("/admin/courses");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Edit Course
        </h1>
        <p className="text-gray-500 mt-2">
          Update course details
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
            <BookOpen className="text-indigo-600" size={30} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Update Course
            </h2>
            <p className="text-gray-500 text-sm">
              Edit course information
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-2xl px-4 py-3 outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-2xl px-4 py-3 outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border rounded-2xl px-4 py-3 outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border rounded-2xl px-4 py-3 outline-none focus:border-indigo-500"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3"
          >
            {loading ? "Updating..." : "Update Course"}
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourses;