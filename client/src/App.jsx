import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./components/user/UserDashboard";
import Profile from "./components/user/Profile";
import MyCourses from "./components/user/MyCourses";
import Notifications from "./components/user/Notifications";
import Settings from "./components/user/Settings";
import Sidebar from "./components/Sidebar";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRegister from "./components/admin/AdminRegister";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminSidebar from "./components/admin/AdminSidebar";
import AdminLayout from "./components/admin/AdminLayout";
import AddStudents from "./components/admin/Students/AddStudents";
import EditStudents from "./components/admin/Students/EditStudents";
import Students from "./components/admin/Students/Students";
import Courses from "./components/admin/Courses/Courses";
import AddCourses from "./components/admin/Courses/AddCourses";
import EditCourses from "./components/admin/Courses/EditCourses";
import MyAttendance from "./components/user/MyAttendance";
import Attendance from "./components/admin/Attendance";
import AdminNotifications from "./components/admin/AdminNotifications";
import AdminSettings from "./components/admin/AdminSettings";
import AdminAssignCourse from "./components/admin/Courses/AdminAssignCourse";
import Payment from "./components/admin/Payment";
import PagenotFound from "./pages/PagenotFound";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<DashboardLayout />}>
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<MyCourses />} />
          <Route path="/myattendance" element={<MyAttendance />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/addstudents" element={<AddStudents />} />
          <Route path="/admin/editstudents/:id" element={<EditStudents />} />
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/addcourses" element={<AddCourses />} />
          <Route path="/admin/editcourses/:id" element={<EditCourses />} />
          <Route path="/admin/assigncourse" element={<AdminAssignCourse />}/>
          <Route path="/admin/attendance" element={<Attendance />} />
          <Route path="/admin/payment" element={<Payment />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<PagenotFound />} />


      </Routes>
    </Router>
  );
};

export default App;