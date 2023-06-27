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
app.get('/reviewsample_typ', (req, res) => {
  // Retrieve data from the database using a query
  db.query('SELECT sample_type_id, sample_type FROM sample_types', (error, result) => {
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

// Endpoint to retrieve regular card details
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


app.post('/reviewsampledetails', (req, res) => {
  // Retrieve data from the database using a query with JOIN
  db.query(`
    SELECT ST.schedule_type, SD.serial_no, SD.collection_time, U.employee_id, SD.latitude, SD.longitude,
      STT.sample_type, POC.poc_type, SD.container_type, C.sample_color, T.sample_turbidity, TT.treatment_type
    FROM sample_details AS SD
    JOIN sample_collection AS SC ON SD.sample_coll_id = SC.sample_coll_id
    JOIN m_schedule_type AS ST ON SC.schedule_type = ST.schedule_type_id
    JOIN m_sample_color AS C ON C.sample_color_id = SD.sample_color
    JOIN m_sample_turbidity AS T ON SD.sample_turbidity = T.sample_turbidity_id
    JOIN m_treatment_type AS TT ON TT.treatment_type_id = SD.treatment_type
    JOIN users AS U ON U.user_id = SD.created_by
    JOIN sample_types AS STT ON STT.sample_type_id = SC.sample_type_id
    JOIN m_point_of_collection AS POC ON SD.poc_id = POC.poc_id;
  `, (error, result) => {
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