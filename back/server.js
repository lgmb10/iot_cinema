const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mqtt = require('mqtt')
const { initMqtt } = require('./utils/mqttHelper');
require('dotenv').config();
const connectDatabase = require('./config/database');

const sensor = require('./routes/sensor');
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

const mqttOptions = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: 'mqtts',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
}

connectDatabase();

let client = mqtt.connect(mqttOptions)
initMqtt(client);

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