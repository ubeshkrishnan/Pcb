const express = require('express');
const cors = require('cors');
const crypto = require("crypto");
const app = express();
const db = require("../Sql/db"); 

// app.use();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("hello world LOCAL");
});

// Login
//app.post("/auth", (req, res) => {
//   const { empId, password } = req.body;
// const md5Password = crypto.createHash("md5").update(password).digest("hex");
//   const sql = "SELECT user_id, district, employee_id, password, region, designation, dob, office_id, user_img, user_name, first_name, last_name, phone_no, gender FROM users WHERE employee_id = $1";  
//   db.query(sql, [empId], async (err, result) => {
//     if (err) {
// console.log(err);
//       res.status(500).send({ message: "Error occurred" });
//     } else if (result.rows.length === 0) {
//       res.status(401).send({ message: "Invalid username or password" });
//     } else {
//       const user = result.rows[0];
//       const storedPassword = user.password; // Assuming the password column in the database is named 'password'

//       if (storedPassword === md5Password) {
//         console.log("Login successful");
//         res.status(200).send({ success:true  });
//       } else {
//         console.log("Invalid username or password");
//         res.status(401).send({ message: "Invalid username or password" });
//       }
//     }
//   });
// });

app.post("/auth", (req, res) => {
  const { empId, password } = req.body;
  const md5Password = crypto.createHash("md5").update(password).digest("hex");
  const sql = "SELECT user_id, district, employee_id, password, region, designation, dob, office_id, user_img, user_name, first_name, last_name, address, phone_no, gender FROM users WHERE employee_id = $1";  
  db.query(sql, [empId], async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error occurred" });
    } else if (result.rows.length === 0) {
      res.status(401).send({ message: "Invalid username or password" });
    } else {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (storedPassword === md5Password) {
        console.log("Login successful");

        // Include the user details in the response
        const userDetails = {
          user_id: user.user_id,
          district: user.district,
          employee_id: user.employee_id,
          region: user.region,
          designation: user.designation,
          dob: user.dob,
          office_id: user.office_id,
          user_img: user.user_img,
          user_name: user.user_name,
          first_name: user.first_name,
          last_name: user.last_name,
          phone_no: user.phone_no,
          gender: user.gender,
        };

        res.status(200).send({ success: true, user: userDetails });
      } else {
        console.log("Invalid username or password");
        res.status(401).send({ message: "Invalid username or password" });
      }
    }
  });
});


module.exports = app;