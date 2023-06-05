const express = require('express');
const cors = require('cors');
const app = express();
const pool = require("../Sql/db"); // Import the pool object

// app.use();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/finger", (req, res) => {
  res.send(" finger");
});

// Route to handle authentication
app.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const query = 'SELECT * FROM users WHERE username = $1';
      const values = [username];
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const user = result.rows[0];
  
      // Compare the provided password with the hashed password from the database
      const isPasswordValid = await compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Authentication successful
      return res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
      console.log('Authentication error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });







module.exports = app;