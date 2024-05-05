const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 678;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

// mongodb configuration using mongoose

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@khetibazaar-db.x4hyd2s.mongodb.net/khetibazaar_database?retryWrites=true&w=majority&appName=khetibazaar-db`
  )
  .then(
    console.log("MongoDB Connected Successfully!")
  )
  .catch((error) => console.log("Error connecting to MongoDB", error));

  // jwt authentication
  app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr'
    })
    res.send({token});
  })

//   import routes here
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');

//   routes
app.use('/menu', menuRoutes),
app.use('/carts', cartRoutes);
app.use('/users',userRoutes)

app.get("/", (req, res) => {
  res.send("Hello React Developers!");
});

const crypto = require('crypto'); // Ensure you import 'crypto'

const randomHex = crypto.randomBytes(64).toString('hex'); // Generate 64 bytes of random data and convert to hex
console.log(randomHex); // Output the random hex string


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});