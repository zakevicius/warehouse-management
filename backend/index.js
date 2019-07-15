const cors = require('cors');
const express = require('express');
const app = express();

const data = require('./fakeData.js');

app.use(cors());
app.options('*', cors());

const [orders, clients] = data;

// ORDERS

app.get('/orders', (req, res) => {
    res.send(orders);
});

app.get(`/orders/:id`, (req, res) => {
    res.send(orders[req.params.id]);
});

app.post('/orders', (req, res) => {
    res.send('Order Created');
});

// CLIENTS

app.get('/clients', (req, res) => {
    res.send(clients);
});

app.get(`/clients/:id`, (req, res) => {
    res.send(clients[req.params.id]);
});

app.post('/clients', (req, res) => {
    res.send('Client Created');
});

// LISTEN

app.listen(8000, () => {
    console.log('Listening on port 8000');
})