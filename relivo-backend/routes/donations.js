const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// POST /donation
router.post('/', async (req, res) => {
  try {
    const { donorName, type, amount } = req.body;
    const donation = await Donation.create({ donorName, type, amount });
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create donation' });
  }
});

// GET /donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.findAll();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

module.exports = router;
