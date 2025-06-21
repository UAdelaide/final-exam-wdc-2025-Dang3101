const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');

const app = express();

// ROUTES
const userRoutes = require('./routes/userRoutes');
const walkRoutes = require('./routes/walkRoutes');

// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(session({
  secret: 'Bill241!',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// ROUTE MOUNTING
app.use('/api/users', userRoutes);
app.use('/api/walks', walkRoutes); 

// SERVER START
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app; 
