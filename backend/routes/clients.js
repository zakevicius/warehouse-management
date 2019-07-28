const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Client = require('../models/Client');

// @route       GET api/clients
// @desc        Get all users clients
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    let clients;
    if (req.user.type === "admin") {
      clients = await Client.find();
    } else {
      clients = await Client.find({ user: req.user.id });
    }
    res.json(clients);
  } catch (err) {
    console.error(err.message);
  }
});

// @route       POST api/clients
// @desc        Add new client
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('firstName', 'First name is required').not().isEmpty(),
      check('lastName', 'Last name is required').not().isEmpty(),
      check('email', 'Email is required').isEmail(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phone } = req.body;

    //Checking if client exists 
    try {
      let client = await Client.findOne({ email });

      if (client && client.user.toString() === req.user.id) {
        res.status(400).json({ msg: 'Client with this email already exists' });
      } else {

        // Creating new Client
        client = new Client({
          firstName,
          lastName,
          email,
          phone,
          user: req.user.id
        });

        await client.save();
        res.json(client);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error creating new client' });
    }
  }
);

// @route       PUT api/clients
// @desc        Update client
// @access      Private
router.put('/:id', auth, async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  // Build Client object, which contains new information
  const newClientInformation = {}
  if (firstName) newClientInformation.firstName = firstName;
  if (lastName) newClientInformation.lastName = lastName;
  if (email) newClientInformation.email = email;
  if (phone) newClientInformation.phone = phone;

  // Find Client to update
  try {
    let client = await Client.findById(req.params.id);

    if (!client) return res.status(404).json({ msg: 'Client not found' });

    // Make sure user authorized to update client
    const user = await User.findById(req.user.id);

    // if(!user) {
    //   res.status(500).json({ msg: 'Server error. User not found'});
    // }

    if (client.user.toString() !== req.user.id) {
      if (user.type !== 'admin') {
        res.status(401).json({ msg: 'Not authorized ' });
      }
    }

    // Update client
    client = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: newClientInformation },
      { new: true }
    )

    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error updating client' });
  }
});

// @route       DELETE api/clients
// @desc        Delete client
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find Client to delete
    const client = await Client.findById(req.params.id);

    if (!client) {
      res.status(404).json({ msg: 'Client not found' });
    }

    // Check if user is authorized to delete client
    const user = await User.findById(req.user.id);

    if (client.user.toString() !== req.user.id) {
      if (user.type !== 'admin') {
        res.status(401).json({ msg: 'Not authorized ' });
      } else {
        await Client.findByIdAndRemove(req.params.id);
      }
    } else {
      await Client.findByIdAndRemove(req.params.id);
    }

    res.json({ msg: 'Client succesfully removed' });
  } catch (err) {

  }
});

module.exports = router; 