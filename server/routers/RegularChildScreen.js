const express = require('express');
const cors = require('cors');
const app = express();
const pool = require("../Sql/db"); 

// app.use();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("hello world LOCAL");
});

// Endpoint to retrieve regular card details
app.get('/regularscreenchild', (req, res) => {
    // Retrieve data from the database using a query
    pool.query('SELECT * FROM m_point_of_collection', (error, result) => {
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
app.get('/collection_time', (req, res) => {
  // Retrieve data from the database using a query
  pool.query('SELECT * FROM m_point_of_collection', (error, result) => {
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