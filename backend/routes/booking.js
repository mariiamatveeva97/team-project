const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// Create a new appointment
router.post("/", auth, async (req, res) => {
  try {
    const { userName, serviceName, time, date } = req.body;

    const exists = await Booking.findOne({ date, time });
    if (exists) {
      return res.status(400).json({ message: "This slot is already taken" });
    }

    const newBooking = new Booking({
      userId: req.userId,
      userName,
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
// Get booked slots for a specific date
router.get("/availability", async (req, res) => {
  try {
    const { date } = req.query;
    const bookedSlots = await Booking.find({ date }).select('time');

    res.json({ bookedSlots: bookedSlots.map(b => b.time) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching availability" });
  }
});

// Get all bookings for a specific user
router.get("/my", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// Cancel an appointment
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }

    if (booking.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking" });
  }
});

// Reschedule an appointment
router.put("/:id", auth, async (req, res) => {
  try {
    const { time, date } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }
    if (booking.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (time || date) {
      const exists = await Booking.findOne({
        _id: { $ne: booking._id },
        date: date || booking.date,
        time: time || booking.time
      });

      if (exists) {
        return res.status(400).json({ message: "Slot already taken" });
      }
    }

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        time: time || booking.time,
        date: date || booking.date
      },
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Error updating booking" });
  }
});

module.exports = router;