const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

// Mount routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));

// Serve Frontend Static Files
app.use(express.static(path.join(__dirname, '../frontend')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

module.exports = app;

