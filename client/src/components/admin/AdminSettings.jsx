import React, { useState } from "react";
import {
  Settings,
  User,
  Lock,
  Bell,
  Save,
  Shield,
  Mail,
} from "lucide-react";

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@gmail.com",
    password: "",
    confirmPassword: "",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password &&
      formData.password !==
        formData.confirmPassword
    ) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);
      setTimeout(() => {
        alert("Settings updated successfully");
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Admin Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your account and system settings
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
            <Settings
              className="text-indigo-600"
              size={30}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Account Settings
            </h2>

            <p className="text-gray-500 text-sm">
              Update your profile information
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
              <User size={20} />
              Profile Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>

                <div className="flex items-center border rounded-2xl px-4 py-4 focus-within:border-indigo-500">
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
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>

                <div className="flex items-center border rounded-2xl px-4 py-4 focus-within:border-indigo-500">
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
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
              <Shield size={20} />
              Security
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  New Password
                </label>

                <div className="flex items-center border rounded-2xl px-4 py-4 focus-within:border-indigo-500">
                  <Lock
                    className="text-gray-400 mr-3"
                    size={20}
                  />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>

                <div className="flex items-center border rounded-2xl px-4 py-4 focus-within:border-indigo-500">
                  <Lock
                    className="text-gray-400 mr-3"
                    size={20}
                  />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
              <Bell size={20} />
              Notifications
            </h3>

            <div className="flex items-center justify-between border rounded-2xl p-5">
              <div>
                <h4 className="font-semibold text-gray-800">
                  Email Notifications
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  Receive system updates and alerts
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                  className="sr-only peer"
                />

                <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>

                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-6"></div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all disabled:opacity-70"
          >
            <Save size={20} />

            {loading
              ? "Saving Settings..."
              : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;