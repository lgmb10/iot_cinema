const Sensor = require("../models/sensor")

exports.initMqtt = (client) => {
    console.log('Connecting to MQTT broker...')

    client.on('connect', function () {
        client.subscribe('room/1/#', function (err) {
            if (!err) {
                console.log('Subscribed to "room 1" channel successfully!')
            } else {
                console.error('Error subscribing to "room 1" channel:', err)
            }
        })

        client.subscribe('room/2/#', function (err) {
            if (!err) {
                console.log('Subscribed to "room 2" channel successfully!')
            } else {
                console.error('Error subscribing to "room 1" channel:', err)
            }
        })

        client.subscribe('room/3/#', function (err) {
            if (!err) {
                console.log('Subscribed to "room 3" channel successfully!')
            } else {
                console.error('Error subscribing to "room 1" channel:', err)
            }
        })
    })

    client.on('message', function (topic, message) {
        console.log('Received message on topic "' + topic + '": ' + message.toString())
        console.log({ room: topic.split('/')[1], sensorType: topic.split('/')[2], sensorValue: message.toString() })
        //Sensor.create({room: topic.split('/')[1], sensorType: topic.split('/')[2], sensorValue: message.toString()})

    })
}