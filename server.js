const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let simulatedBalances = {};

app.post('/set_balance', (req, res) => {
  const { wallet, value } = req.body;
  if (!wallet || !value) return res.status(400).json({ error: 'Missing wallet or value' });

  simulatedBalances[wallet.toLowerCase()] = value;
  return res.json({ success: true });
});

app.get('/get_balance/:wallet', (req, res) => {
  const wallet = req.params.wallet.toLowerCase();
  const balance = simulatedBalances[wallet] || "0";
  return res.json({ wallet, balance });
});

app.listen(PORT, () => {
  console.log(`Fake USDT backend running on port ${PORT}`);
});
