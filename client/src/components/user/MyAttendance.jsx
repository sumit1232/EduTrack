import React, { useEffect, useState } from "react";
import axios from "axios";
import { CalendarDays, CheckCircle, XCircle, Clock } from "lucide-react";

const MyAttendance = () => {
  const API = "http://localhost:3000/api";

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API}/attendance/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAttendance(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <CheckCircle className="text-green-500" size={18} />;
      case "Absent":
        return <XCircle className="text-red-500" size={18} />;
      default:
        return <Clock className="text-yellow-500" size={18} />;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
        <CalendarDays /> My Attendance
      </h2>

      {loading && <p className="text-gray-500">Loading attendance...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && attendance.length === 0 && (
        <p className="text-gray-500">No attendance records found.</p>
      )}

      {!loading && attendance.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.course}</td>
                  <td className="p-3 flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAttendance;