const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    end_year: { type: String, default: '' },
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: { type: String, default: '' },
    impact: { type: String, default: '' },
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
  });
  
  module.exports = mongoose.model('Data', DataSchema);