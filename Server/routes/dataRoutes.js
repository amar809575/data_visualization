const express = require('express');
const router = express.Router();
const Data = require('../models/dataModels');


router.get('/', async (req, res) => {
    const { end_year, start_year, year, region, country, city, sector, pestle, source, swot, topic } = req.query;
  const filter = {};

  if (end_year) filter.end_year = end_year;
  if (start_year) filter.start_year = start_year;
  if (year) filter.year = year;
  if (region) filter.region = region;
  if (country) filter.country = country;
  if (city) filter.city = city;
  if (sector) filter.sector = sector;
  if (pestle) filter.pestle = pestle;
  if (source) filter.source = source;
  if (swot) filter.swot = swot;
  if (topic) filter.topic = topic;

  try {
    const data = await Data.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
});


module.exports = router;