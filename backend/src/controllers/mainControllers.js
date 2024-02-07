const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3001;

let saldo = 10000000000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/api/saldo', (req, res) => {
  res.json({ saldo });
});

app.post('/api/saldo', (req, res) => {
  const { topup } = req.body;

  if (typeof topup !== 'number') {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  saldo += topup;

  // Save the topup amount to a text file
  fs.appendFile('./src/controllers/history.txt', `${topup}\n`, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log(`Topup amount ${topup} saved to history.txt`);
    res.json({ saldo });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
