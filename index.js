const express = require('express');
const mongoose = require('mongoose');
const verifyToken = require('./utils/verifyToken');
require('dotenv/config');

const app = express();
const port = process.env.PORT || 3000;

//DB Connection and Express Server
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => app.listen(port, () => console.log('Listening on port:', port)))
    .catch(e => console.log(e));

//Middleware
app.use(express.json());

//Routes
const userRoutes = require('./routes/auth');
app.use('/api/users', userRoutes);

//Test Route
app.get('/protected', verifyToken, (req, res) => {
    res.send('Protected Route');
})


