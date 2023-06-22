const Sensor = require("../models/sensor")
const sensorRange = require("../models/sensorRange")

exports.initMqtt = (client) => {
    console.log('Connecting to MQTT broker...')

    client.on('connect', function () {
        client.subscribe('room/#', function (err) {
            if (!err) {
                console.log('Subscribed to "room" channel successfully!')
            } else {
                console.error('Error subscribing to "room" channel:', err)
            }
        })
    })

    client.on('message', async function (topic, message) {
        console.log('Received message on topic "' + topic + '": ' + message.toString())
        const range = await sensorRange.findOne({ room: parseInt(topic.split('/')[1]), sensorType: topic.split('/')[2] })
        if (parseInt(message.toString()) < range.sensorValueMin) {
            client.publish(`range/${topic.split('/')[1]}/${topic.split('/')[2]}/min`, `${range.sensorValueMin}/${range.sensorValueMax}`)
        } else if (parseInt(message.toString()) > range.sensorValueMax) {
            client.publish(`range/${topic.split('/')[1]}/${topic.split('/')[2]}/max`, `${range.sensorValueMin}/${range.sensorValueMax}`)
        } else {
            Sensor.create({room: topic.split('/')[1], sensorType: topic.split('/')[2], sensorValue: message.toString()})
        }
    })
}