import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedBarChart = (props) => {
  const { legendX, legendY, data } = props;

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          text: legendX,
          display: true,
        },
      },
      y: {
        stacked: true,
        title: {
          text: legendY,
          display: true,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "99%" }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default StackedBarChart;
