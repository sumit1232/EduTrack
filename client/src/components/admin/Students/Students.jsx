import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  Users,
  Plus,
  Search,
  Trash2,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Students = () => {
  const API = "http://localhost:3000/api/student";

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const getStudents = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${API}/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(data.students);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to fetch students"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this student?"
      );

      if (!confirmDelete) return;

      const token = localStorage.getItem("token");

      const { data } = await axios.delete(
        `${API}/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      getStudents();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Students
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all student records easily.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/admin/addstudents")
          }
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition"
        >
          <Plus size={20} />
          Add Student
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Total Students
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {students.length}
              </h2>
            </div>

            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <Users
                className="text-indigo-600"
                size={28}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-md mb-6">
        <div className="flex items-center border rounded-2xl px-4 py-3">
          <Search
            className="text-gray-400 mr-3"
            size={20}
          />

          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6">
                Student
              </th>

              <th className="text-left py-4 px-6">
                Course
              </th>

              <th className="text-left py-4 px-6">
                Status
              </th>

              <th className="text-left py-4 px-6">
                Phone
              </th>

              <th className="text-left py-4 px-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10"
                >
                  Loading...
                </td>
              </tr>
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          student.image ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt={student.name}
                        className="w-14 h-14 rounded-2xl object-cover"
                      />

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {student.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    {student.course?.title}
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium
                      ${student.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : student.status ===
                            "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    {student.phone}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">

                      <button
                        onClick={() => navigate(`/admin/editstudents/${student._id}`)}
                        className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteStudent(student._id)}
                        className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  No Students Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;