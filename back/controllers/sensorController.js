const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Sensor = require("../models/sensor")
const SensorRange = require("../models/sensorRange")

// Get sensors by room => /api/v1/sensors/:room
exports.getSensorsByRoom = catchAsyncErrors(async (req, res, next) => {
    const temperatureSensors = await Sensor.find({ room: req.params.room, sensorType: 'temperature' }).sort({ createdAt: -1 }).limit(12);
    const soundSensors = await Sensor.find({ room: req.params.room, sensorType: 'sound' }).sort({ createdAt: -1 }).limit(12);
    const humiditySensors = await Sensor.find({ room: req.params.room, sensorType: 'humidity' }).sort({ createdAt: -1 }).limit(12);

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

// Get all sensors recap => /api/v1/sensors
exports.getSensorsSummary = catchAsyncErrors(async (req, res, next) => {
    const tempRoom1 = await Sensor.find({ room: 1, sensorType: 'temperature' }).sort({ createdAt: -1 }).limit(1);
    const tempRange1 = await SensorRange.findOne({ room: 1, sensorType: 'temperature' });
    const humidRoom1 = await Sensor.find({ room: 1, sensorType: 'humidity' }).sort({ createdAt: -1 }).limit(1);
    const humidRange1 = await SensorRange.findOne({ room: 1, sensorType: 'humidity' });
    
    const tempRoom2 = await Sensor.find({ room: 2, sensorType: 'temperature' }).sort({ createdAt: -1 }).limit(1);
    const tempRange2 = await SensorRange.findOne({ room: 2, sensorType: 'temperature' });
    const humidRoom2 = await Sensor.find({ room: 2, sensorType: 'humidity' }).sort({ createdAt: -1 }).limit(1);
    const humidRange2 = await SensorRange.findOne({ room: 2, sensorType: 'humidity' });

    const tempRoom3 = await Sensor.find({ room: 3, sensorType: 'temperature' }).sort({ createdAt: -1 }).limit(1);
    const tempRange3 = await SensorRange.findOne({ room:3, sensorType: 'temperature' });
    const humidRoom3 = await Sensor.find({ room: 3, sensorType: 'humidity' }).sort({ createdAt: -1 }).limit(1);
    const humidRange3 = await SensorRange.findOne({ room: 3, sensorType: 'humidity' });

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
            $limit: 12
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
            $limit: 12
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
            $limit: 12
        },
        {
            $group: {
                _id: null,
                averageSensorValue: { $avg: "$sensorValue" }
            }
        }
    ])

    const soundRange1 = await SensorRange.findOne({ room: 1, sensorType: 'sound' });
    const soundRange2 = await SensorRange.findOne({ room: 2, sensorType: 'sound' });
    const soundRange3 = await SensorRange.findOne({ room: 3, sensorType: 'sound' });

    const sensorSummary = {
        room1: {
            temperature: {
                value: tempRoom1[0].sensorValue,
                date: tempRoom1[0].createdAt,
                range: {
                    min: tempRange1.sensorValueMin,
                    max: tempRange1.sensorValueMax
                }
            },
            sound: {
                average: avgSoundRoom1[0].averageSensorValue.toFixed(2),
                range: {
                    min: soundRange1.sensorValueMin,
                    max: soundRange1.sensorValueMax
                }
            },
            humidity: {
                value: humidRoom1[0].sensorValue,
                date: humidRoom1[0].createdAt,
                range: {
                    min: humidRange1.sensorValueMin,
                    max: humidRange1.sensorValueMax
                }
            }
        },
        room2: {
            temperature: {
                value: tempRoom2[0].sensorValue,
                date: tempRoom2[0].createdAt,
                range: {
                    min: tempRange2.sensorValueMin,
                    max: tempRange2.sensorValueMax
                }
            },
            sound: {
                average: avgSoundRoom2[0].averageSensorValue.toFixed(2),
                range: {
                    min: soundRange2.sensorValueMin,
                    max: soundRange2.sensorValueMax
                }
            },
            humidity: {
                value: humidRoom2[0].sensorValue,
                date: humidRoom2[0].createdAt,
                range: {
                    min: humidRange2.sensorValueMin,
                    max: humidRange2.sensorValueMax
                }
            }
        },
        room3: {
            temperature: {
                value: tempRoom3[0].sensorValue,
                date: tempRoom3[0].createdAt,
                range: {
                    min: tempRange3.sensorValueMin,
                    max: tempRange3.sensorValueMax
                }
            },
            sound: {
                average: avgSoundRoom3[0].averageSensorValue.toFixed(2),
                range: {
                    min: soundRange3.sensorValueMin,
                    max: soundRange3.sensorValueMax
                }
            },
            humidity: {
                value: humidRoom3[0].sensorValue,
                date: humidRoom3[0].createdAt,
                range: {
                    min: humidRange3.sensorValueMin,
                    max: humidRange3.sensorValueMax
                }
            }
        },
    }

    res.status(200).json({
        success: true,
        sensorSummary
    });
})