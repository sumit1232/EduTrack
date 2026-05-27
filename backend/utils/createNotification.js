const Notification = require("../models/notification.model");

const createNotification = async ({ title, message, type }) => {
  try {
    await Notification.create({
      title,
      message,
      type,
    });
  } catch (error) {
    console.log("Notification Error:", error.message);
  }
};

module.exports = createNotification;