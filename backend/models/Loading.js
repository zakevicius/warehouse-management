const mongoose = require('mongoose');

const LoadingSchema = mongoose.Schema({
    loadingID: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients'
    },
    truck: {
        type: String,
        required: true
    },
    trailer: {
        type: String
    },
    orders: {
        type: Array
    },
    status: {
        type: String // waiting, loading, loaded
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('loading', LoadingSchema);