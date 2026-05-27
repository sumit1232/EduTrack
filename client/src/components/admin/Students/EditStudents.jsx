import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  User,
  Mail,
  Phone,
  Lock,
  ImagePlus,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

const EditStudents = () => {
  const API = "http://localhost:3000/api/student";

  const navigate = useNavigate();

  const { id } = useParams();

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    course: "MERN Stack",
    status: "Active",
    image: null,
  });

  const token = localStorage.getItem("token");

  const getStudent = async () => {
    try {
      const { data } = await axios.get(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        name: data.student.name,
        email: data.student.email,
        phone: data.student.phone,
        password: "",
        course: data.student.course,
        status: data.student.status,
        image: null,
      });

      setPreview(data.student.image);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to fetch student"
      );
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const studentData = new FormData();

      studentData.append("name", formData.name);
      studentData.append("email", formData.email);
      studentData.append("phone", formData.phone);
      studentData.append("course", formData.course);
      studentData.append("status", formData.status);

      if (formData.password) {
        studentData.append(
          "password",
          formData.password
        );
      }

      if (formData.image) {
        studentData.append("image", formData.image);
      }

      const { data } = await axios.put(
        `${API}/update/${id}`,
        studentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      navigate("/admin/students");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Edit Student
          </h1>

          <p className="text-gray-500 mt-2">
            Update student details easily.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/students")}
          className="flex items-center gap-2 px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl font-medium transition"
        >
          ← Back
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
            <GraduationCap
              className="text-indigo-600"
              size={30}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Update Student
            </h2>

            <p className="text-gray-500 text-sm">
              Edit student information carefully
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-2 gap-8"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>

              <div className="flex items-center border rounded-2xl px-4 py-4">
                <User
                  className="text-gray-400 mr-3"
                  size={20}
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>

              <div className="flex items-center border rounded-2xl px-4 py-4">
                <Mail
                  className="text-gray-400 mr-3"
                  size={20}
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>

              <div className="flex items-center border rounded-2xl px-4 py-4">
                <Phone
                  className="text-gray-400 mr-3"
                  size={20}
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                New Password
              </label>

              <div className="flex items-center border rounded-2xl px-4 py-4 bg-gray-100 opacity-60 cursor-not-allowed blur-[0.2px]">
                <Lock className="text-gray-400 mr-3" size={20} />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Enter new password"
                  className="w-full outline-none bg-transparent cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Course
              </label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-4 outline-none"
              >
                <option>MERN Stack</option>

                <option>React.js</option>

                <option>Node.js</option>

                <option>MongoDB</option>

                <option>JavaScript</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Student Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-4 outline-none"
              >
                <option>Active</option>

                <option>Pending</option>

                <option>Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Profile Image
              </label>

              <label className="border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-40 h-40 rounded-2xl object-cover mb-4"
                  />
                ) : (
                  <>
                    <ImagePlus
                      className="text-indigo-500 mb-4"
                      size={50}
                    />

                    <p className="text-gray-600 font-medium">
                      Upload Student Image
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </>
                )}

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
            </div>
          </div>

          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition duration-300"
            >
              {loading
                ? "Updating Student..."
                : "Update Student"}

              <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudents;