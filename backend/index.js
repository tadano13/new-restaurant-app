const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path'); // --- NEW: Import path module

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers (Your API)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));

// --- NEW: Serve Frontend Static Files ---
// This tells Express to serve the files from your 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend')));

// --- NEW: Catch-all Route ---
// Any request that isn't an API call will return the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Export the app for Vercel
module.exports = app;
