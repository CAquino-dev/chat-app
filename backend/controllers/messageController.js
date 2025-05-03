const db = require("../config/db");

// Send a message
const sendMessage = (req, res) => {
    const { senderId, chatId, message } = req.body;

    if (!senderId || !chatId || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const query = "INSERT INTO messages (chat_id, sender_id, message) VALUES (?, ?, ?)";
    db.query(query, [chatId, senderId, message], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Message sent successfully" });
    });
};

// Get messages for a chat (one-on-one or group)
const getMessages = (req, res) => {
    const { chatId } = req.params;

    const query = "SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC";
    db.query(query, [chatId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

module.exports = { sendMessage, getMessages };
