const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
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
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, passwordHash });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({ token, user: { id: newUser._id, fullName: newUser.fullName, role: newUser.role } });
    } catch (error) {
        res.status(500).json({ message: "Register error" });
    }
});

module.exports = router;