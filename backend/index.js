const express = require('express');
const app = express();
const cors = require('cors');
const { Client } = require('pg');

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`);
  next();
});

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'tranaware',
  port: 5432,
});

client.connect();

app.get('/products', async (req, res) => {
  try {
    const result = await client.query(`
      SELECT 
        product_id, 
        name, 
        price, 
        image_url,
        product_type
      FROM products
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await client.query(
      'INSERT INTO contact (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );

    res.status(201).json({ message: 'Message saved successfully!' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error, try again later.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
