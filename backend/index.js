const cors = require('cors');
const express = require('express');
const app = express();

const data = require('./fakeData.js');

app.use(cors());
app.options('*', cors());

const [orders, clients] = data;

app.get('/orders', (req, res) => {
    res.send(orders);
});

app.get('/clients', (req, res) => {
    res.send(clients);
});

app.get(`/order/:id`, (req, res) => {
    res.send(orders[req.params.id]);
});

app.get(`/client/:id`, (req, res) => {
    res.send(clients[req.params.id]);
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
})