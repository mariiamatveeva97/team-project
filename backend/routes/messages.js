const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

// Send a message (open to all, even unauthenticated)
router.post("/", async (req, res) => {
    try {
        const { fullName, email, message, userId } = req.body;

        if (!fullName || !email || !message) {
            return res.status(400).json({ message: "Name, email, and message are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        const newMessage = new Message({ fullName, email, message, userId });
        await newMessage.save();
        res.status(201).json({ message: "Sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get all messages (admin only)
router.get("/all", auth, isAdmin, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages" });
    }
});

// Mark a message as read (admin only)
router.patch("/:id/read", auth, isAdmin, async (req, res) => {
    try {
        const updated = await Message.findByIdAndUpdate(
            req.params.id,
            { status: "read" },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Message not found" });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error updating message" });
    }
});

// Delete a message (admin only)
router.delete("/:id", auth, isAdmin, async (req, res) => {
    try {
        const deleted = await Message.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Message not found" });
        res.json({ message: "Message deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
