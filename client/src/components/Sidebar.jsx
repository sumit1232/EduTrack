import React from "react";
import {
  LayoutDashboard,
  User,
  BookOpen,
  ClipboardCheck,
  Bell,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/userdashboard",
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
    {
      name: "My Courses",
      icon: <BookOpen size={20} />,
      path: "/courses",
    },
    {
      name: "Attendance",
      icon: <ClipboardCheck size={20} />,
      path: "/myattendance",
    },
    {
      name: "Notifications",
      icon: <Bell size={20} />,
      path: "/notifications",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <div className="w-[280px] min-h-screen bg-white shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 px-6 py-6 border-b">
          <GraduationCap className="text-indigo-600" size={34} />

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Student Panel
            </h1>

            <p className="text-sm text-gray-500">
              Management System
            </p>
          </div>
        </div>
        <div className="px-6 py-6 border-b">
          <div className="flex items-center gap-4">
            <img
              src={
                user?.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="User"
              className="w-14 h-14 rounded-full object-cover border"
            />

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {user?.name}
              </h2>

              <p className="text-sm text-gray-500">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              {item.icon}

              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition duration-300"
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;