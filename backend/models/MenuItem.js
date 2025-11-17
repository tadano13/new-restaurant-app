const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages'],
  },
  // We can add an emoji/icon field here to match your frontend
  icon: {
    type: String,
    default: 'fas fa-utensils',
  }
});

module.exports = mongoose.model('MenuItem', MenuItemSchema); 