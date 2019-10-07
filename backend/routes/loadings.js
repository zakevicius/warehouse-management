const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const sendMail = require('../config/email');

const User = require('../models/User');
const Client = require('../models/Client');
const Order = require('../models/Order');
const Loading = require('../models/Loading')

const appURL = 'http://app.logway1.lt'

// @route       GET api/loadings
// @desc        Get all users loadings
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        let loadings;
        let loadingsArr = [];
        if (req.user.type === "admin") {
            loadings = await Loading.find({ user: { $ne: '5d8fc59f7f3a681e142dd41a' } });
        } else {
            for (let i = 0; i < req.user.clients.length; i++) {
                loadings = await Loading.find({ clientID: req.user.clients[i] });
                loadingsArr.push(loadings);
            }
            loadings = loadingsArr[0];
            if (loadingsArr.length > 0) {
                for (let i = 1; i < loadingsArr.length; i++) {
                    loadings = loadings.concat(loadingsArr[i]);
                }
            }
        }
        res.json(loadings);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error fetching loadings' });
    }
});

// @route       GET api/loadings/id
// @desc        Get loading by id
// @access      Private
router.get('/:id', auth, async (req, res) => {
    try {
        let loading = await Loading.findById(req.params.id);

        let orders = await Promise.all(loading.orders.map(async id => await Order.findById(id)));

        let client = await Client.findById(loading.clientID);

        res.json({ data: loading, client: { name: client.name, email: client.email }, orders });
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
            return res.status(400).json({ msg: errors.array()[0].msg });
        }

        const { loadingID, truck, trailer, orders, status, clientID, totalQnt, totalBruto, client } = req.body;
        try {
            // Creating new Loading
            loading = new Loading({
                loadingID,
                truck,
                trailer,
                orders,
                status,
                clientID,
                totalQnt,
                totalBruto,
                user: req.user.id
            });

            await loading.save();

            // Udating order status
            try {
                let orderStatus;
                await (async () => {
                    for (const id of orders) {
                        orderToUpdate = await Order.findOne({ _id: id });
                        if (orderToUpdate.status === "waiting") {
                            orderStatus = "waiting"
                        } else {
                            orderStatus = status;
                        }
                        await Order.findByIdAndUpdate(
                            id,
                            { $set: { status: orderStatus, loadingID: loading._id } },
                            { new: true }
                        )
                    }
                })();
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ msg: 'Server error updating order status' });
            }

            const logwayEmails = ['info@logway1.lt', 'tadas@logway1.lt', 'paulius@logway1.lt', 'ilona@logway1.lt', 'maija@logway1.lt'];
            logwayEmails.forEach(email => {
                sendMail(email, `${client} created new loading`, `New loading ID:${loadingID} was created by ${client} \n ${appURL}/loadings/${loading._id}`);
            });

            res.json(loading);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server error creating new loading' });
        }
    }
);

// @route       PUT api/loadings/id
// @desc        Update client
// @access      Private
router.put('/:id', auth, async (req, res) => {
    let { truck, trailer, orders, status, totalQnt, totalBruto, commentsData } = req.body;

    // Build Loading object, which contains new information
    const newLoadingInformation = {};
    if (truck) newLoadingInformation.truck = truck;
    if (trailer) newLoadingInformation.trailer = trailer;
    if (orders) newLoadingInformation.orders = orders;
    if (status) newLoadingInformation.status = status;
    if (totalQnt) newLoadingInformation.totalQnt = totalQnt;
    if (totalBruto) newLoadingInformation.totalBruto = totalBruto;
    if (commentsData) newLoadingInformation.commentsData = commentsData;

    // Find Loading to update
    try {
        let loading = await Loading.findOne({ _id: req.params.id });

        if (!loading) return res.status(404).json({ msg: 'Loading not found' });

        // Make sure user authorized to update loading
        const user = await User.findById(req.user.id);

        // if(!user) {
        //   res.status(500).json({ msg: 'Server error. User not found'});
        // }

        if (loading.user.toString() !== req.user.id) {
            if (user.type !== 'admin') {
                if (user.clients[0].toString() !== loading.clientID.toString()) {
                    return res.status(401).json({ msg: 'Not authorized ' });
                }
            }
        }

        // Update loading
        loading = await Loading.findOneAndUpdate(
            { _id: req.params.id },
            { $set: newLoadingInformation },
            { new: true }
        );

        // Udating order status
        if (orders) {
            let ordersToUpdate = await Order.find({ loadingID: loading._id });

            await (async () => {
                for (const item of ordersToUpdate) {
                    let orderStatus;
                    if (item.status === "waiting") {
                        orderStatus = "waiting"
                    } else {
                        orderStatus = "in"
                    }
                    await Order.findByIdAndUpdate(
                        item._id,
                        { $set: { status: orderStatus, loadingID: null } },
                        { new: true }
                    )
                }
            })();
            // await Order.updateMany(
            //     { loadingID: loading._id },
            //     { $set: { status: status === 'waiting' ? 'waiting' : 'in', loadingID: null } },
            //     { multi: true }
            // );
        }

        if (orders) {
            await (async () => {
                for (const id of orders) {
                    orderToUpdate = await Order.findOne({ _id: id });
                    if (orderToUpdate.status === "waiting") {
                        newStatus = "waiting";
                    } else {
                        newStatus = status === 'loaded' ? 'out' : status;
                    }
                    await Order.findByIdAndUpdate(
                        id,
                        { $set: { status: newStatus, loadingID: loading._id } },
                        { new: true }
                    )
                }
            })();

            // orders.forEach(async id => {
            //     const newInfo = { status: status, loadingID: loading._id };
            //     order = await Order.findByIdAndUpdate(id,
            //         { $set: newInfo },
            //         { new: true }
            //     );
            // });
        }

        res.json(loading);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error updating order status' });
    }
});

// @route       DELETE api/loadings/id
// @desc        Delete loading
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    try {
        // Find Loading to delete
        const loading = await Loading.findById(req.params.id);

        if (!loading) {
            return res.status(404).json({ msg: 'Loading not found' });
        }

        // Check if user is authorized to delete loading
        const user = await User.findById(req.user.id);

        if (loading.user.toString() !== req.user.id) {
            if (user.type !== 'admin') {
                return res.status(401).json({ msg: 'Not authorized ' });
            }
        }

        // Update orders status back from 'loading'
        try {
            let orderStatus;
            await (async () => {
                for (const id of loading.orders) {
                    orderToUpdate = await Order.findOne({ _id: id });
                    if (orderToUpdate.status === "waiting") {
                        orderStatus = "waiting"
                    } else {
                        orderStatus = "in";
                    }
                    await Order.findByIdAndUpdate(
                        id,
                        { $set: { status: orderStatus, loadingID: null } },
                        { new: true }
                    )

                }
            })();

            // loading.orders.forEach(async id => {
            //     const newInfo = { status: 'in', loadingID: null };
            //     order = await Order.findByIdAndUpdate(id,
            //         { $set: newInfo },
            //         { new: true }
            //     );
            // })
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server error updating order status' });
        }

        // Remove loading
        await Loading.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Loading succesfully removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error deleting loading' });
    }
});

// const sendMail = (to, subject, text) => {
//     const mailOptions = {
//         from: 'm.zakevicius@gmail.com',
//         to,
//         subject,
//         text
//     }

//     transporter.sendMail(mailOptions, (err, info) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log('Email sent');
//         }
//     })
// }



module.exports = router; 