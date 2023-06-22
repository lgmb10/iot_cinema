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
    client.publish('room/1/temperature', simulateValue(20, 30, 0.5, temperatureValue).toFixed(1))
    client.publish('room/2/temperature', simulateValue(20, 30, 0.5, temperatureValue).toFixed(1))
    client.publish('room/3/temperature', simulateValue(20, 30, 0.5, temperatureValue).toFixed(1))

    // Humidity
    client.publish('room/1/humidity', simulateValue(45, 65, 0.5, humidityValue).toFixed(1))
    client.publish('room/2/humidity', simulateValue(45, 65, 0.5, humidityValue).toFixed(1))
    client.publish('room/3/humidity', simulateValue(45, 65, 0.5, humidityValue).toFixed(1))

    // Sound
    client.publish('room/1/sound', simulateValue(65, 117, 25, soundValue).toFixed(1))
    client.publish('room/2/sound', simulateValue(65, 117, 0.5, soundValue).toFixed(1))
    client.publish('room/3/sound', simulateValue(65, 117, 0.5, soundValue).toFixed(1))
}, 2 * 60 * 1000);  // Exécute simulateValue chaque 2 minutes