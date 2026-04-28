require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGIN
    ? process.env.ALLOWED_ORIGIN.split(',')
    : ['http://localhost:3000'];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/services", require("./routes/services"));
app.use("/api/bookings", require("./routes/booking"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/messages", require("./routes/messages"));

const PORT = process.env.PORT || 7123;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
