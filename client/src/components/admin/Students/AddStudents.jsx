import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  User,
  Mail,
  Phone,
  Lock,
  ImagePlus,
  ArrowRight,
  GraduationCap,
  BookOpen,
  BadgeCheck,
} from "lucide-react";

const AddStudents = () => {
  const API = "http://localhost:3000/api";

  const token = localStorage.getItem("token");

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    course: "",
    status: "Active",
    image: null,
  });

  const getCourses = async () => {
    try {
      const { data } = await axios.get(
        `${API}/course/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses(data.courses || []);

      if (data.courses?.length > 0) {
        setFormData((prev) => ({
          ...prev,
          course: data.courses[0]._id,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return alert("Image must be under 5MB");
    }

    setFormData({
      ...formData,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const studentData = new FormData();

      Object.keys(formData).forEach((key) => {
        studentData.append(key, formData[key]);
      });

      const { data } = await axios.post(
        `${API}/student/add`,
        studentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        course:
          courses.length > 0 ? courses[0]._id : "",
        status: "Active",
        image: null,
      });

      setPreview("");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to add student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Add New Student
        </h1>

        <p className="text-gray-500 mt-2">
          Create student accounts and assign courses.
        </p>
      </div>

      <div className="bg-white rounded-[32px] shadow-xl p-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-3xl bg-indigo-100 flex items-center justify-center">
            <GraduationCap
              className="text-indigo-600"
              size={32}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Student Registration
            </h2>

            <p className="text-gray-500">
              Fill student details carefully
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-2 gap-10"
        >
          <div className="space-y-6">
            <InputField
              label="Full Name"
              icon={<User size={20} />}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />

            <InputField
              label="Email Address"
              type="email"
              icon={<Mail size={20} />}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />

            <InputField
              label="Phone Number"
              icon={<Phone size={20} />}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

            <InputField
              label="Password"
              type="password"
              icon={<Lock size={20} />}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <div className="space-y-6">
            <SelectField
              label="Select Course"
              icon={<BookOpen size={20} />}
              name="course"
              value={formData.course}
              onChange={handleChange}
              options={courses.map((course) => ({
                label: course.title,
                value: course._id,
              }))}
            />

            <SelectField
              label="Student Status"
              icon={<BadgeCheck size={20} />}
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                {
                  label: "Active",
                  value: "Active",
                },
                {
                  label: "Pending",
                  value: "Pending",
                },
                {
                  label: "Inactive",
                  value: "Inactive",
                },
              ]}
            />

            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Profile Image
              </label>

              <label className="border-2 border-dashed border-gray-300 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-44 h-44 rounded-3xl object-cover shadow-md"
                  />
                ) : (
                  <>
                    <ImagePlus
                      className="text-indigo-500 mb-4"
                      size={50}
                    />

                    <p className="font-semibold text-gray-700">
                      Upload Student Image
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      PNG or JPG up to 5MB
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
            </div>
          </div>

          <div className="lg:col-span-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {loading
                ? "Adding Student..."
                : "Add Student"}

              <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-3">
        {label}
      </label>

      <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-4 bg-gray-50 focus-within:border-indigo-500 transition">
        <div className="text-gray-400 mr-3">
          {icon}
        </div>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-gray-700"
          required
        />
      </div>
    </div>
  );
};

const SelectField = ({
  label,
  icon,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-3">
        {label}
      </label>

      <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-4 bg-gray-50 focus-within:border-indigo-500 transition">
        <div className="text-gray-400 mr-3">
          {icon}
        </div>

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-gray-700"
          required
        >
          {options.map((item, index) => (
            <option
              key={index}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddStudents;