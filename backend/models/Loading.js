const mongoose = require("mongoose");

const LoadingSchema = mongoose.Schema({
  loadingID: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clients"
  },
  truck: {
    type: String,
    required: true
  },
  trailer: {
    type: String,
    default: "-"
  },
  orders: {
    type: Array
  },
  totalQnt: {
    type: Number
  },
  totalBruto: {
    type: Number
  },
  finalTotalQnt: {
    type: Number
  },
  finalTotalBruto: {
    type: Number
  },
  status: {
    type: String // waiting, loading, loaded
  },
  commentsData: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  },
  driverPhone: {
    type: String,
    default: ""
  },
  commentsOnLoading: {
    type: String,
    default: ""
  },
  documents: {
    type: Array,
    ref: "files"
  },
  photos: {
    type: Array,
    ref: "files"
  }
});

module.exports = mongoose.model("loading", LoadingSchema);
