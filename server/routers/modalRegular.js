const express = require('express');
const cors = require('cors');
const app = express();
const db = require("../Sql/db"); 
// app.use();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/modal", (req, res) => {
  res.send("hello modalregular");
});


app.post('/data', (req, res) => {
    const { serialno, companyname, taluk, village, sample, category, scheduletype, sampletype } = req.body;
  
    // Insert the data into the PostgreSQL database
    const query = 'INSERT INTO your_table (serialno, companyname, taluk, village, sample, category, scheduletype, sampletype) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [serialno, companyname, taluk, village, sample, category, scheduletype, sampletype];
  
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'An error occurred while saving the data' });
      } else {
        res.status(200).json({ message: 'Data saved successfully' });
      }
    });
  });
  
  module.exports = app;