import React from "react";
import { Link } from "react-router-dom";

import {
  Users,
  UserCheck,
  BookOpen,
  GraduationCap,
  ClipboardList,
  Bell,
  ArrowRight,
  ShieldCheck,
  User,
  Copy,
  LogIn,
  UserPlus,
} from "lucide-react";

const Home = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,250",
      icon: <Users size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Active Students",
      value: "1,180",
      icon: <UserCheck size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Courses",
      value: "32",
      icon: <BookOpen size={28} />,
      color: "bg-purple-500",
    },
    {
      title: "Graduated",
      value: "540",
      icon: <GraduationCap size={28} />,
      color: "bg-orange-500",
    },
  ];

  const features = [
    {
      title: "Student Management",
      desc: "Add, edit, update, and manage student records easily.",
      icon: <Users size={40} />,
    },
    {
      title: "Attendance Tracking",
      desc: "Monitor daily student attendance with reports.",
      icon: <ClipboardList size={40} />,
    },
    {
      title: "Course Management",
      desc: "Create and organize courses for students.",
      icon: <BookOpen size={40} />,
    },
    {
      title: "Notifications",
      desc: "Send alerts and announcements instantly.",
      icon: <Bell size={40} />,
    },
  ];

  const credentials = [
    {
      role: "Admin Login",
      email: "adminsumit2525@gmail.com",
      password: "admin@123",
      icon: <ShieldCheck size={28} />,
      color: "from-indigo-500 to-indigo-700",
    },
    {
      role: "Student Login",
      email: "sumitjadav2525@gmail.com",
      password: "sumit@11",
      icon: <User size={28} />,
      color: "from-green-500 to-green-700",
    },
  ];

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl font-bold leading-tight mb-6">
                Student Management System
              </h1>

              <p className="text-lg text-gray-100 mb-8">
                Manage students, attendance, courses, and reports in one modern
                dashboard.
              </p>

              {/* LOGIN BUTTONS */}
              <div className="grid grid-cols-2 gap-4 max-w-xl">
                <Link
                  to="/login"
                  className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition duration-300 flex items-center justify-center gap-2"
                >
                  <LogIn size={18} />
                  Student Login
                </Link>

                <Link
                  to="/register"
                  className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition duration-300 flex items-center justify-center gap-2"
                >
                  <UserPlus size={18} />
                  Student Register
                </Link>

                <Link
                  to="/adminlogin"
                  className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition duration-300 flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={18} />
                  Admin Login
                </Link>

                <Link
                  to="/adminregister"
                  className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition duration-300 flex items-center justify-center gap-2"
                >
                  <UserPlus size={18} />
                  Admin Register
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Students"
                className="rounded-3xl shadow-2xl w-full max-w-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LOGIN CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        {/* INTERVIEWER MESSAGE */}
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-6 py-5 rounded-2xl mb-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold mb-2">
            Hey Interviewer 👋
          </h2>

          <p className="text-sm md:text-base">
            Please check the demo credentials below to explore both the Admin
            and Student dashboards of EduTrack.
          </p>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Demo Login Credentials
          </h2>

          <p className="text-gray-500 mt-3">
            Use these accounts to test all features and dashboards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {credentials.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${item.color} text-white rounded-3xl p-8 shadow-xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  {item.icon}
                </div>

                <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                  Demo Access
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-6">{item.role}</h3>

              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-200">Email</p>
                    <p className="font-semibold">{item.email}</p>
                  </div>

                  <button
                    onClick={() => copyText(item.email)}
                    className="hover:scale-110 transition"
                  >
                    <Copy size={18} />
                  </button>
                </div>

                <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-200">Password</p>
                    <p className="font-semibold">{item.password}</p>
                  </div>

                  <button
                    onClick={() => copyText(item.password)}
                    className="hover:scale-110 transition"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl ${item.color} text-white flex items-center justify-center mb-4`}
              >
                {item.icon}
              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                {item.value}
              </h2>

              <p className="text-gray-500 mt-2">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">
              Powerful Features
            </h2>

            <p className="text-gray-500 mt-4">
              Everything you need to manage students efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition duration-300"
              >
                <div className="text-indigo-600 flex justify-center mb-5">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Start Managing Students Today
          </h2>

          <p className="text-lg text-gray-200 mb-8">
            Build a smarter education system with modern tools and analytics.
          </p>

          <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition duration-300 flex items-center gap-2 mx-auto">
            Explore Dashboard
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;