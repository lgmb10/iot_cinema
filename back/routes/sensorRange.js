const express = require("express");
const router = express.Router();

const {
    getSensorRanges,
    createSensorRange,
    updateSensorRanges
} = require("../controllers/sensorRangeController");

router.route("/sensors/range").post(createSensorRange);

router.route("/sensors/ranges/:room").get(getSensorRanges)
    .put(updateSensorRanges);

module.exports = router;