const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// Create donation
router.post('/', donationController.createDonation);

// Get all donations
router.get('/', donationController.getAllDonations);

// Update donation status
router.patch('/:id', donationController.updateDonationStatus);

// Delete donation (optional)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Donation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Donation not found' });
    res.json({ message: 'Donation deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete donation' });
  }
});

module.exports = router;
