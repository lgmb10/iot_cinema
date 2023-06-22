const express = require("express");
const router = express.Router();

const {
    getSensorsByRoom,
    getSensorsSummary
} = require("../controllers/sensorController");

router.route("/sensors/:room").get(getSensorsByRoom);

router.route("/sensors").get(getSensorsSummary);

module.exports = router;