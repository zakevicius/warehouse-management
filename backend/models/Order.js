const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  orderID: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  truck: {
    type: String,
    required: true
  },
  trailer: {
    type: String,
    default: '-'
  },
  qnt: {
    type: Number,
    required: true,
    min: 0
  },
  bruto: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  declarations: {
    type: Array,
    required: false,
    default: []
  },
  status: {
    type: String,  // waiting, in, loading, out
    required: true
  },
  loadingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'loadings'
  },
  documents: {
    type: Array,
  },
  photos: {
    type: Array,
  },
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients'
  },
});

module.exports = mongoose.model('order', OrderSchema);