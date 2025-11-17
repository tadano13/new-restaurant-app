const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
router.post('/', async (req, res) => {
  const { tableNumber, items, total } = req.body;

  if (!tableNumber || !items || items.length === 0) {
    return res.status(400).json({ message: 'Missing order details' });
  }

  try {
    const order = new Order({
      tableNumber,
      items,
      total,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get orders (by status)
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
  const { status } = req.query; // e.g., ?status=pending
  try {
    const query = status ? { status } : {};
    const orders = await Order.find(query).sort({ timestamp: -1 }); // Newest first
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update order status to completed
// @route   PATCH /api/orders/:id
// @access  Private/Admin
router.patch('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = 'completed';
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.remove();
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;