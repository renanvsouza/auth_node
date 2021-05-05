const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(port, () => console.log('Listening on port:', port))).catch(e => console.log(e));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home');
})


