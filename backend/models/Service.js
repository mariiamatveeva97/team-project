const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: String,
  price: Number,
  duration: String,
  image: String,
  category: String,
  keywords: String 
});

module.exports = mongoose.model('Service', ServiceSchema);