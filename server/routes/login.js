const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists in the database
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);
  
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const user = result.rows[0];
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Authentication successful
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred during login' });
    }
  });

  module.exports = app;