const express = require('express');
const cors = require('cors');
const app = express();
const db = require("../Sql/db"); 
// app.use();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/modalregular", (req, res) => {
  res.send("hello modalregular");
});


app.post('/modalregular', (req, res) => {
  const { serialno, companyname, taluk, village, sample, category, scheduletype, sampletype } = req.body;

  // Insert the data into the PostgreSQL database with a join between sample_details and m_point_of_collection tables
  const query = `
    INSERT INTO sample_details (serialno, poi, taluk, village, sample, category, scheduletype, sampletype)
    SELECT $1, $2, $3, $4, $5, $6, $7, $8
    FROM m_point_of_collection
    WHERE m_point_of_collection.poc_id = $9`;
  const values = [serialno, companyname, taluk, village, sample, category, scheduletype, sampletype, req.body.poc_id];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'An error occurred while saving the data' });
    } else {
      res.status(200).json({ message: 'Data saved successfully' });
    }
  });
});

// Endpoint to retrieve regular card details
app.get('/pointofcollectionoptions', (req, res) => {
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