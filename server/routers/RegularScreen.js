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
// app.get('/regularcarddetail', (req, res) => {
//   // Retrieve data from the database using a query with JOIN
//   db.query('SELECT * FROM industry_list', (error, result) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     } else {
//       const data = result.rows;
//       res.json(data);
//     }
//   });
// });

// Endpoint to retrieve regular card details
app.get('/regularcarddetail', (req, res) => {
  db.query(`
    SELECT SC.sample_coll_id,SC.ref_id,IL.company_name, IL.industry_location AS region, IL.category, IL.village,
      ST.schedule_type, COUNT(sample_id) AS no_of_samples, string_agg(STP.sample_type,',') as sample_type
    FROM sample_collection AS SC
    JOIN industry_list AS IL ON SC.industry_id = IL.industry_id
    JOIN m_schedule_type AS ST ON ST.schedule_type_id = SC.schedule_type
    LEFT JOIN sample_details AS SD ON SD.sample_coll_id = SC.sample_coll_id
    LEFT JOIN sample_types AS STP ON STP.sample_type_id = SD.sample_type_id
    WHERE date_trunc('month', to_timestamp(schedule_month, 'YYYY-MM')) = date_trunc('month', CURRENT_TIMESTAMP)
    AND SC.schedule_type = 1
    GROUP BY sc.sample_coll_id,il.company_name,il.industry_location,il.category,il.village,st.schedule_type;`, (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
});

// app.get('/regularcarddetail/:sample_coll_id', (req, res) => {
//   const sample_coll_id = req.params.sample_coll_id;

//   db.query(`
//     SELECT SC.sample_coll_id, SC.ref_id, IL.company_name, IL.industry_location AS region, IL.category, IL.village,
//       ST.schedule_type, COUNT(sample_id) AS no_of_samples, STP.sample_type
//     FROM sample_collection AS SC
//     JOIN industry_list AS IL ON SC.industry_id = IL.industry_id
//     JOIN m_schedule_type AS ST ON ST.schedule_type_id = SC.schedule_type
//     JOIN sample_details AS SD ON SD.sample_coll_id = SC.sample_coll_id
//     JOIN sample_types AS STP ON STP.sample_type_id = SC.sample_type_id
//     WHERE SC.sample_coll_id = $1
//       AND date_trunc('month', to_timestamp(schedule_month, 'YYYY-MM')) = date_trunc('month', CURRENT_TIMESTAMP)
//     GROUP BY SC.sample_coll_id, IL.company_name, IL.industry_location, IL.category, IL.village, ST.schedule_type, STP.sample_type;
//   `, [sample_coll_id], (error, result) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     } else {
//       const data = result.rows;
//       res.json(data);
//     }
//   });
// });




module.exports = app;