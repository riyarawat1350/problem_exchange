const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dns = require('dns');
require('dotenv').config();

// Bypass local DNS restrictions for MongoDB Atlas SRV records
dns.setServers(['8.8.8.8', '1.1.1.1']);

const authRoutes = require('./routes/auth');
const problemRoutes = require('./routes/problems');
const answerRoutes = require('./routes/answers');
const voteRoutes = require('./routes/votes');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/problemExchange';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Problem Exchange API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
