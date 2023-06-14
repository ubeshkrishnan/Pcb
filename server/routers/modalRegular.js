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


// app.post('/modalregular', (req, res) => {
//   const { serial_no, point_of_collection, collection_time, latitude, longitude} = req.body;

//   // Insert the data into the PostgreSQL database with a join between sample_details and m_point_of_collection tables
//   const query = `
//     INSERT INTO sample_details (serial_no, poi, collection_time, latitude, longitude)
//     SELECT $1, $2, $3, $4, $5, $6, $7, $8
//     FROM m_point_of_collection
//     WHERE m_point_of_collection.poc_id = $9`;
//   const values = [serial_no, point_of_collection, collection_time, latitude, longitude, req.body.poc_id];

//   db.query(query, values, (error, result) => {
//     if (error) {
//       console.error('Error executing query', error);
//       res.status(500).json({ error: 'An error occurred while saving the data' });
//     } else {
//       res.status(200).json({ message: 'Data saved successfully' });
//     }
//   });
// });

app.post('/modalregular', (req, res) => {
  const { poc_val, collection_time_val, latitude_val, longitude_val } = req.body;

  const data = {
    poc_id: poc_val,
    collection_time: collection_time_val,
    latitude: latitude_val,
    longitude: longitude_val,
  };

  // Update the existing data in the PostgreSQL database
  const query = `
  UPDATE sample_details
  SET collection_time = $1,
      latitude = $2,
      longitude = $3
  WHERE poc_id = $4`;

  const values = [collection_time_val, latitude_val, longitude_val, poc_val];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'An error occurred while updating the data' });
    } else {
      res.status(200).json({ message: 'Data updated successfully' });
    }
  });
});



// Endpoint to retrieve point of collection options
app.get('/pointofcollectionoptions', (req, res) => {
  // Retrieve data from the database
  db.query('SELECT * FROM m_point_of_collection', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
})

  module.exports = app;