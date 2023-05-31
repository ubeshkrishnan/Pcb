const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const client = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_pcb',
  password: 'Dollar$1',
  port: 5432,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Connection error', err.stack);
  }
}

connectToDatabase();

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Retrieve user from the database
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const result = await client.query(query, values);

  if (result.rowCount === 0) {
    // User not found
    return res.status(401).json({ error: 'Invalid email or password' });
    
  }

  const user = result.rows[0];

  if (password !== user.raw_password) {
    // Invalid password
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Successful login
  return res.status(200).json({ message: 'Login successfulll' });
  
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
