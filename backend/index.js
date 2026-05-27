const express = require("express");

const app = express();

require("dotenv").config();

const cors = require("cors");

const fileUpload = require("express-fileupload");

app.use(
  cors({
      origin: [
      "https://edu-track-seven-opal.vercel.app",
      "https://edu-track-okp5cy01s-sumit1232s-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const connectDB = require("./config/db.js");

connectDB();

require("./config/cloudinary.js");

const uploadRoutes = require("./routes/upload.routes.js");
const userRoutes = require("./routes/user.routes.js");
const studentRoutes = require("./routes/student.routes.js");
const adminRoutes = require("./routes/admin.routes.js");
const courseRoutes = require("./routes/course.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const notificationRoutes = require("./routes/notification.routes");
const paymentRoutes = require("./routes/payment.routes");

app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin/notifications", notificationRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Student Management Server Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});