const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Get all sensors => /api/v1/sensors/
exports.getSensors = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        success: true,
    });
})