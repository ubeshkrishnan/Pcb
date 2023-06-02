const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 5005;
const cors = require('cors');
const { application } = require('express');

// Create a connection pool to PostgreSQL
const pool = new Pool({

  user: 'postgres',
  host: 'localhost',
  database: 'db_pcb',
  password: 'Dollar$1',
  port: 5432,
});

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// app.use(cors({
// }));

app.get("/", (req, res) => {
  res.send("hello wolrd");
});
// Route to handle login request
app.post('/auth', (req, res) => {
  const { email, password } = req.body;

  // Query the database using the provided email
  // pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
  //   console.log(email);
  //   if (error) {
  //     console.error('Error during login:', error);
  //     res.status(500).json({ error: 'An error occurred during login' });
  //   } else if (results.rows.length === 0) {
  //     res.status(401).json({ error: 'Invalid email or password' });
  //   } else {
  //     const user = results.rows[0];
  
  //     // Compare the provided password with the raw password stored in the database
  //     if (password !== user.raw_password) {
  //       res.status(401).json({ error: 'Invalid email or password' });
  //     } else {
  //       res.status(200).json({ message: 'Login successful' });
  //     }
  //   }
  // });
  app.post("/auth", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND raw_password = ?";
    pool.query(sql, [email, password], (err, result) => {
      if (err) {
        res.status(500).send({ message: "Error occurred" });
      } else if (result.length === 0) {
        res.status(401).send({ message: "Invalid username or password" });
      } else {
        console.log("ddddddddddd", result);
      
        res
          .status(200)
          .send({ message: "Login successful"});
      }
    });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

