const express = require('express');
const cors = require('cors');
const app = express();

// app.use();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/dash", (req, res) => {
  res.send("hello Dasboard");
});

// Dashboard
// Endpoint to retrieve dashboard data
app.get('/dashboard', (req, res) => {
    // Assume the dynamic data is retrieved from a database or another data source
    const completed = 180;
    const incomplete = 60;
    const scheduled = 100;
    const unscheduled = 220;
  
    const data = {
      completed,
      incomplete,
      scheduled,
      unscheduled,
    };
  
    res.json(data);
  });



module.exports = app;