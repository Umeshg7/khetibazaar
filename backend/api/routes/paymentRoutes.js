const express = require("express");
const axios = require("axios");
const router = express.Router();

const khaltiSecretKey = process.env.KHALTI_SECRET_KEY;

// Endpoint to initiate a payment with Khalti
router.post("/initiate", async (req, res) => {
  const { productName, productIdentity, productUrl, amount } = req.body;

  const config = {
    headers: {
      Authorization: `Key ${khaltiSecretKey}`,
    },
  };

  try {
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/initiate/",
      { productName, productIdentity, productUrl, amount },
      config
    );

    res.json(response.data); // Send back the response
  } catch (error) {
    console.error("Error initiating payment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Endpoint to verify a payment with Khalti
router.post("/verify", async (req, res) => {
  const { token, amount } = req.body;

  const config = {
    headers: {
      Authorization: `Key ${khaltiSecretKey}`,
    },
  };

  try {
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      { token, amount },
      config
    );

    res.json(response.data); // Return the verification result
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
