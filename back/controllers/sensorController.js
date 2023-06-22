const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Sensor = require("../models/sensor")

// Get sensors by room => /api/v1/sensors/:room
exports.getSensorsByRoom = catchAsyncErrors(async (req, res, next) => {
    const temperatureSensors = await Sensor.find({ room: req.params.room, sensorType: 'temperature' }).sort({ createdAt: -1 }).limit(10);
    const soundSensors = await Sensor.find({ room: req.params.room, sensorType: 'sound' }).sort({ createdAt: -1 }).limit(10);
    const humiditySensors = await Sensor.find({ room: req.params.room, sensorType: 'humidity' }).sort({ createdAt: -1 }).limit(10);

    const sensors = {
        temperature: temperatureSensors,
        sound: soundSensors,
        humidity: humiditySensors
    }
    res.status(200).json({
        success: true,
        sensors
    });
})

// Get all sensors recap => /api/v1/sensors/summary
exports.getSensorsSummary = catchAsyncErrors(async (req, res, next) => {
    const tempRoom1 = await Sensor.find({ room: 1, sensorType: 'temperature' }).sort({ createdAt: -1 }).limit(1);
    const humidRoom1 = await Sensor.find({ room: 1, sensorType: 'humidity' }).sort({ createdAt: -1 }).limit(1);

    const tempRoom2 = await Sensor.find({ room: 2, sensorType: 'temperature' }).sort({ createdAt: -1 }).limit(1);
    const humidRoom2 = await Sensor.find({ room: 2, sensorType: 'humidity' }).sort({ createdAt: -1 }).limit(1);

    const tempRoom3 = await Sensor.find({ room: 3, sensorType: 'temperature' }).sort({ createdAt: -1 }).limit(1);
    const humidRoom3 = await Sensor.find({ room: 3, sensorType: 'humidity' }).sort({ createdAt: -1 }).limit(1);

    const avgSoundRoom1 = await Sensor.aggregate([
        {
            $match: {
                room: 1,
                sensorType: 'sound'
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $limit: 10
        },
        {
            $group: {
                _id: null,
                averageSensorValue: { $avg: "$sensorValue" }
            }
        }
    ])
    
    const avgSoundRoom2 = await Sensor.aggregate([
        {
            $match: {
                room: 2,
                sensorType: 'sound'
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $limit: 10
        },
        {
            $group: {
                _id: null,
                averageSensorValue: { $avg: "$sensorValue" }
            }
        }
    ])

    const avgSoundRoom3 = await Sensor.aggregate([
        {
            $match: {
                room: 3,
                sensorType: 'sound'
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $limit: 10
        },
        {
            $group: {
                _id: null,
                averageSensorValue: { $avg: "$sensorValue" }
            }
        }
    ])

    const sensorSummary = {
        "room1": {
            temperature: tempRoom1[0].sensorValue,
            sound: avgSoundRoom1[0].averageSensorValue,
            humidity: humidRoom1[0].sensorValue
        },
        "room2": {
            temperature: tempRoom2[0].sensorValue,
            sound: avgSoundRoom2[0].averageSensorValue,
            humidity: humidRoom2[0].sensorValue
        },
        "room3": {
            temperature: tempRoom3[0].sensorValue,
            sound: avgSoundRoom3[0].averageSensorValue,
            humidity: humidRoom3[0].sensorValue
        },
    }

    res.status(200).json({
        success: true,
        sensorSummary
    });
})