const express = require('express');
const app = express();
var cors = require('cors');
var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname + '/.env') });

const sensor = require('./routes/sensor');
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(express.static(path.join(__dirname, '..')));
app.use(express.static(__dirname + '/dist'));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', sensor);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});