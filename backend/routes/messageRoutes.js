const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/messageController");

// Route to send a message (one-on-one or group)
router.post("/send", sendMessage);

// Route to get messages (for a user or a group)
router.get("/:chatId", getMessages);

module.exports = router;
