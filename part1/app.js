const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2/promise'); 
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

(async () => {
  try {
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Nlhd310106', 
      database: 'DogWalkService'          
    });

    console.log('Connected to MySQL');

    const apiRoutes = require('./routes/api')(db);
    app.use('/api', apiRoutes);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();
