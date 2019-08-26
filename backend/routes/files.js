const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const fs = require('fs');

const Order = require('../models/Order');
const File = require('../models/File');

// @route       GET api/files
// @desc        Get all users clients
// @access      Private
router.get('/:id', auth, async (req, res) => {
  try {
    const files = await File.find({ order: req.params.id });
    res.json(files);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error fetching files' });
  }
});

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

// @route       POST api/files
// @desc        Add new client
// @access      Private
router.post('/:id', auth, async (req, res, next) => {
  console.log(req.params, req.user);

  let photos = [];
  let documents = [];
  let errors = [];

  const setType = ext => {
    const photosTypes = ['jpeg', 'gif', 'jpg', 'bmp', 'png']
    if (photosTypes.indexOf(ext) > 0) {
      console.log(photos.indexOf(ext))
      return 'photo';
    } else {
      return 'document';
    }
  };

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
        console.error(err);
        errors.push(err);
      }
    });

    try {
      // Creating new File
      const file = new File({
        type,
        name: saveAs,
        path,
        order: req.params.id,
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

      let newOrderInformation = {};
      if (type === 'photo') {
        newOrderInformation.photos = [...order.photos, file];
        photos.push(file);
      } else {
        newOrderInformation.documents = [...order.documents, file];
        documents.push(file);
      }

      // Updating order
      order = await Order.findByIdAndUpdate(req.params.id,
        { $set: newOrderInformation },
        { new: true }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error creating new file' });
    }
  }

  if (errors.length > 0) {
    return res.status(500).send(errors);
  } else if (req.files.files.length) {
    (async () => {
      await req.files.files.forEach(async file => {
        await uploadFile(file);
      });
      console.log(photos, documents)
      res.json({ photos, documents });
    })();
  } else {
    (async () => {
      await uploadFile(req.files.files);
      console.log(photos, documents)
      res.json({ photos, documents });
    })();
  }
});

// @route       DELETE api/files
// @desc        Delete client
// @access      Private
router.delete('/:id', auth, async (req, res) => {

  const deleteFile = (file, order) => {
    const name = file.name;
    const folder = order._id;
    const path = `C:/files/${folder}`;

    if (fs.existsSync(path)) {
      fs.unlink(`${path}/${name}`, err => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      console.error('Doeas not exists')
    }
  };

  try {
    // Find File to delete
    const file = await File.findById(req.params.id);

    // Check if user is authorized to delete client

    if (file.user.toString() !== req.user.id) {
      if (req.user.type !== 'admin') {
        res.status(401).json({ msg: 'Not authorized ' });
        return;
      } else {
        await File.findByIdAndRemove(req.params.id);
      }
    } else {
      await File.findByIdAndRemove(req.params.id);
    }

    // Update Order file list
    const order = await Order.findById(file.order);

    let newOrderInformation = {};
    newOrderInformation.photos = order.photos.filter(photo => photo._id !== req.params.id);
    newOrderInformation.documents = order.documents.filter(document => document._id !== req.params.id);

    // Updating order
    await Order.findByIdAndUpdate(req.params.orderid,
      { $set: newOrderInformation },
      { new: true }
    );

    // Deleting file from system
    deleteFile(file, order);

    res.json({ id: req.params.id, msg: 'File succesfully removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error deleting file' });
  }
});

module.exports = router; 