const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const fs = require("fs");

const Order = require("../models/Order");
const Loading = require("../models/Loading");
const File = require("../models/File");

// FTP settings
const ftp = require("../config/ftp");
const Client = require("ftp");
const options = {
  host: "logway1.lt",
  port: 21,
  user: ftp.username,
  password: ftp.password
};

// @route       GET api/files
// @desc        Get all users clients
// @access      Private
router.get("/:id", auth, async (req, res) => {
  try {
    let filesOnServer = [];
    let filesToReturn = [];
    const c = new Client();
    const folder = req.params.id;
    const paths = [`/files/${folder}/photo`, `/files/${folder}/document`];

    c.on("ready", async () => {
      for (const path of paths) {
        c.list(path, (err, list) => {
          if (err) console.log(err);
          for (const file of list) {
            filesOnServer.push(file.name);
          }
        });
      }

      c.end();

      c.on("close", async () => {
        const files = await File.find({ order: req.params.id });

        for (const file of files) {
          if (filesOnServer.indexOf(file.name) >= 0) {
            filesToReturn.push(file);
          } else {
            console.log(`${file.name} does not exists on server`);
          }
        }
        res.json(filesToReturn);
      });
    });
    c.connect(options);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error fetching files" });
  }
});

router.get("/fileData/:id", async (req, res) => {
  const file = await File.findById(req.params.id);

  try {
    const { order, type, name } = file;
    const path = `/files/${order}/${type}/${name}`;

    const c = new Client();

    let chunks = [];
    c.on("ready", function () {
      c.get(path, (err, stream) => {
        if (err) throw err;

        stream.once("close", function () {
          c.end();
        });

        stream.on("data", chunk => {
          chunks.push(chunk);
        });

        stream.on("end", () => {
          const finalBuffer = Buffer.concat(chunks);
          const fileData = finalBuffer.toString("base64");
          res.send({ _id: req.params.id, base64Data: fileData });
        });
      });
    });
    c.connect(options);
  } catch (err) {
    res.status(500).json({ msg: "Server error downloading files" });
  }
});

router.get("/download/:id", async (req, res) => {
  const file = await File.findById(req.params.id);
  try {
    const { order, type, name } = file;
    const fullPath = `ftp://${ftp.username}:${ftp.password}@logway1.lt/files/${order}/${type}/${name}`;

    const path = `/files/${order}/${type}/${name}`;
    const c = new Client();

    let chunks = [];
    c.on("ready", function () {
      c.get(path, (err, stream) => {
        if (err) throw err;

        stream.once("close", function () {
          c.end();
        });

        stream.on("data", chunk => {
          chunks.push(chunk);
        });

        stream.on("end", () => {
          const finalBuffer = Buffer.concat(chunks);
          const imageData = finalBuffer.toString("base64");
          res.send({ fullPath, imageData });
        });
      });
    });
    c.connect(options);
  } catch (err) {
    res.status(500).json({ msg: "Server error downloading files" });
  }
});

// @route       POST api/files
// @desc        Add new client
// @access      Private
router.post("/:data/:id", auth, async (req, res, next) => {
  let data;

  switch (req.params.data) {
    case "order":
      data = await Order.findById(req.params.id);
      break;
    case "loading":
      data = await Loading.findById(req.params.id);
      break;
    default:
      break;
  }

  // Check if user authorized
  if (data.user.toString() !== req.user.id) {
    if (req.user.type !== "admin" && req.user.type !== "super") {
      return res.status(404).json({ msg: "not authorized" });
    }
  }

  let photos = [];
  let documents = [];
  let errors = [];

  const setType = ext => {
    const photosTypes = [
      "jpeg",
      "gif",
      "jpg",
      "bmp",
      "png",
      "JPEG",
      "GIF",
      "JPG",
      "BMP",
      "PNG"
    ];
    if (photosTypes.indexOf(ext) >= 0) {
      return "photo";
    } else {
      return "document";
    }
  };

  const uploadFile = async file => {
    const name = file.name;
    const type = setType(name.split(".").pop());
    const saveAs = `${Date.now()}___${name}`;
    const folder = req.params.id;

    const path = `/files/${folder}/${type}/${saveAs}`;

    const c = new Client();
    c.on("ready", () => {
      c.mkdir(`/files/${folder}/${type}/`, true, err => {
        if (err) console.log(err);
      });
      c.put(file.tempFilePath, path, err => {
        if (err) console.log(err);
        c.end();
      });
    });
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

      let newOrderInformation = {};
      if (type === "photo") {
        newOrderInformation.photos = [...photos, file];
        photos.push(file);
      } else {
        newOrderInformation.documents = [...documents, file];
        documents.push(file);
      }

      // Updating data info
      let updatedData;

      switch (req.params.data) {
        case "order":
          updatedData = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: newOrderInformation },
            { new: true }
          );
          break;
        case "loading":
          updatedData = await Loading.findByIdAndUpdate(
            req.params.id,
            { $set: newOrderInformation },
            { new: true }
          );
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error creating new file" });
    }
  };

  try {
    if (errors.length > 0) {
      return res.status(500).send(errors);
    } else if (req.files.files.length > 1) {
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
    res.status(500).json({ msg: "Server error uploading A file" });
  }
});

// @route       DELETE api/files
// @desc        Delete client
// @access      Private
router.delete("/:data/:id", auth, async (req, res) => {
  const deleteFile = (file, dataFolder) => {
    const name = file.name;
    const folder = dataFolder._id;
    const type = file.type;
    const path = `/files/${folder}/${type}/${name}`;

    const c = new Client();
    c.on("ready", () => {
      c.delete(path, err => {
        if (err) console.log(err);
        c.end();
      });
    });
    c.connect(options);
  };

  try {
    // Find File to delete
    const file = await File.findById(req.params.id);

    // Check if user is authorized to delete file

    if (file.user.toString() !== req.user.id) {
      if (req.user.type !== "admin") {
        res.status(401).json({ msg: "Not authorized " });
        return;
      } else {
        await File.findByIdAndRemove(req.params.id);
      }
    } else {
      await File.findByIdAndRemove(req.params.id);
    }

    // Updating data info
    let updatedData;

    switch (req.params.data) {
      case "order":
        updatedData = await Order.findById(file.order);
        break;
      case "loading":
        updatedData = await Loading.findById(file.order);
        break;
      default:
        break;
    }

    let newOrderInformation = {};
    newOrderInformation.photos = updatedData.photos.filter(
      photo => photo._id.toString() !== req.params.id
    );
    newOrderInformation.documents = updatedData.documents.filter(
      document => document._id.toString() !== req.params.id
    );

    // Updating data
    switch (req.params.data) {
      case "order":
        await Order.findByIdAndUpdate(
          updatedData._id,
          { $set: newOrderInformation },
          { new: true }
        );
        break;
      case "loading":
        await Loading.findByIdAndUpdate(
          updatedData._id,
          { $set: newOrderInformation },
          { new: true }
        );
      default:
        break;
    }

    // Deleting file from system
    deleteFile(file, updatedData);

    res.json({ id: req.params.id, msg: "File succesfully removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error deleting file" });
  }
});

module.exports = router;
