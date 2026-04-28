const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: { message: "Too many login attempts. Try again in 15 minutes." }
});

// login
router.post("/login", loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            token,
            user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// check auth
router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-passwordHash");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Auth check failed" });
    }
});

// register
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (fullName.trim().length < 2) {
            return res.status(400).json({ message: "Full name must be at least 2 characters" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const userExists = await User.findOne({ email: email.toLowerCase().trim() });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName: fullName.trim(), email: email.toLowerCase().trim(), passwordHash });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({ token, user: { id: newUser._id, fullName: newUser.fullName, role: newUser.role } });
    } catch (error) {
        res.status(500).json({ message: "Register error" });
    }
});

module.exports = router;
