const { CloudWatchClient, GetMetricStatisticsCommand } = require("@aws-sdk/client-cloudwatch");
const { EC2Client, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");
const { config } = require("dotenv");

config()


const getMetrics = async (timePeriod, period, privateIP) => {
    const ec2Client = new EC2Client({
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.ACCESSKEYID,
            secretAccessKey: process.env.SECRETACCESSKEY,
        },
    });

    const cloudWatchClient = new CloudWatchClient({
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.ACCESSKEYID,
            secretAccessKey: process.env.SECRETACCESSKEY,
        },
    });

    const getInstanceID = async (pIP) => {
        const params = {
            Filters: [
                {
                    Name: "private-ip-address",
                    Values: [pIP],
                },
            ],
        };
        try {
            const command = new DescribeInstancesCommand(params);
            const response = await ec2Client.send(command);
            if (!response.Reservations || response.Reservations.length === 0) {
                throw new Error("No instances found for the provided private IP.");
            }
            return response.Reservations[0].Instances[0].InstanceId;
        } catch (error) {
            throw new Error("IP address not found or invalid: " + error.message);
        }
    };

    try {
        if (!timePeriod || typeof timePeriod !== "number") {
            throw new Error("Invalid timePeriod. Must be a number in milliseconds.");
        }

      
        const instanceID = await getInstanceID(privateIP);

        const endDateString = new Date();
        const startDateString = new Date(Date.now() - timePeriod);


        const params = {
            EndTime: endDateString,
            MetricName: "CPUUtilization",
            Namespace: "AWS/EC2",
            Period: period,
            StartTime: startDateString,
            Dimensions: [
                {
                    Name: "InstanceId",
                    Value: instanceID,
                },
            ],
            Statistics: ["Average"],
        };

        console.log("Param Types:", {
            EndTime: typeof params.EndTime,
            StartTime: typeof params.StartTime,
        });

        console.log("Params being sent to CloudWatch:", params);

        try {
            const command = new GetMetricStatisticsCommand(params);
            console.log("Command initialized successfully.");
            const response = await cloudWatchClient.send(command);
            console.log("Metrics sent successfully.");
            return response;
        } catch (error) {
            console.error("Error during AWS Command execution:", error.message);
            throw error;
        }
    } catch (error) {
        console.error("Error fetching metrics:", error.message);
        throw error;
    }
};
module.exports = getMetrics;