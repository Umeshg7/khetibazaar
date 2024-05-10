const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 678;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require('crypto'); // Import 'crypto' to generate random strings

// middleware
app.use(cors());
app.use(express.json());

// MongoDB configuration using Mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@khetibazaar-db.x4hyd2s.mongodb.net/khetibazaar_database?retryWrites=true&w=majority&appName=khetibazaar-db`
  )
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

// JWT authentication endpoint
app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1hr',
  });
  res.send({ token });
});

// Import routes
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
const paymentRoutes = require('./api/routes/paymentRoutes');
const favoriteRoutes = require("./api/routes/favoriteRoutes"); // Ensure import is correct
const searchRoutes = require('./api/routes/searchRoutes'); // Ensure the correct import



// Register routes
app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);
app.use("/favorites", favoriteRoutes); // Check the registered endpoint
app.use('/search', searchRoutes); // Register the new route

// Stripe payment endpoint
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100; 

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "NPR",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req, res) => {
  res.send("Hello React Developers!");
});

const randomHex = crypto.randomBytes(64).toString('hex'); // Generate 64 bytes of random data
// console.log(randomHex); // Output the random hex string

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
