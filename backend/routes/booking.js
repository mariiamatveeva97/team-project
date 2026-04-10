const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");
const User = require("../models/User");

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

router.get("/recommendation", auth, async (req, res) => {
  try {
    const lastBookings = await Booking.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(5);

    if (lastBookings.length === 0) {
      return res.json({ recommendedTime: null });
    }

    const timeCounts = {};
    lastBookings.forEach(b => {
      timeCounts[b.time] = (timeCounts[b.time] || 0) + 1;
    });

    const recommendedTime = Object.keys(timeCounts).reduce((a, b) =>
      timeCounts[a] > timeCounts[b] ? a : b
    );

    res.json({ recommendedTime });
  } catch (error) {
    res.status(500).json({ message: "Error getting recommendation" });
  }
});

// 1. availability for a given date
router.get("/availability", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const bookings = await Booking.find({ date });

    const bookedSlots = bookings.map(b => b.time);

    res.json({ bookedSlots });
  } catch (error) {
    res.status(500).json({ message: "Error fetching availability" });
  }
});

// 2. get all bookings (admin only)
router.get("/all", auth, isAdmin, async (req, res) => {
  try {
    const allBookings = await Booking.find()
      .populate('userId', 'fullName email')
      .sort({ date: 1, time: 1 });
    res.json(allBookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all bookings" });
  }
});

// 3. create booking (authenticated users)
router.post("/", auth, async (req, res) => {
  try {
    const { serviceName, time, date } = req.body;

    const bookingDateTime = new Date(`${date} ${time}`);
    const now = new Date();

    if (bookingDateTime < now) {
      return res.status(400).json({ message: "This time has already passed." });
    }

    const exists = await Booking.findOne({ date, time });
    if (exists) {
      return res.status(400).json({ message: "This slot is already taken" });
    }

    const newBooking = new Booking({
      userId: req.userId,
      serviceName,
      time,
      date
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 4. get user's bookings (authenticated users)
router.get("/my", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// 5. delete booking (owner or admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Not found" });

    const user = await User.findById(req.userId);
    const isOwner = booking.userId?.toString() === req.userId;
    const adminCheck = user && user.role === 'admin';

    if (!isOwner && !adminCheck) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting" });
  }
});

// 6. edit booking (owner or admin)
router.put("/:id", auth, async (req, res) => {
  try {
    const { time, date } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Not found" });

    const user = await User.findById(req.userId);
    const isOwner = booking.userId?.toString() === req.userId;
    const adminCheck = user && user.role === 'admin';

    if (!isOwner && !adminCheck) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (time || date) {
      const exists = await Booking.findOne({
        _id: { $ne: booking._id },
        date: date || booking.date,
        time: time || booking.time
      });
      if (exists) return res.status(400).json({ message: "Slot already taken" });
    }

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { time: time || booking.time, date: date || booking.date },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating" });
  }
});

module.exports = router;