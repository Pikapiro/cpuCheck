const express = require("express");
const { getMetricsController } = require("../controllers/metricsController");

const router = express.Router();

// Metrics endpoint
router.get("/", getMetricsController);

module.exports = router;
