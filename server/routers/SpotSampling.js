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

// Endpoint to retrieve regular card details::::
app.post('/spotsampling', (req, res) => {
  const { collection_time, latitude, longitude } = req.body;

  // Generate a unique serial number
  const serialNo = generateSerialNumber();

  // Insert the data into the database
  const query = 'INSERT INTO sample_details (serial_no, collection_time, latitude, longitude) VALUES ($1, $2, $3, $4)';
  const values = [serialNo, collection_time, latitude, longitude];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Error inserting data into PostgreSQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});

function generateSerialNumber() {
  // Generate the serial number logic here
  // You can use any logic or library to generate a unique serial number
  // For example, you can use a timestamp or a combination of random characters

  // Example: Generate a timestamp-based serial number
  const timestamp = Date.now();
  const serialNo = `SN-${timestamp}`;

  return serialNo;
}



  module.exports = app;