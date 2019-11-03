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
  additionalID: {
    type: String,
    required: false
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
  finalQnt: {
    type: Number,
    required: false,
    min: 0
  },
  finalBruto: {
    type: Number,
    required: false,
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
    ref: 'files'
  },
  photos: {
    type: Array,
    ref: 'files'
  },
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients'
  },
  loadingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'loadings',
    default: null
  }
});

module.exports = mongoose.model('order', OrderSchema);