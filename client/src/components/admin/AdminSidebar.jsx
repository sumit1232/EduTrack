import React from "react";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardCheck,
  Bell,
  Settings,
  LogOut,
  GraduationCap,
  Wallet,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "Students",
      icon: <Users size={20} />,
      path: "/admin/students",
    },
    {
      name: "Courses",
      icon: <BookOpen size={20} />,
      path: "/admin/courses",
    },
    {
      name: "Attendance",
      icon: <ClipboardCheck size={20} />,
      path: "/admin/attendance",
    },
     {
      name: "Payment",
      icon: <Wallet size={20} />,
      path: "/admin/payment",
    },
    {
      name: "Notifications",
      icon: <Bell size={20} />,
      path: "/admin/notifications",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/adminlogin");
  };

  return (
    <div className="w-72 min-h-screen bg-black text-white flex flex-col justify-between shadow-2xl">
      <div>
        <div className="flex items-center gap-3 px-8 py-8 border-b border-gray-800">
          <GraduationCap size={34} className="text-indigo-500" />

          <div>
            <h1 className="text-2xl font-bold">
              Admin Panel
            </h1>

            <p className="text-gray-400 text-sm">
              Student Management
            </p>
          </div>
        </div>

        <div className="mt-8 px-4">
          <ul className="space-y-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-4 rounded-2xl transition duration-300 font-medium ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "hover:bg-gray-900 text-gray-300"
                    }`
                  }
                >
                  {item.icon}

                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-5 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 px-5 py-4 rounded-2xl font-semibold transition duration-300"
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;