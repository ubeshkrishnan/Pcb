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
app.get('/reviewdata', (req, res) => {
  // Retrieve data from the database using a query with JOIN
  db.query('SELECT * FROM m_point_of_collection', (error, result) => {
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