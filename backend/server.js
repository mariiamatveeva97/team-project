const express = require("express");
const cors = require("cors");

const app = express(); // ✅ FIRST

// ✅ Middleware MUST come before routes
app.use(cors());
app.use(express.json());

// Routes
const servicesRoutes = require("./routes/services");
const bookingsRoutes = require("./routes/booking");

app.use("/api/services", servicesRoutes);
app.use("/api/bookings", bookingsRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});