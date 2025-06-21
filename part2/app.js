// app.js - Entry point of the server
const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');

const app = express();
const userRoutes = require('./routes/userRoutes');
const db = require('./models/db'); // Ensures DB connection is tested

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(session({
  secret: 'Bill241!',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));
// Routes
app.use('/api/users', userRoutes);

// Server start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;