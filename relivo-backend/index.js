require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const donationRoutes = require('./routes/donations');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Relivo Backend is running');
});

app.use('/donation', donationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
