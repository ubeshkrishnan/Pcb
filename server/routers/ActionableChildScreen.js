const express = require('express');
const cors = require('cors');
const app = express();
const db = require("../Sql/db"); 
// app.use();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get Request
app.get("/actionable", (req, res) => {
  res.send("hello Actionabele");
});


app.get('/actionablecreenchild/:sample_coll_id', (req, res) => {
  const sample_coll_id = req.params.sample_coll_id;
  db.query(`
    SELECT ST.schedule_type, SD.serial_no, SD.collection_time, U.employee_id, SD.latitude, SD.longitude,
    STT.sample_type, POC.poc_type
    FROM sample_details AS SD
    JOIN sample_collection AS SC ON SD.sample_coll_id = SC.sample_coll_id
    JOIN m_schedule_type AS ST ON SC.schedule_type = ST.schedule_type_id
    LEFT JOIN users AS U ON U.user_id = SD.created_by
    JOIN sample_types AS STT ON CAST(STT.sample_type_id as varchar) = SC.sample_type_id
    LEFT JOIN m_point_of_collection AS POC ON SD.poc_id = POC.poc_id    
    WHERE SC.sample_coll_id = $1;
  `, [sample_coll_id], (error, result) => {
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