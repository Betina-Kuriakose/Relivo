const Donation = require('../models/Donation');

// Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ error: 'Failed to create donation' });
  }
};

// Get all donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
};

// Update donation status (e.g., approve or assign)
exports.updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    donation.status = status;
    await donation.save();

    res.json(donation);
  } catch (error) {
    console.error('Error updating donation status:', error);
    res.status(500).json({ error: 'Failed to update donation status' });
  }
};
