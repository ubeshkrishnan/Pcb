const express = require('express');
const cors = require('cors');
const crypto = require("crypto");
const app = express();
const pool = require("../Sql/db"); 

// app.use();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("hello world LOCAL");
});

// Login
app.post("/auth", (req, res) => {
  const { email, password } = req.body;
  const md5Password = crypto.createHash("md5").update(password).digest("hex");
  const sql = "SELECT * FROM users WHERE email = $1";
  pool.query(sql, [email], async (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error occurred" });
    } else if (result.rows.length === 0) {
      res.status(401).send({ message: "Invalid username or password" });
    } else {
      const user = result.rows[0];
      const storedPassword = user.password; // Assuming the password column in the database is named 'password'

      if (storedPassword === md5Password) {
        console.log("Login successful");
        res.status(200).send({ message: "Login successful" });
      } else {
        console.log("Invalid username or password");
        res.status(401).send({ message: "Invalid username or password" });
      }
    }
  });
});

module.exports = app;