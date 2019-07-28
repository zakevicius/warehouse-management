const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to Logway API' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/orders', require('./routes/orders'));

const HEROKU_PORT = process.env.PORT;
const LOCAL_PORT = '8000';
const PORT = LOCAL_PORT;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));