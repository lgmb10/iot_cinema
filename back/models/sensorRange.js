const mongoose = require('mongoose');

const sensorRangeSchema = new mongoose.Schema({
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
    sensorValueMin: {
        type: Number,
        required: [true, 'Veuillez entrer une valeur min'],
    },
    sensorValueMax: {
        type: Number,
        required: [true, 'Veuillez entrer une valeur max'],
    }
})

sensorRangeSchema.index({ room: 1, sensorType: 1 }, { unique: true });

module.exports = mongoose.model('SensorRange', sensorRangeSchema);