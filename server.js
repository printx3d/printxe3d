// server.js
const express = require('express');
require('dotenv').config();
const Stripe = require('stripe');
const cors = require('cors');
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Clé chargée depuis .env

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency, description, email } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      receipt_email: email,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log('Serveur Stripe démarré sur http://localhost:4242'));