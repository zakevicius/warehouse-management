const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Client = require('../models/Client');
const Order = require('../models/Order');
const Loading = require('../models/Loading')

// @route       GET api/loadings
// @desc        Get all users loadings
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        let loadings;
        if (req.user.type === "admin") {
            loadings = await Loading.find();
        } else {
            loadings = await Loading.find({ user: req.user.id });
        }
        res.json(loadings);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error fetching loadings' });
    }
});

// @route       GET api/loadings
// @desc        Get loading by id
// @access      Private
router.get('/:id', auth, async (req, res) => {
    try {
        let client = await Client.findById(req.params.id, (err, data) => data);
        let loading = await Loading.find({ _id: req.params.id });
        res.json({ data: client, loading });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error fetching loading' });
    }
});

// @route       POST api/loadings
// @desc        Add new loading
// @access      Private
router.post(
    '/',
    [
        auth,
        [
            check('truck', 'Truck number is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body)

        const { loadingID, truck, trailer, orders, status, clientID } = req.body;
        try {
            // Creating new Loading
            loading = new Loading({
                loadingID,
                truck,
                trailer,
                orders,
                status,
                clientID,
                user: req.user.id
            });

            await loading.save();
            res.json(loading);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server error creating new loading' });
        }
    }
);

// @route       PUT api/loadings/
// @desc        Update client
// @access      Private
router.put('/:id', auth, async (req, res) => {
    const { truck, trailer, orders, status } = req.body;

    // Build Loading object, which contains new information
    const newLoadingInformation = {}
    if (truck) newClientInformation.truck = truck;
    if (trailer) newClientInformation.trailer = trailer;
    if (orders) newClientInformation.orders = orders;
    if (status) newClientInformation.status = status;

    // Find Loading to update
    try {
        let loading = await Loading.findById(req.params.id);

        if (!loading) return res.status(404).json({ msg: 'Loading not found' });

        // Make sure user authorized to update loading
        const user = await User.findById(req.user.id);

        // if(!user) {
        //   res.status(500).json({ msg: 'Server error. User not found'});
        // }

        if (client.user.toString() !== req.user.id) {
            if (user.type !== 'admin') {
                return res.status(401).json({ msg: 'Not authorized ' });
            }
        }

        // Update loading
        loading = await Loading.findByIdAndUpdate(
            req.params.id,
            { $set: newLoadingInformation },
            { new: true }
        )

        res.json(loading);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error updating loading' });
    }
});

// @route       DELETE api/clients
// @desc        Delete client
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    try {
        // Find Loading to delete
        const loading = await Loading.findById(req.params.id);

        if (!loading) {
            return res.status(404).json({ msg: 'Loading not found' });
        }

        // Check if user is authorized to delete client
        const user = await User.findById(req.user.id);

        if (client.user.toString() !== req.user.id) {
            if (user.type !== 'admin') {
                return res.status(401).json({ msg: 'Not authorized ' });
            } else {
                await Loading.findByIdAndRemove(req.params.id);
            }
        } else {
            await Loading.findByIdAndRemove(req.params.id);
        }

        res.json({ msg: 'Client succesfully removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error deleting loading' });
    }
});

module.exports = router; 