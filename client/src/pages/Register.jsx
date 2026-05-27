import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Phone,
  ImagePlus,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const API = "http://localhost:3000/api/users";

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("password", formData.password);

      if (image) {
        data.append("image", image);
      }

      const res = await axios.post(`${API}/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
      navigate("/login");
      console.log(res.data);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-center bg-indigo-600 text-white p-12">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Student Management System
          </h1>

          <p className="text-lg text-indigo-100 mb-8">
            Manage students, attendance, courses, and records with a modern
            dashboard.
          </p>

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Students"
            className="rounded-2xl shadow-xl"
          />
        </div>

        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>

            <p className="text-gray-500">
              Register to access the student dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Full Name
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-indigo-500">
                <User className="text-gray-400 mr-3" size={20} />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Email Address
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-indigo-500">
                <Mail className="text-gray-400 mr-3" size={20} />

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
              <label className="block text-gray-700 mb-2 font-medium">
                Phone Number
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-indigo-500">
                <Phone className="text-gray-400 mr-3" size={20} />

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
              <label className="block text-gray-700 mb-2 font-medium">
                Password
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-indigo-500">
                <Lock className="text-gray-400 mr-3" size={20} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full outline-none bg-transparent"
                  required
                />

                {showPassword ? (
                  <EyeOff
                    className="text-gray-400 cursor-pointer"
                    size={20}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className="text-gray-400 cursor-pointer"
                    size={20}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Profile Image
              </label>

              <label className="flex items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer hover:border-indigo-500 transition">
                <div className="text-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-28 h-28 rounded-full object-cover mx-auto mb-3"
                    />
                  ) : (
                    <ImagePlus
                      className="mx-auto text-indigo-500 mb-3"
                      size={40}
                    />
                  )}

                  <p className="text-gray-600 font-medium">
                    Upload Profile Image
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-300"
            >
              Register
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;