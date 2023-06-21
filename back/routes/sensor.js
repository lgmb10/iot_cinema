const express = require("express");
const router = express.Router();

const {
    getSensorsByRoom,
} = require("../controllers/sensorController");

router.route("/sensors/:room").get(getSensorsByRoom);

module.exports = router;