const express = require("express");
const router = express.Router();

const cloudinary = require("../config/cloudinary");

const Upload = require("../models/upload.model");

// Upload Image
router.post("/upload", async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const file = req.files.image;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: "mern_uploads",
      }
    );

    // Save in MongoDB
    const newUpload = await Upload.create({
      title,
      image: result.secure_url,
      public_id: result.public_id,
    });

    res.status(201).json({
      success: true,
      upload: newUpload,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Uploads
router.get("/uploads", async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      uploads,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;