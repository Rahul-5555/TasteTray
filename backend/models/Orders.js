const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    // unique: true // Depending on your use case, you may want to remove this line
  },
  order_data: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
