// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware dasar
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// health check
app.get('/health', (req, res) => {
  return res.status(200).json({
    success: true,
    status: 'OK',
    message: 'Gym Management API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// base API routes
app.use('/api', routes);

// 404 fallback
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
