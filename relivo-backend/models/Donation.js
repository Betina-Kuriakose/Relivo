const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Money', 'Food', 'Clothes'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Approved', 'Assigned']
  }
}, {
  timestamps: true  // adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Donation', DonationSchema);
