const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
  deleteUser,
  updateProfile,
} = require("../controllers/user.controller.js");

const {
  isAuth,
  isAdmin,
} = require("../middleware/auth.middleware.js");

// ================= PUBLIC =================
router.post("/register", registerUser);

router.post("/login", loginUser);

// ================= USER =================
router.get("/profile", isAuth, getProfile);

router.get("/me", isAuth, getProfile);

router.put("/update-profile", isAuth, updateProfile);

// ================= ADMIN =================
router.get("/all-users", isAuth, isAdmin, getAllUsers);

router.delete("/delete/:id", isAuth, isAdmin, deleteUser);

module.exports = router;