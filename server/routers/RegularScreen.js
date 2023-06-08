const express = require('express');
const cors = require('cors');
const app = express();
const db = require("../Sql/db"); 
// app.use();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get Request
app.get("/regular", (req, res) => {
  res.send("hello regular");
});

// Endpoint to retrieve regular card details
app.get('/regularcarddetail', (req, res) => {
  // Retrieve data from the database using a query with JOIN
  db.query('SELECT * FROM industry_list', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
});



// Endpoint to retrieve regular card details
app.get('/regularscheduletype', (req, res) => {
  // Retrieve data from the database using a query
  db.query('SELECT * FROM m_location_types', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
});

// Endpoint to retrieve regular card details
app.get('/sampletypes', (req, res) => {
  // Retrieve data from the database using a query
  db.query('SELECT * FROM sample_types', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
});
module.exports = app;