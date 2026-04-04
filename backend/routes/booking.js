const express = require("express");
const router = express.Router();

let bookings = [];

router.get("/test", (req, res) => {
  res.send("Booking route works!");
});

router.post("/", (req, res) => {
  const { serviceId, time, date } = req.body;

  const newBooking = {
    id: bookings.length + 1,
    serviceId,
    time,
    date
  };

  bookings.push(newBooking);

  res.json({
    message: "Booking created successfully",
    booking: newBooking
  });
});

module.exports = router;