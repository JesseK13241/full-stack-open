const express = require('express');
const cors = require('cors');
const habitsRouter = require('./routes/habits');
const { pool } = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/habits', habitsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});

// Ensure the database is set up
pool.query(`
  CREATE TABLE IF NOT EXISTS habits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    completion_dates DATE[] DEFAULT ARRAY[]::DATE[]
  )
`).then(() => {
  console.log('Database initialized');
}).catch(err => {
  console.error('Error initializing database', err);
});