const { Pool } = require('pg');

// Create a connection pool to PostgreSQL
const db = new Pool({
  user: 'cloud-user',
  host: '43.204.187.76',
  database: 'db_spcblims',
  password: 'Dollar$6',
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
