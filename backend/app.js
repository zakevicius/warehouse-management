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
    const clientData = { data: clients[req.params.id], orders: filterOrdersByClientId(req.params.id, orders) };
    res.send(clientData);
});

app.post('/clients', (req, res) => {
    res.send('Client Created');
});

// LISTEN

app.listen(process.env.PORT, () => {
    console.log('Listening');
})


// FUNCTIONS

const filterOrdersByClientId = (id, orders) => {
    return orders.filter(order => order.clientId === parseInt(id));
}