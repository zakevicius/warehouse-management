const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  orderLetter: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: Array,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('client', ClientSchema);