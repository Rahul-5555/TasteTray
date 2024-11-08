const express = require('express');
const router = express.Router();
const Order = require("../models/Orders");

router.post('/orderData', async (req, res) => {
  try {
    const data = req.body.order_data;
    data.unshift({ Order_date: req.body.order_date }); // Using unshift to add data to the beginning of the array
    
    // Validate email presence
    if (!req.body.email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const eId = await Order.findOne({ email: req.body.email });
    if (eId === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data]
      });
    } else {
      await Order.findOneAndUpdate({ email: req.body.email },
        { $push: { order_data: data } });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});


module.exports = router;
