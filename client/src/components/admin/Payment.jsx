import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  CreditCard,
  IndianRupee,
  Search,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const Payments = () => {
  const API = "https://edutrack-o28e.onrender.com/api";

  const token = localStorage.getItem("token");

  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const getStudents = async () => {
    try {
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
    }
  };

  const getPayments = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API}/payment/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPayments(data.payments || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
    getPayments();
  }, []);

  const isPaid = (studentId) => {
    return payments.some(
      (payment) =>
        payment.studentId === studentId &&
        payment.status === "Success"
    );
  };

  const handlePayment = async (student) => {
    try {
      const amount =
        Number(student.course?.price) || 5000;

      const { data } = await axios.post(
        `${API}/payment/create-order`,
        {
          amount,
          studentId: student._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: data.order.amount,

        currency: "INR",

        name: "LMS Admin",

        description: "Course Payment",

        order_id: data.order.id,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${API}/payment/verify`,
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                studentId: student._id,

                amount:
                  data.order.amount / 100,

                course:
                  student.course?.title ||
                  student.course,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert(
              verifyRes.data.message ||
                "Payment Successful"
            );

            getPayments();
          } catch (error) {
            console.log(error);

            alert(
              "Payment Verification Failed"
            );
          }
        },

        prefill: {
          name: student.name,
          email: student.email,
          contact: student.phone,
        },

        theme: {
          color: "#4F46E5",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Payment Failed"
      );
    }
  };

  const filteredPayments = payments.filter(
    (payment) =>
      payment.studentName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      payment.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Payment Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage student course payments
          </p>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Total Payments */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Total Payments
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {payments.length}
              </h2>
            </div>

            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <CreditCard
                className="text-indigo-600"
                size={28}
              />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Total Revenue
              </p>

              <h2 className="text-3xl font-bold mt-2">
                ₹
                {payments.reduce(
                  (acc, item) =>
                    acc +
                    Number(item.amount || 0),
                  0
                )}
              </h2>
            </div>

            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
              <IndianRupee
                className="text-green-600"
                size={28}
              />
            </div>
          </div>
        </div>

        {/* Successful */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Successful Payments
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {
                  payments.filter(
                    (p) =>
                      p.status === "Success"
                  ).length
                }
              </h2>
            </div>

            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
              <CheckCircle2
                className="text-blue-600"
                size={28}
              />
            </div>
          </div>
        </div>
      </div>

      {/* STUDENT PAYMENT SECTION */}
      <div className="bg-white rounded-3xl p-6 shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Students Payment
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {students.map((student) => {
            const paid = isPaid(student._id);

            return (
              <div
                key={student._id}
                className="border rounded-3xl p-5 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      student.image ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={student.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />

                  <div>
                    <h3 className="font-bold text-gray-800">
                      {student.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {student.email}
                    </p>

                    <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full mt-2 inline-block">
                      {student.course?.title ||
                        student.course}
                    </span>
                  </div>
                </div>

                {/* PRICE */}
                <div className="mt-4">
                  <p className="text-gray-500 text-sm">
                    Course Fee
                  </p>

                  <h2 className="text-2xl font-bold text-indigo-600">
                    ₹
                    {student.course?.price ||
                      5000}
                  </h2>
                </div>

                {/* BUTTON */}
                <button
                  disabled={paid}
                  onClick={() =>
                    handlePayment(student)
                  }
                  className={`w-full mt-5 py-3 rounded-2xl font-semibold transition
                  
                  ${
                    paid
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {paid
                    ? "Payment Completed"
                    : `Pay ₹${
                        student.course?.price ||
                        5000
                      }`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-3xl p-5 shadow-md mb-6">
        <div className="flex items-center border rounded-2xl px-4 py-3">
          <Search
            className="text-gray-400 mr-3"
            size={20}
          />

          <input
            type="text"
            placeholder="Search payments..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none bg-transparent"
          />
        </div>
      </div>

      {/* PAYMENT TABLE */}
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
                Amount
              </th>

              <th className="text-left py-4 px-6">
                Payment ID
              </th>

              <th className="text-left py-4 px-6">
                Status
              </th>

              <th className="text-left py-4 px-6">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10"
                >
                  Loading...
                </td>
              </tr>
            ) : filteredPayments.length >
              0 ? (
              filteredPayments.map(
                (payment) => (
                  <tr
                    key={payment._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {
                            payment.studentName
                          }
                        </h3>

                        <p className="text-sm text-gray-500">
                          {payment.email}
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      {payment.course}
                    </td>

                    <td className="py-4 px-6 font-semibold text-green-600">
                      ₹{payment.amount}
                    </td>

                    <td className="py-4 px-6 text-sm text-gray-600">
                      {payment.paymentId}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2 w-fit
                        
                        ${
                          payment.status ===
                          "Success"
                            ? "bg-green-100 text-green-600"
                            : payment.status ===
                              "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {payment.status ===
                        "Success" ? (
                          <CheckCircle2
                            size={16}
                          />
                        ) : payment.status ===
                          "Pending" ? (
                          <Clock3
                            size={16}
                          />
                        ) : (
                          <XCircle
                            size={16}
                          />
                        )}

                        {payment.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-gray-600">
                      {new Date(
                        payment.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No Payments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;