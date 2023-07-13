const express = require('express');
const cors = require('cors');
const app = express();
const db = require("../Sql/db"); 
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// app.use();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get Request
app.get("/regular", (req, res) => {
  res.send("hello regular");
});

// Endpoint to retrieve reviewpoc card details
app.get('/reviewpoc', (req, res) => {
  // Retrieve data from the database using a query
  db.query('SELECT poc_id, poc_type FROM m_point_of_collection where pollution_type = 1', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
});

// Endpoint to retrieve reviewcontainerdetails
app.get('/reviewcontainer', (req, res) => {
  // Retrieve data from the database using a query
  db.query('SELECT  container_type_id, container_type FROM m_container_type', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
});

// Endpoint to retrieve reviewtreatment details
app.get('/reviewtreatment', (req, res) => {
  // Retrieve data from the database using a query
  db.query('SELECT treatment_type_id, treatment_type FROM m_treatment_type', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
});

app.get('/reviewsampletype', (req, res) => {
  // Retrieve data from the database using a query
  db.query('SELECT sample_type_id, sample_type FROM sample_types where pollution_id = 1', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
});

app.get('/reviewcolor', (req, res) => {
  // Retrieve data from the database using a query
  db.query('SELECT sample_color_id, sample_color FROM m_sample_color', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
});

app.get('/reviewturbidity', (req, res) => {
  // Retrieve data from the database using a query
  db.query('SELECT sample_turbidity_id, sample_turbidity FROM  m_sample_turbidity', (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
});


// Multer configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // Set the destination folder where uploaded files will be stored
      cb(null, '/var/www/spcblims.enovasolutions.com/html/uploads/sample_photos');
    },
    filename: (req, file, cb) => {
      // Set the filename for the uploaded file
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
  })
});

// PUT route handling the data update
app.put('/reviewdata/:sample_id', upload.array('sample_photos', 5), (req, res) => { 

 const sample_id = parseInt(req.params.sample_id);

  // Check if sample_id is a valid integer
  if (isNaN(sample_id)) {
    res.status(400).json({ error: 'Invalid sample_id' });
    return;
  }

  const payload = req.body;
  const sample_coll_id = req.body.sample_coll_id;

  // First, retrieve the existing sample details from the database
  db.query(
    `
    SELECT SC.sample_coll_id,SD.sample_id,SC.ref_id, ST.schedule_type, SD.serial_no, SD.collection_time, SD.sampled_by, SD.latitude, SD.longitude, SD.sample_type_id, SD.poc_id, SD.container_type, SD.sample_color, SD.sample_turbidity, SD.treatment_type, SD.sample_photos
    FROM sample_details AS SD
    JOIN sample_collection AS SC ON SD.sample_coll_id = SC.sample_coll_id
    JOIN m_schedule_type AS ST ON SC.schedule_type = ST.schedule_type_id
    JOIN users AS U ON U.user_id = SD.created_by
    WHERE ST.schedule_type_id = 1
    AND SD.sample_id = $1;
    `,
    [sample_id],
    (error, result) => {
      if (error) {
        console.error('Error executing SELECT query:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (result.rows.length === 0) {
        // Sample with the given ID not found
        res.status(404).json({ error: 'Sample not found' });
        return;
      }

      // Get the existing data from the result
      const existingData = result.rows[0];

      // Modify the payload with the existing values if they are not provided in the request body
      const updatedPayload = {
        sample_type: payload.sample_type || existingData.sample_type_id,
        longitude: payload.longitude || existingData.longitude,
        latitude: payload.latitude || existingData.latitude,
        turbidity: payload.turbidity || existingData.sample_turbidity,
        serial_no: payload.serial_no || existingData.serial_no,
        point_of_collection: payload.point_of_collection || existingData.poc_id,
        collection_time: payload.collection_time || existingData.collection_time,
        container: payload.container || existingData.container_type,
        sampled_by: payload.employee_id || existingData.sampled_by,
        color: payload.color || existingData.sample_color,
        treatment_type: payload.treatment_type || existingData.treatment_type,
      };

      // Perform the UPDATE query
      db.query(
        `
        UPDATE sample_details
        SET
          sample_type_id = $1,
          longitude = $2,
          latitude = $3,
          sample_turbidity = $4,
          serial_no = $5,
          poc_id = $6,
          collection_time = $7,
          container_type = $8,
          sampled_by = $9,
          sample_color = $10,
          treatment_type = $11,
          sample_photos = $12
        WHERE
          sample_id = $13;
        `,
        [
          updatedPayload.sample_type,
          updatedPayload.longitude,
          updatedPayload.latitude,
          updatedPayload.turbidity,
          updatedPayload.serial_no,
          updatedPayload.point_of_collection,
          updatedPayload.collection_time,
          updatedPayload.container,
          updatedPayload.sampled_by,
          updatedPayload.color,
          updatedPayload.treatment_type,
          req.files.map(file => file.path).join(','),
          sample_id,
        ],
        (error, result) => {
          if (error) {
            console.error('Error executing UPDATE query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }

          res.json({ message: 'Data updated successfully' });
        }
      );
    }
  );
});


  module.exports = app;