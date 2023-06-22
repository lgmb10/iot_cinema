var mqtt = require('mqtt')
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
    client.subscribe('range/#', function (err) {
        if (!err) {
            console.log('Subscribed to "range" channel successfully!')
        } else {
            console.error('Error subscribing to "range" channel:', err)
        }
    })
})

client.on('message', async function (topic, message) {
    console.log('Received message on topic "' + topic + '": ' + message.toString())
    const isMin = topic.split('/')[3] === 'min'
    const selectedSensor = topic.split('/')[2]
    if (isMin) {
        if (selectedSensor === 'temperature') {client.publish(`room/${topic.split('/')[1]}/${topic.split('/')[2]}`, `${temperatureValue + 0.5}`); temperatureValue += 0.5}
        if (selectedSensor === 'sound') {client.publish(`room/${topic.split('/')[1]}/${topic.split('/')[2]}`, `${soundValue + 1}`); soundValue += 1}
        if (selectedSensor === 'humidity') {client.publish(`room/${topic.split('/')[1]}/${topic.split('/')[2]}`, `${humidityValue + 10}`); humidityValue += 10}
    } else {
        if (selectedSensor === 'temperature') {client.publish(`room/${topic.split('/')[1]}/${topic.split('/')[2]}`, `${temperatureValue - 0.5}`); temperatureValue -= 0.5}
        if (selectedSensor === 'sound') {client.publish(`room/${topic.split('/')[1]}/${topic.split('/')[2]}`, `${soundValue - 10}`); soundValue -= 10}
        if (selectedSensor === 'humidity') {client.publish(`room/${topic.split('/')[1]}/${topic.split('/')[2]}`, `${humidityValue - 1}`); humidityValue -= 1}
    }
})

let temperatureValue = 22;
let humidityValue = 50;
let soundValue = 80;

function simulateValue(min, max, variation, currentValue) {
    // Calculer une variation aléatoire
    let change = (Math.random() - 0.5) * variation;

    // Ajouter la variation à la valeur courante
    currentValue += change;

    // Limiter la nouvelle valeur aux valeurs minimales et maximales
    if (currentValue < min) {
        currentValue = min;
    } else if (currentValue > max) {
        currentValue = max;
    }

    return currentValue;
}

setInterval(() => {
    // Temperature
    client.publish('room/1/temperature', simulateValue(15, 35, 0.5, temperatureValue).toFixed(1))
    client.publish('room/2/temperature', simulateValue(15, 35, 0.5, temperatureValue).toFixed(1))
    client.publish('room/3/temperature', simulateValue(15, 35, 0.5, temperatureValue).toFixed(1))

    // Humidity
    client.publish('room/1/humidity', simulateValue(35, 75, 1, humidityValue).toFixed(1))
    client.publish('room/2/humidity', simulateValue(35, 75, 1, humidityValue).toFixed(1))
    client.publish('room/3/humidity', simulateValue(35, 75, 1, humidityValue).toFixed(1))

    // Sound
    client.publish('room/1/sound', simulateValue(60, 125, 25, soundValue).toFixed(1))
    client.publish('room/2/sound', simulateValue(60, 125, 25, soundValue).toFixed(1))
    client.publish('room/3/sound', simulateValue(60, 125, 25, soundValue).toFixed(1))
}, 5 * 60 * 1000);  // Exécute simulateValue chaque 5 minutes