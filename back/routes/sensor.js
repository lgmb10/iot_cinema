const express = require("express");
const router = express.Router();

const {
    getSensors,
} = require("../controllers/sensorController");

router.route("/sensors").get(getSensors);

module.exports = router;