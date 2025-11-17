const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Add a menu item
// @route   POST /api/menu
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  // In a real app, you'd add more to the admin panel to do this
  try {
    const { name, description, price, category, icon } = req.body;
    const newItem = new MenuItem({
      name,
      description,
      price,
      category,
      icon: icon || 'fas fa-utensils'
    });
    const createdItem = await newItem.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;