const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");
const User = require("../models/User");

// Send a message (open to all users, even unauthenticated)
router.post("/", async (req, res) => {
    try {
        const { fullName, email, message, userId } = req.body;
        const newMessage = new Message({ fullName, email, message, userId });
        await newMessage.save();
        res.status(201).json({ message: "Sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get all messages (ADMIN ONLY)
router.get("/all", auth, async (req, res) => {
    try {
        const adminUser = await User.findById(req.userId);
        if (adminUser.role !== 'admin') return res.status(403).json({ message: "Forbidden" });

        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages" });
    }
});

// Delete a message (ADMIN ONLY)
router.delete("/:id", async (req, res) => {
    try {
        const messageId = req.params.id;
        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.json({ message: "Message deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;