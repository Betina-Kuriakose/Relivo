const mongoose = require('mongoose');

const FamilySchema = new mongoose.Schema({
  familyName: { type: String, required: true, trim: true },
  location: { type: String, required: true },
  membersCount: { type: Number, required: true, min: 1 },
  needs: {
    food: { type: Boolean, default: false },
    clothes: { type: Boolean, default: false },
    money: { type: Boolean, default: false },
  },
  status: {
    type: String,
    enum: ['Pending', 'Assisted', 'Resolved'],
    default: 'Pending',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Family', FamilySchema);
