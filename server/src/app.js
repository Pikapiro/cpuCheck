const express = require("express");
const cors = require("cors");
const metricsRouter = require("./routes/metrics");

const app = express();

// Middleware
app.use(cors());

// Routes
app.use("/api/metrics", metricsRouter);

// Root endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

module.exports = app;
