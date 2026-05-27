import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  User,
  Mail,
  Phone,
  BookOpen,
  Shield,
  Edit3,
  Save,
  Camera,
} from "lucide-react";

const Profile = () => {
  const API = "http://localhost:3000/api";

  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const token = localStorage.getItem("token");

  const getProfile = async () => {
    try {
      const { data } = await axios.get(`${API}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.user || {});
      setPreview(data.user?.image || "");
    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUser((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const updateProfile = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", user.name || "");
      formData.append("phone", user.phone || "");

      if (user.image instanceof File) {
        formData.append("image", user.image);
      }

      const { data } = await axios.put(
        `${API}/users/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(data.message);

      setEditMode(false);

      getProfile();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user?._id && !user?.name) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          My Profile
        </h1>

        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 transition"
        >
          <Edit3 size={18} />

          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-3xl shadow-lg p-6 max-w-4xl mx-auto">
        {/* AVATAR */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              className="w-28 h-28 rounded-2xl object-cover border"
            />

            {editMode && (
              <label className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-xl cursor-pointer transition">
                <Camera size={16} className="text-white" />

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.name}
            </h2>

            <p className="text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* NAME */}
          <div className="border rounded-2xl p-4 flex items-center gap-3">
            <User className="text-gray-500" />

            <input
              type="text"
              name="name"
              value={user?.name || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full outline-none bg-transparent"
              placeholder="Enter name"
            />
          </div>

          {/* EMAIL */}
          <div className="border rounded-2xl p-4 flex items-center gap-3">
            <Mail className="text-gray-500" />

            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* PHONE */}
          <div className="border rounded-2xl p-4 flex items-center gap-3">
            <Phone className="text-gray-500" />

            <input
              type="text"
              name="phone"
              value={user?.phone || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full outline-none bg-transparent"
              placeholder="Enter phone number"
            />
          </div>

          {/* COURSE */}
          <div className="border rounded-2xl p-4 flex items-center gap-3">
            <BookOpen className="text-gray-500" />

            <input
              type="text"
              value={user?.course || "No Course"}
              disabled
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* ROLE */}
          <div className="border rounded-2xl p-4 flex items-center gap-3">
            <Shield className="text-gray-500" />

            <input
              type="text"
              value={user?.role || ""}
              disabled
              className="w-full outline-none bg-transparent capitalize"
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        {editMode && (
          <button
            onClick={updateProfile}
            disabled={loading}
            className="mt-8 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition"
          >
            <Save size={18} />

            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;