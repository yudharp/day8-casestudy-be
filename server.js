const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

let saldo = 100;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/api/saldo', (req, res) => {
  res.json({ saldo });
});

app.post('/api/saldo', (req, res) => {
  const {topup } = req.body;
  if (typeof topup !== 'number') {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  saldo += topup;
  res.json({ saldo });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


