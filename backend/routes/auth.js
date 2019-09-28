const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error (get logged in user)' });
  }
});

// @route     POST api/auth
// @desc      Authenticate user and get token
// @access    Public
router.post('/', [
  check('email', 'Please insert valid email').isEmail(),
  check('password', 'Password is required').exists()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        console.log('user')
        return res.status(400).json({ msg: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log('email')
        return res.status(400).json({ msg: 'Invalid email or password' });
      }

      const payload = {
        user: {
          id: user.id,
          type: user.type
        }
      };

      jwt.sign(
        payload, config.get('jwtSecret'),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, id: user.id, type: user.type });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error - get JSON token');
    }
  }
);

module.exports = router;  