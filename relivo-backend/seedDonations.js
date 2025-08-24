const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Correct import
require('dotenv').config();

const Donation = require('./models/Donation');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const donationTypes = ['Money', 'Food', 'Clothes'];
const statuses = ['Pending', 'Approved', 'Assigned'];

const seedDonations = async (num = 50) => {
  await Donation.deleteMany({});

  const donations = [];

  for (let i = 0; i < num; i++) {
    donations.push(new Donation({
      donorName: faker.person.fullName(),  // NOTE this change here
      type: donationTypes[Math.floor(Math.random() * donationTypes.length)],
      amount: faker.number.int({ min: 1, max: 1000 }),  // updated faker syntax
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }));
  }

  await Donation.insertMany(donations);
  console.log(`${num} donation records seeded`);
  mongoose.connection.close();
};

connectDB().then(() => seedDonations());
