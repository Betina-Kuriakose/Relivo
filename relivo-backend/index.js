require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const donationRoutes = require('./routes/donations');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Use middlewares first
app.use(cors());
app.use(express.json());

// Define routes after middleware
app.use('/auth', authRoutes);
app.use('/donation', donationRoutes);

app.get('/', (req, res) => {
  res.send('Relivo Backend is running');
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
