const express = require("express");
const router = express.Router();

// ================= CONTROLLERS =================
const {
  registerAdmin,
  loginAdmin,
  createUser,
  assignCourseToUser,
  getAdminProfile,
  updateAdminSettings,
} = require("../controllers/admin.controller");

// ================= MIDDLEWARE =================
const { isAuth, isAdmin } = require("../middleware/auth.middleware");


// ================= AUTH ROUTES =================
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);


// ================= ADMIN PROFILE =================
router.get("/profile", isAuth, isAdmin, getAdminProfile);

router.put("/settings", isAuth, isAdmin, updateAdminSettings);


// ================= USER MANAGEMENT =================
router.post("/create-user", isAuth, isAdmin, createUser);


// ================= COURSE ASSIGNMENT =================
router.post("/assign-course", isAuth, isAdmin, assignCourseToUser);


module.exports = router;