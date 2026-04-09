const Service = require("../models/Service");
const express = require("express");
const router = express.Router();

// Fetch all available salon services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find(); 
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
});

module.exports = router;