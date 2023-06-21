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
// Endpoint to retrieve regular card details
// spotpointofcollection

// Endpoint to retrieve point of collection options
app.get('/spotpointofcollection', (req, res) => {
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

// spotpointofcollection

app.post('/spotpostpoc', (req, res) => {
  const { poc_val, collection_time_val, latitude_val, longitude_val, serial_no,created_by } = req.body;
db.query('SELECT sample_coll_id FROM sample_collection WHERE ref_id = $1 ORDER BY sample_coll_id DESC LIMIT 1', [serial_no], (error, result) => {

    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'An error occurred while updating the data' });
    } else {
     console.log("USER TRY",result.rows)
      if (result.rows.length !==0) {
       
         const query2 = `INSERT into sample_details(collection_time,latitude,longitude,poc_id,serial_no,sample_coll_id,created_by,created_date)values( $1,$2,$3,$4,$5,$6,$7,$8)`;

         const values2 = [collection_time_val, latitude_val, longitude_val, poc_val,serial_no, result.rows[0].sample_coll_id,created_by,"2023-05-09 09:28:48"];
       
         db.query (query2, values2, (error, result) => {
           if (error) {
             console.error('Error executing query', error);
             res.status(500).json({ error: 'An error occurred while updating the data' });
           } else {
             res.status(200).json({ message: 'Data INSERTED successfully' });
           }
         });
        } 
         else { res.status(500).json({ error: 'An error occurred while inserting the data' });}
      
    }
  });
});



  module.exports = app;