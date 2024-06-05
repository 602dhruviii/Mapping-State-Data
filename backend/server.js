const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = []; // This will act as our in-memory database for users
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'my_database',
    password: 'Dhruvi@123',
    port: 5432,
});
// Secret key for JWT
const JWT_SECRET = '2e6eff01b136df01cb9fede9ce3160996038d7fabb83ad3cf93ce8a01ee52fcc11695f4900f0d21df7ed95b89a9b69265d4409d8c1fedfe24f49eafa88078b6c';

// Register endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  res.status(201).send('User registered');
});

// Login endpoint
app.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid email or password');
  }
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Protected route example
app.get('/map', authenticateJWT, (req, res) => {
  res.send('This is the protected map route.');
});

app.get('/api/state-data', async (req, res) => {
  try {
    const result = await pool.query('SELECT state_name, num_colleges FROM states');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching state data:', error);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
