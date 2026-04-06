const express = require("express");
const router = express.Router();

let bookings = [];

router.get("/test", (req, res) => {
  res.send("Booking route works!");
});

router.post("/", (req, res) => {
  const { serviceId, time, date } = req.body;

  const exists = bookings.find(
    (b) => b.date === date && b.time === time
  );

  if (exists) {
    return res.status(400).json({
      message: "This time slot is already booked",
    });
  }

  const newBooking = {
    id: bookings.length + 1,
    serviceId,
    time,
    date,
    createdAt: new Date()
  };

  bookings.push(newBooking);

  res.json({
    message: "Booking created successfully",
    booking: newBooking
  });
});
router.get("/availability", (req, res) => {
  const { date } = req.query;

  const bookedSlots = bookings
    .filter((b) => b.date === date)
    .map((b) => b.time);

  res.json({ bookedSlots });
});

module.exports = router;