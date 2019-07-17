const cors = require('cors');
const express = require('express');
const app = express();

const data = require('./fakeData.js');

app.use(cors());
app.options('*', cors());

const [orders, clients, loadings] = data;

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

//LOADINGS 

app.get('/loadings', (req, res) => {
    res.send(loadings);
});

app.get(`/loadings/:id`, (req, res) => {
    res.send(loadings[req.params.id]);
});

app.post('/loadings', (req, res) => {
    res.send('loading Created');
});


// LISTEN

const HEROKU_PORT = process.env.PORT;
const LOCAL_PORT = '8000';

app.listen(LOCAL_PORT, () => {
    console.log('Listening');
})


// FUNCTIONS

const filterOrdersByClientId = (id, orders) => {
    return orders.filter(order => order.clientId === parseInt(id));
}