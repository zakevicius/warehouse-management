const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const fs = require('fs');

const User = require('../models/User');
const Client = require('../models/Client');
const Order = require('../models/Order');
const File = require('../models/File');

// @route       GET api/files
// @desc        Get all users clients
// @access      Private
// router.get('/', auth, async (req, res) => {
//   try {
//     let clients;
//     if (req.user.type === "admin") {
//       clients = await Client.find();
//     } else {
//       clients = await Client.find({ user: req.user.id });
//     }
//     res.json(clients);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server error fetching clients' });
//   }
// });

// @route       GET api/clients/:id
// @desc        Get client by id
// @access      Private
// router.get('/:id', auth, async (req, res) => {
//   try {
//     let client = await Client.findById(req.params.id, (err, data) => data);
//     let orders = await Order.find({ clientID: req.params.id });
//     res.json({ data: client, orders });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server error fetching client' });
//   }
// });

// @route       POST api/upload
// @desc        Add new client
// @access      Private
router.post('/:id', auth, async (req, res, next) => {
  console.log(req.params, req.user);

  const setType = ext => {
    photos = ['jpeg', 'gif', ' jpg', 'bmp', 'png']
    if (photos.indexOf(ext) > 0) {
      return 'photo';
    } else {
      return 'document';
    }
  };

  let errors = [];

  const uploadFile = async file => {
    const name = file.name;
    const type = setType(name.split('.').pop());
    const saveAs = `${Date.now()}___${name}`;
    const folder = req.params.id

    if (!fs.existsSync(`C:/files/${folder}`)) {
      fs.mkdirSync(`C:/files/${folder}`);
    }

    const path = `C:/files/${folder}/${saveAs}`;

    file.mv(path, (err) => {
      if (err) {
        errors.push(err);
      }
    });

    try {
      // Creating new File
      const file = new File({
        type,
        name,
        path,
        orderID: req.params.id,
        user: req.user.id
      });

      await file.save();

      let order = await Order.findById(req.params.id);

      // Check if user authorized
      if (order.user.toString() !== req.user.id) {
        if (req.user.type !== 'admin') {
          return res.status(401).json({ msg: 'not authorized' });
        }
      }

      const newOrderInformation = {};
      newOrderInformation.photos = file;

      // Updating order
      order = await Order.findByIdAndUpdate(req.params.id,
        { $set: newOrderInformation },
        { new: true }
      );
      res.json(file);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error creating new file' });
    }
  }

  if (errors.length > 0) {
    return res.status(500).send(errors);
  } else if (req.files.files.length) {
    req.files.files.forEach(file => {
      uploadFile(file);
    });
  } else {
    uploadFile(req.files.files);
  }
});

// @route       PUT api/clients
// @desc        Update client
// @access      Private
// router.put('/:id', auth, async (req, res) => {
//   const { name, orderLetter, email, phone } = req.body;

//   // Build Client object, which contains new information
//   const newClientInformation = {};
//   if (name) newClientInformation.name = name;
//   if (orderLetter) newClientInformation.orderLetter = orderLetter;
//   if (email) newClientInformation.email = email;
//   if (phone) newClientInformation.phone = phone;

//   // Find Client to update
//   try {
//     let client = await Client.findById(req.params.id);

//     if (!client) return res.status(404).json({ msg: 'Client not found' });

//     // Make sure user authorized to update client
//     const user = await User.findById(req.user.id);

//     // if(!user) {
//     //   res.status(500).json({ msg: 'Server error. User not found'});
//     // }

//     if (client.user.toString() !== req.user.id) {
//       if (req.user.type !== 'admin') {
//         res.status(401).json({ msg: 'Not authorized ' });
//       }
//     }

//     // Update client
//     client = await Client.findByIdAndUpdate(
//       req.params.id,
//       { $set: newClientInformation },
//       { new: true }
//     )

//     res.json(client);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server error updating client' });
//   }
// });

// @route       DELETE api/clients
// @desc        Delete client
// @access      Private
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     // Find Client to delete
//     const client = await Client.findById(req.params.id);

//     if (!client) {
//       res.status(404).json({ msg: 'Client not found' });
//     }

//     // Check if user is authorized to delete client
//     const user = await User.findById(req.user.id);

//     if (client.user.toString() !== req.user.id) {
//       if (req.user.type !== 'admin') {
//         res.status(401).json({ msg: 'Not authorized ' });
//       } else {
//         await Client.findByIdAndRemove(req.params.id);
//       }
//     } else {
//       await Client.findByIdAndRemove(req.params.id);
//     }

//     res.json({ msg: 'Client succesfully removed' });
//   } catch (err) {

//   }
// });

module.exports = router; 