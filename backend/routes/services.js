const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Haircut & Styling", price: 45 },
    { id: 2, name: "Luxury Beard Grooming", price: 30 }
  ]);
});

module.exports = router;