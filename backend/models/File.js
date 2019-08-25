const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
  type: {
    type: String
  },
  name: {
    type: String
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  path: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('file', FileSchema);