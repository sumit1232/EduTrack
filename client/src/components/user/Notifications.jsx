import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell, CheckCircle2, AlertCircle, Info } from "lucide-react";

const Notifications = () => {
  const API = "https://edutrack-o28e.onrender.com/api";

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="text-green-500" size={18} />;
      case "error":
        return <AlertCircle className="text-red-500" size={18} />;
      default:
        return <Info className="text-blue-500" size={18} />;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
        <Bell /> Notifications
      </h2>

      {loading && <p className="text-gray-500">Loading notifications...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && notifications.length === 0 && (
        <p className="text-gray-500">No notifications available.</p>
      )}

      <div className="space-y-3">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 border rounded-lg bg-white shadow-sm"
          >
            {getIcon(item.type)}

            <div className="flex-1">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.message}</p>

              {item.createdAt && (
                <span className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;