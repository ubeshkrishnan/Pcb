const express = require('express');
const cors = require('cors');
const app = express();
const db = require("../Sql/db"); 
const bodyParser = require('body-parser');

// app.use();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get Request
app.get("/spotsampling", (req, res) => {
  res.send("hello Spot sample");
});



// Endpoint to retrieve regular card details
app.get('/spotpointofcollection', (req, res) => {
  const { poc_id, collection_time, latitude, longitude, sample_id } = req.query;

  // Update the sample_details table with the provided values
  const query = `UPDATE sample_details SET poc_id = $1, collection_time = $2, latitude = $3, longitude = $4 WHERE sample_id = $5 AND poc_ic = $6`;
  const values = [poc_id, collection_time, latitude, longitude, sample_id, poc_id];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ success: true });
    }
  });
});




  module.exports = app;