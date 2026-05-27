import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  BookOpen,
  CreditCard,
  Calendar,
  TrendingUp,
  Bell,
} from "lucide-react";

const UserDashboard = () => {
  const API = "https://edutrack-o28e.onrender.com/api";
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${API}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.user);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow-lg rounded-2xl p-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Hello, {user?.name || "User"} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back to your learning space
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <Bell className="text-gray-600" />
          <div className="p-3 bg-indigo-600 rounded-full text-white">
            <User />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-8">

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-5 rounded-2xl shadow-lg">
          <BookOpen />
          <h2 className="text-xl font-bold mt-3">Courses</h2>
          <p className="text-3xl font-semibold">6</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-5 rounded-2xl shadow-lg">
          <CreditCard />
          <h2 className="text-xl font-bold mt-3">Payments</h2>
          <p className="text-3xl font-semibold">₹18,000</p>
        </div>

        <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-5 rounded-2xl shadow-lg">
          <Calendar />
          <h2 className="text-xl font-bold mt-3">Attendance</h2>
          <p className="text-3xl font-semibold">95%</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-5 rounded-2xl shadow-lg">
          <TrendingUp />
          <h2 className="text-xl font-bold mt-3">Progress</h2>
          <p className="text-3xl font-semibold">Good</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>✔ Enrolled in React Course</li>
            <li>✔ Payment of ₹5000 completed</li>
            <li>✔ Attendance marked for today</li>
            <li>✔ Profile updated successfully</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 rounded-lg border hover:bg-gray-100">
              View Courses
            </button>
            <button className="p-3 rounded-lg border hover:bg-gray-100">
              Payments
            </button>
            <button className="p-3 rounded-lg border hover:bg-gray-100">
              Attendance
            </button>
            <button className="p-3 rounded-lg border hover:bg-gray-100">
              Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;