
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "AWS Instance CPU Usage",
        },
    },
};

function ChartComponent({ dataAPI }) {
    const data = {
        labels: dataAPI.map((item) => item.x),
        datasets: [
            {
                label: "Metric Data",
                data: dataAPI.map((item) => item.y),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return <Line options={options} data={data} />;
}

export default ChartComponent;
