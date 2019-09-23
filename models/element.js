const mongoose = require("mongoose");

const elementSchema = new mongoose.Schema({
  id: Number,
  name: String,
  symbol: String,
  appearance: String,
  phase: String,
  number: Number,
  period: Number,
  density: Number,
  summary: String,
  spectral_img: String,
  category: String,
  discovered_by: String,
  named_by: String
})

module.exports = mongoose.model("Element", elementSchema);
