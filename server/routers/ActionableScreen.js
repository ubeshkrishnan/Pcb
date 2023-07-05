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
  res.send("hello Actioable");
});

// Endpoint to retrieve regular card details
app.get('/actionablecarddetail', (req, res) => {
  db.query(`
    SELECT SC.sample_coll_id,SC.ref_id,IL.company_name, IL.industry_location AS region, IL.category, IL.village,
ST.schedule_type, COUNT(sample_id) AS no_of_samples
FROM sample_collection AS SC
JOIN industry_list AS IL ON SC.industry_id = IL.industry_id
JOIN m_schedule_type AS ST ON ST.schedule_type_id = SC.schedule_type
JOIN sample_details AS SD ON SD.sample_coll_id = SC.sample_coll_id
WHERE date_trunc('month', to_timestamp(schedule_month, 'YYYY-MM')) = date_trunc('month', CURRENT_TIMESTAMP)
AND SC.schedule_type != 1
GROUP BY SC.sample_coll_id, IL.company_name, IL.industry_location, IL.category, IL.village, ST.schedule_type
ORDER BY SC.schedule_type DESC;`, (error, result) => {
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