const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Correct import
require('dotenv').config();

const Family = require('./models/Family');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const statuses = ['Pending', 'Assisted', 'Resolved'];

const seedFamilies = async (num = 50) => {
  await Family.deleteMany({});

  const families = [];

  for (let i = 0; i < num; i++) {
    families.push(new Family({
      familyName: faker.person.lastName(),  // Updated faker usage
      location: faker.location.city(),
      membersCount: faker.number.int({ min: 1, max: 10 }),  // Updated faker syntax
      needs: {
        food: faker.datatype.boolean(),
        clothes: faker.datatype.boolean(),
        money: faker.datatype.boolean(),
      },
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }));
  }

  await Family.insertMany(families);
  console.log(`${num} family records seeded`);
  mongoose.connection.close();
};

connectDB().then(() => seedFamilies());
