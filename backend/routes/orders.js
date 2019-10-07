const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const sendMail = require('../config/email');
const ObjectID = require('mongodb').ObjectID;

// const User = require('../models/User');
// const Client = require('../models/Client');
const Order = require('../models/Order');
const Client = require('../models/Client');
const Loading = require('../models/Loading');

// @route       GET api/orders
// @desc        Get all users orders
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    let orders;
    let ordersArr = [];
    if (req.user.type === 'admin') {
      orders = await Order.find({ clientID: { $ne: '5d9323e6816b7d3bbcc65f8d' } }).sort({ date: -1 });
    } else {
      for (let i = 0; i < req.user.clients.length; i++) {
        orders = await Order.find({ clientID: req.user.clients[i] }).sort({ date: -1 });
        ordersArr.push(orders);
      }
      orders = ordersArr[0];
      if (ordersArr.length > 0) {
        for (let i = 1; i < ordersArr.length; i++) {
          orders = orders.concat(ordersArr[i]);
        }
      }
    }
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error getting orders' });
  }
});

// @route       GET api/orders/id
// @desc        Get single order
// @access      Private
router.get('/:id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id, (err, res) => res);
    if (req.user.type === 'admin' || req.user.clients.indexOf(order.clientID.toString()) >= 0) {
      res.json(order);
    } else {
      throw ({ msg: 'Not authorized' })
    }
  } catch (err) {
    console.error(err.message);
    let msg = 'Server error getting order';
    if (err.msg) {
      msg = err.msg;
    }
    res.status(500).json({ msg });
  }
});

// @route       POST api/orders
// @desc        Create new order
// @access      Private
router.post('/', [
  auth,
  [
    check('orderID', 'Order ID is require').not().isEmpty(),
    check('sender', 'Sender is required').not().isEmpty(),
    check('receiver', 'Receiver is required').not().isEmpty(),
    check('truck', 'Truck is required').not().isEmpty(),
    check('trailer', 'Trailer is required').not().isEmpty(),
    check('qnt', 'Quantity is required').not().isEmpty(),
    check('bruto', 'Bruto is required').not().isEmpty(),
    check('clientID', 'Client is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
  ]
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array()[0].msg });
    }

    const { additionalID, sender, receiver, truck, trailer, qnt, bruto, description, declarations, clientID, orderID, status, date } = req.body;

    try {
      let orderWithID = await Order.findOne({ orderID });
      let orderWithAdditionalID = await Order.findOne({ additionalID });
      let client = await Client.findOne({ _id: clientID });

      if (orderWithID) return res.status(400).json({ msg: 'Order with this ID already exists' });
      if (orderWithAdditionalID && additionalID !== '') return res.status(400).json({ msg: 'Order with this additional ID already exists' });

      const newOrder = new Order({
        user: req.user.id,
        orderID,
        additionalID,
        sender,
        receiver,
        truck,
        trailer,
        qnt,
        bruto,
        description,
        declarations,
        clientID,
        status,
        date
      });

      const order = await newOrder.save();

      // for (let i = 2; i <= 20; i++) {
      //   const newOrder = new Order({
      //     user: req.user.id,
      //     additionalID: `D${i}`,
      //     orderID: `DEMO${i}`,
      //     sender: `DEMO${i}`,
      //     receiver: `DEMO${i}`,
      //     truck: `DEMO${i}${i}${i}`,
      //     trailer: `DEMO${i}${i}`,
      //     qnt: `${i * 10}`,
      //     bruto: `${i * 1000}`,
      //     description,
      //     declarations,
      //     clientID,
      //     status
      //   });
      //   order = await newOrder.save();
      // }

      client.email.forEach(email => {
        sendMail(email, `Order ID: ${orderID} was created`, `Order ID: ${orderID} from ${sender} to ${receiver} was created`);
      });

      res.json(order);
    } catch (err) {
      if (err.exists) return res.status(400).json({ msg: err.exists });
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error creating order' });
    }
  }
);

// @route       PUT api/orders/id
// @desc        Update order
// @access      Private
router.put('/:id', auth, async (req, res) => {
  const { additionalID, sender, receiver, truck, trailer, qnt, bruto, description, declarations, clientID, orderID, status, date } = req.body;

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
  if (status) newOrderInformation.status = status;
  if (additionalID) newOrderInformation.additionalID = additionalID;
  if (date) newOrderInformation.date = date;

  try {
    let order = await Order.findById(req.params.id);

    if (!order) res.status(404).json({ msg: 'Order not found' });

    let orderWithID = await Order.findOne({ orderID });
    let orderWithAdditionalID = await Order.findOne({ additionalID });

    if (orderWithID && orderWithID._id.toString() !== order._id.toString()) {
      return res.status(400).json({ msg: 'Order with this ID already exists' });
    }
    if (orderWithAdditionalID && orderWithAdditionalID._id.toString() !== order._id.toString() && additionalID !== '') {
      return res.status(400).json({ msg: 'Order with this additional ID already exists' });
    }


    // Check if user authorized
    if (order.user.toString() !== req.user.id) {
      if (req.user.type !== 'admin') {
        return res.status(401).json({ msg: 'not authorized' });
      }
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

// @route       DELETE api/orders/id
// @desc        Delete order
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check if user is authorized to delete order
    if (ObjectID(order.user).toString() !== req.user.id) {
      if (req.user.type !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' })
      }
    }

    // DELETING ORDER FROM LOADING IT WAS INCLUDED IN
    // Update orders status back from 'loading' to 'in'
    let loading = await Loading.findById(order.loadingID);
    if (loading) {
      const newInfo = { orders: loading.orders.filter(item => item !== order._id.toString()), totalQnt: loading.totalQnt - order.qnt, totalBruto: loading.totalBruto - order.bruto };
      await Loading.findByIdAndUpdate(loading._id,
        { $set: newInfo },
        { new: true }
      )
    }
    ;

    // DELETING ORDER
    await Order.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Order deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error deleting order ' });
  }
});

// Email settings

// const sendMail = (to, subject, text) => {
//   const mailOptions = {
//     from: 'info@logway1.lt',
//     to,
//     subject,
//     text
//   }

//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('Email sent');
//     }
//   })
// }



module.exports = router;