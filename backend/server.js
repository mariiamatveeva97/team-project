require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const Service = require('./models/Service');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Routes
const servicesRoutes = require("./routes/services");
const bookingsRoutes = require("./routes/booking");
const authRoutes = require("./routes/auth");

app.use("/api/services", servicesRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/seed", async (req, res) => {
  try {
    console.log("Seed request received...");
    await Service.deleteMany({});
    res.send("Database seeded with 7 services successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error seeding database");
  }
});


const PORT = process.env.PORT || 7123;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));