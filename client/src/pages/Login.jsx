import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const API = "https://edutrack-o28e.onrender.com/api/users";


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

      alert(res.data.message);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/userdashboard");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-indigo-600 text-white p-12">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap size={40} />

            <h1 className="text-4xl font-bold">
              Student Management System
            </h1>
          </div>

          <p className="text-lg text-indigo-100 mb-8">
            Access your dashboard to manage students, attendance, courses,
            and academic records easily.
          </p>

          <img
            alt="Students"
            className="rounded-2xl shadow-xl"
          />
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>

            <p className="text-gray-500">
              Login to continue to your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
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
                  placeholder="Enter your email"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Password */}
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
                  placeholder="Enter your password"
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-indigo-600" />
                Remember me
              </label>

              <span className="text-indigo-600 cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-300"
            >
              Login
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500 mt-8">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;