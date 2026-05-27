import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Trash2, CheckCheck } from "lucide-react";

const AdminNotifications = () => {
  const API = "http://localhost:3000/api/admin";
  const token = localStorage.getItem("token");

  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const getNotifications = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${API}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(data.notifications || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `${API}/notifications/read/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, read: true } : n
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${API}/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) =>
        prev.filter((n) => n._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  const unreadCount = notifications.filter(
    (n) => !n.read
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Notifications
          </h1>
          <p className="text-gray-500">
            Manage system alerts & updates
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="text-indigo-600" size={28} />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6">
        {["all", "unread", "read"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              filter === type
                ? "bg-indigo-600 text-white"
                : "bg-white"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <div
              key={n._id}
              className={`flex items-center justify-between p-5 border-b hover:bg-gray-50 transition ${
                !n.read ? "bg-indigo-50" : ""
              }`}
            >
              {/* Message */}
              <div>
                <h3 className="font-semibold text-gray-800">
                  {n.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {n.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n._id)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-100 text-green-600 hover:bg-green-200"
                  >
                    <CheckCheck size={18} />
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteNotification(n._id)
                  }
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="p-6 text-gray-500">
            No notifications found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;