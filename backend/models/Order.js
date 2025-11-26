const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  tableNumber: {
    type: String,
    required: true,
  },
  items: [
    {
      id: { type: String }, 
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Order', OrderSchema);
