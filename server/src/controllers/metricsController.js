const getMetrics = require("../services/getMetricStatistics");

const getMetricsController = async (req, res) => {
    let { timePeriod, period, privateIP } = req.query;

    console.log("Received Query Parameters:", req.query);

    // Validate query parameters
    if (!timePeriod || !period || !privateIP) {
        return res.status(400).json({
            error: "Please provide all parameters: timePeriod, period, and privateIP.",
        });
    }

    // Convert to numbers and validate
    timePeriod = Number(timePeriod);
    period = Number(period);

    if (isNaN(timePeriod) || isNaN(period)) {
        return res.status(400).json({
            error: "timePeriod and period must be valid numbers.",
        });
    }

    try {
        const metrics = await getMetrics(timePeriod, period, privateIP);
        res.status(200).json(metrics);
    } catch (err) {
        console.error("Error in getMetrics:", err.stack);
        res.status(400).json({ error: `Error fetching metrics: ${err.message}` });
    }
};

module.exports = { getMetricsController };
