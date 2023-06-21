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