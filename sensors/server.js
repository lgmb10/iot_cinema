var mqtt = require('mqtt')
const express = require('express')
require('dotenv').config()

var options = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: 'mqtts',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
}

let client = mqtt.connect(options)

client.on('connect', function () {
    console.log('Connected')
})