const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const sendMail = require('../config/email');

const User = require('../models/User');

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post('/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please enter a password with at least 8 characters').isLength(
      {
        min: 8
      })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, type, clients } = req.body;
    console.log(clients)

    // Checking if user exists
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Creating new user
      user = new User({
        name,
        email,
        password,
        type,
        clients
      });

      // Hashing password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Saving user to DB
      await user.save();

      // Creating JSON Web Token for user
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token })
        }
      );
      sendMail(user.email, `Account was created`, `Your account was created at app.logway1.lt. Please contact us for your login information`);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;