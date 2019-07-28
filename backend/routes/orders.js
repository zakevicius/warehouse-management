const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Client = require('../models/Client');
const Order = require('../models/Order');

// @route       GET api/orders
// @desc        Get all users orders
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    let orders;
    if (req.user.type === 'admin') {
      orders = await Order.find();
    } else {
      orders = await Order.find({ user: req.user.id }.sort({ orderID: -1 }))
    }
    res.json(orders);
  } catch {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error getting orders' });
  }
});

// @route       POST api/orders
// @desc        Create new order
// @access      Private
router.post('/', [
  auth,
  [
    check('sender', 'Sender is required').not().isEmpty(),
    check('receiver', 'Receiver is required').not().isEmpty(),
    check('truck', 'Truck is required').not().isEmpty(),
    check('trailer', 'Trailer is required').not().isEmpty(),
    check('qnt', 'Quantity is required').not().isEmpty(),
    check('bruto', 'Bruto is required').not().isEmpty(),
    check('clientID', 'Client is required').not().isEmpty()
  ]
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { sender, receiver, truck, trailer, qnt, bruto, description, declarations, clientID, orderID } = req.body;

    try {
      let order = await Order.findOne({ orderID });
      if (order) throw { exists: 'Order with this ID already exists' };

      const newOrder = new Order({
        user: req.user.id,
        orderID,
        sender,
        receiver,
        truck,
        trailer,
        qnt,
        bruto,
        description,
        declarations,
        clientID
      });
      order = await newOrder.save();
      res.json(order);
    } catch (err) {
      if (err.exists) return res.status(400).json({ msg: err.exists });
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error creating order' });
    }
  }
);

// @route       PUT api/orders
// @desc        Update order
// @access      Private
router.put('/:id', auth, async (req, res) => {
  const { sender, receiver, truck, trailer, qnt, bruto, description, declarations, clientID, orderID } = req.body;

  // Creating updated order object
  const newOrderInformation = {};
  if (sender) newOrderInformation.sender = sender;
  if (receiver) newOrderInformation.receiver = receiver;
  if (truck) newOrderInformation.truck = truck;
  if (trailer) newOrderInformation.trailer = trailer;
  if (qnt) newOrderInformation.qnt = qnt;
  if (bruto) newOrderInformation.bruto = bruto;
  if (description) newOrderInformation.description = description;
  if (declarations) newOrderInformation.declarations = declarations;
  if (clientID) newOrderInformation.clientID = clientID;
  if (orderID) newOrderInformation.orderID = orderID;

  try {
    let order = await Order.findById(req.params.id);

    if (!order) res.status(404).json({ msg: 'Order not found' });

    // Check if user authorized
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'not authorized' });
    }

    // Updating order
    order = await Order.findByIdAndUpdate(req.params.id,
      { $set: newOrderInformation },
      { new: true }
    );

    res.json({ order });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error updating order' });
  }
});

// @route       DELETE api/orders
// @desc        Delete order
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check if user is authorized to delete order
    if (order.user !== req.user.id) {
      if (req.user.type !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' })
      }
    }

    await Order.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Order deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error deleting order ' });
  }
});

module.exports = router;