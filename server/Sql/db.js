const { Pool } = require('pg');

// Create a connection pool to PostgreSQL
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_pcb',
  password: 'Dollar$1',
  port: 5432,
});

// Test the connection
db.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
    release(); // Release the client back to the pool
  }
});

module.exports = db;
