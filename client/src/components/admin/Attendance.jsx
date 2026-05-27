import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Calendar,
  Table2,
  Grid3X3,
  FileSpreadsheet,
  FileText,
  Users,
} from "lucide-react";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Attendance = () => {
  const API = "https://edutrack-o28e.onrender.com/api";

  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState({});
  const [date, setDate] = useState("");
  const [view, setView] = useState("table");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 6;

  const getStudents = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API}/student/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(data.students || []);
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

  useEffect(() => {
    getStudents();
  }, []);

  const totalPages = Math.ceil(
    students.length / perPage
  );

  const paginatedStudents = students.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handleChange = (id, status) => {
    setRecords((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const exportExcel = () => {
    const data = students.map((s) => ({
      Name: s.name,
      Email: s.email,
      Phone: s.phone,
      Course:
        typeof s.course === "object"
          ? s.course?.title
          : s.course,
      Status: records[s._id] || "Present",
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Attendance"
    );

    XLSX.writeFile(
      workbook,
      "attendance-report.xlsx"
    );
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
      "Name",
      "Email",
      "Course",
      "Status",
    ];

    const tableRows = [];

    students.forEach((s) => {
      tableRows.push([
        s.name,
        s.email,
        typeof s.course === "object"
          ? s.course?.title
          : s.course,
        records[s._id] || "Present",
      ]);
    });

    doc.setFontSize(18);

    doc.text("Attendance Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("attendance-report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Attendance System
          </h1>

          <p className="text-gray-500 mt-2">
            Mark and manage student attendance
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-sm">
            <Calendar
              size={20}
              className="text-indigo-600"
            />

            <input
              type="month"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="outline-none bg-transparent"
            />
          </div>

          <button
            onClick={() =>
              setView(
                view === "table"
                  ? "calendar"
                  : "table"
              )
            }
            className="bg-white px-5 py-3 rounded-2xl shadow-sm hover:bg-gray-50 transition flex items-center gap-2"
          >
            {view === "table" ? (
              <>
                <Grid3X3 size={18} />
                Calendar
              </>
            ) : (
              <>
                <Table2 size={18} />
                Table
              </>
            )}
          </button>

          <button
            onClick={exportExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl transition flex items-center gap-2"
          >
            <FileSpreadsheet size={18} />
            Excel
          </button>

          <button
            onClick={exportPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl transition flex items-center gap-2"
          >
            <FileText size={18} />
            PDF
          </button>
        </div>
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

      {view === "table" && (
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6">
                    Student
                  </th>

                  <th className="text-left py-4 px-6">
                    Email
                  </th>

                  <th className="text-left py-4 px-6">
                    Course
                  </th>

                  <th className="text-left py-4 px-6">
                    Attendance
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-10"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : paginatedStudents.length > 0 ? (
                  paginatedStudents.map((s) => (
                    <tr
                      key={s._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              s.image ||
                              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt={s.name}
                            className="w-14 h-14 rounded-2xl object-cover"
                          />

                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {s.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {s.phone}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-gray-600">
                        {s.email}
                      </td>

                      <td className="py-4 px-6">
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                          {typeof s.course ===
                          "object"
                            ? s.course?.title
                            : s.course}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <select
                          value={
                            records[s._id] ||
                            "Present"
                          }
                          onChange={(e) =>
                            handleChange(
                              s._id,
                              e.target.value
                            )
                          }
                          className="border border-gray-300 px-4 py-2 rounded-xl outline-none focus:border-indigo-500"
                        >
                          <option value="Present">
                            Present
                          </option>

                          <option value="Absent">
                            Absent
                          </option>

                          <option value="Late">
                            Late
                          </option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-500"
                    >
                      No Students Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center gap-3 p-6">
            {Array.from({
              length: totalPages || 1,
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-medium transition ${
                  page === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {view === "calendar" && (
        <div className="bg-white rounded-3xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar
              className="text-indigo-600"
              size={24}
            />

            <h2 className="text-2xl font-bold text-gray-800">
              Monthly Attendance Calendar
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {Array.from({ length: 30 }).map(
              (_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl bg-gray-100 hover:bg-indigo-100 transition flex items-center justify-center text-lg font-semibold text-gray-700 cursor-pointer"
                >
                  {i + 1}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;