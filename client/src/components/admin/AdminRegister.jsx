import React, { useState } from "react";

import axios from "axios";

import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const API = "https://edutrack-o28e.onrender.com/api/admin";

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      setLoading(true);

      const res = await axios.post(
        `${API}/register`,
        formData
      );

      alert(res.data.message);

      navigate("/adminlogin");
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-center bg-black text-white p-12">
          <div className="flex items-center gap-4 mb-6">
            <ShieldCheck
              size={50}
              className="text-indigo-500"
            />

            <h1 className="text-4xl font-bold">
              Admin Registration
            </h1>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Create a secure admin account to manage
            students, courses, attendance, and the
            entire student management system.
          </p>

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Admin Register"
            className="rounded-3xl shadow-xl object-cover"
          />
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Create Admin
            </h2>

            <p className="text-gray-500">
              Register a new admin account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Full Name
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-indigo-500">
                <User
                  className="text-gray-400 mr-3"
                  size={20}
                />

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
                Phone Number
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-indigo-500">
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
              <label className="block text-gray-700 mb-2 font-medium">
                Password
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-indigo-500">
                <Lock
                  className="text-gray-400 mr-3"
                  size={20}
                />

                <input
                  type={
                    showPassword ? "text" : "password"
                  }
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
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-300"
            >
              {loading
                ? "Creating Admin..."
                : "Register Admin"}

              <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an admin account?{" "}
            <span
              onClick={() => navigate("/adminlogin")}
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;