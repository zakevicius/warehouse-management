const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  },
  clients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'clients'
  }
});

module.exports = mongoose.model('user', UserSchema);