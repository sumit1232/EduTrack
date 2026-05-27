import React, { useState } from "react";

import axios from "axios";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const API = "https://edutrack-o28e.onrender.com/api/users";

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/login`, formData);

      if (res.data.user.role !== "admin") {
        return alert("Access Denied. Admin Only");
      }

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Admin Login Successful");

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-center bg-black text-white p-12">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck
              size={45}
              className="text-indigo-500"
            />

            <h1 className="text-4xl font-bold">
              Admin Panel
            </h1>
          </div>

          <p className="text-lg text-gray-300 mb-8">
            Manage students, courses, attendance, and the
            complete system from one secure dashboard.
          </p>

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="Admin"
            className="rounded-2xl shadow-xl"
          />
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Admin Login
            </h2>

            <p className="text-gray-500">
              Login to access admin dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Email Address
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-indigo-500">
                <Mail
                  className="text-gray-400 mr-3"
                  size={20}
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
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
                <Lock
                  className="text-gray-400 mr-3"
                  size={20}
                />

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
                    onClick={() =>
                      setShowPassword(false)
                    }
                  />
                ) : (
                  <Eye
                    className="text-gray-400 cursor-pointer"
                    size={20}
                    onClick={() =>
                      setShowPassword(true)
                    }
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-300"
            >
              Admin Login
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;