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

app.get("/", (req, res) => {
  res.send("hello wolrd LOCAL");
});



// Login
app.post("/auth", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = $1 AND raw_password = $2";
  pool.query(sql, [email, password],async (err, result) => {
    const awt = await result
    console.log(awt);
    if (err) {
      res.status(500).send({ message: "Error occurred" });
    } else if (result.rows.length === 0) {
      res.status(401).send({ message: "Invalid username or password" });
    } else {
      console.log("Result:", result.rows);
      res.status(200).send({ message: "Login successful LOCAL" });
    }
  });
});

// Dashboard
// Endpoint to retrieve dashboard data
  app.get('/dashboard', (req, res) => {
  // Assume the dynamic data is retrieved from a database or another data source
  const completed = 180;
  const incomplete = 60;
  const scheduled = 100;
  const unscheduled = 220;

  const data = {
    completed,
    incomplete,
    scheduled,
    unscheduled,
  };

  res.json(data);
});


// Regular screen
app.get('/regularcarddetail', (req, res) => {


});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

