const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const fs = require('fs');

const Order = require('../models/Order');
const File = require('../models/File');

// FTP settings
const ftp = require('../config/ftp');
const Client = require('ftp');
const options = {
  host: 'logway1.lt',
  port: 21,
  user: ftp.username,
  password: ftp.password
};

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

router.get('/download/:id', async (req, res) => {
  const file = await File.findById(req.params.id);
  try {
    const { order, type, name } = file;
    const path = `ftp://${ftp.username}:${ftp.password}@logway1.lt/files/${order}/${type}/${name}`;
    res.send(path);

    // const path = `/files/${order}/${type}/${name}`;
    // const c = new Client();
    // c.on('ready', function () {
    //   c.get(path, (err, stream) => {
    //     if (err) throw err;
    //     stream.once('close', function () { c.end(); });
    //     stream.pipe(res);
    //   });
    // });
    // c.connect(options);
  }
  catch (err) {
    res.status(500).json({ msg: 'Server error downloading files' });
  }
})

// @route       POST api/files
// @desc        Add new client
// @access      Private
router.post('/:id', auth, async (req, res, next) => {
  let photos = [];
  let documents = [];
  let errors = [];

  const setType = ext => {
    const photosTypes = ['jpeg', 'gif', 'jpg', 'bmp', 'png']
    if (photosTypes.indexOf(ext) >= 0) {
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

    const path = `/files/${folder}/${type}/${saveAs}`;

    const c = new Client();
    c.on('ready', () => {
      c.mkdir(`/files/${folder}/${type}/`, true, err => {
        if (err) console.log(err);
      })
      c.put(file.tempFilePath, path, err => {
        if (err) console.log(err);
        c.end();
      })
    })
    c.connect(options);

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

  try {
    if (errors.length > 0) {
      return res.status(500).send(errors);
    } else if (req.files.files.length) {
      (async () => {
        for (const file of req.files.files) {
          await uploadFile(file);
        }
        res.json({ photos, documents });
      })();
    } else {
      (async () => {
        await uploadFile(req.files.files);
        res.json({ photos, documents });
      })();
    }
  } catch (err) {
    res.status(500).json({ msg: 'Server error uploading A file' })
  }
});

// @route       DELETE api/files
// @desc        Delete client
// @access      Private
router.delete('/:id', auth, async (req, res) => {

  const deleteFile = (file, order) => {
    const name = file.name;
    const folder = order._id;
    const type = file.type;
    const path = `/files/${folder}/${type}/${name}`;

    const c = new Client();
    c.on('ready', () => {
      c.delete(path, err => {
        if (err) console.log(err);
        c.end();
      })
    })
    c.connect(options);
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