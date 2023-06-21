const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    room: {
        type: Number,
        required: [true, 'Veuillez entrer une pièce'],
        enum: [1, 2, 3],
    },
    sensorType: {
        type: String,
        required: [true, 'Veuillez entrer un type de capteur'],
        enum: ['temperature', 'humidity', 'sound'],
    },
    sensorValue: {
        type: Number,
        required: [true, 'Veuillez entrer une valeur'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Sensor', sensorSchema);