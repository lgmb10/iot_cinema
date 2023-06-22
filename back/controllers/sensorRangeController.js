const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const SensorRange = require("../models/sensorRange")

// create sensor ranges => /api/v1/sensors/range
exports.createSensorRange = catchAsyncErrors(async (req, res, next) => {
    const sensorRange = await SensorRange.create(req.body);
    res.status(201).json({
        success: true,
        sensorRange,
    });
})

// Update sensor ranges => /api/v1/sensors/range/:room
exports.updateSensorRanges = catchAsyncErrors(async (req, res, next) => {
    const temperatureSensorRange = await SensorRange.findOne({ room: req.params.room, sensorType: 'temperature' });
    const soundSensorRange = await SensorRange.findOne({ room: req.params.room, sensorType: 'sound' });
    const humiditySensorRange = await SensorRange.findOne({ room: req.params.room, sensorType: 'humidity' });

    if (!temperatureSensorRange || !soundSensorRange || !humiditySensorRange) {
        return next(new ErrorHandler("La plage n'existe pas", 404));
    }

    await SensorRange.findOneAndUpdate({ room: req.params.room, sensorType: 'temperature' }, req.body.temperature, {
        new: true,
        runValidators: true,
    });

    await SensorRange.findOneAndUpdate({ room: req.params.room, sensorType: 'sound' }, req.body.sound, {
        new: true,
        runValidators: true,
    });

    await SensorRange.findOneAndUpdate({ room: req.params.room, sensorType: 'humidity' }, req.body.humidity, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true
    });
})

// Get sensor ranges by room => /api/v1/sensors/range/:room
exports.getSensorRanges = catchAsyncErrors(async (req, res, next) => {
    const temperatureSensorRange = await SensorRange.findOne({ room: req.params.room, sensorType: 'temperature' });
    const soundSensorRange = await SensorRange.findOne({ room: req.params.room, sensorType: 'sound' });
    const humiditySensorRange = await SensorRange.findOne({ room: req.params.room, sensorType: 'humidity' });

    const sensorRanges = {
        temperature: temperatureSensorRange,
        sound: soundSensorRange,
        humidity: humiditySensorRange
    }
    res.status(200).json({
        success: true,
        sensorRanges
    });
})