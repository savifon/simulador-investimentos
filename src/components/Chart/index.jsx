import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const StackedBarChart = (props) => {
  const {
    data,
    keyX,
    legendX,
    legendY,
    dataKeyA,
    legendA,
    colorA,
    dataKeyB,
    legendB,
    colorB,
  } = props;

  return (
    <div style={{ width: "99%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 0, bottom: 20, left: 60, right: 30 }}
        >
          <XAxis
            dataKey={keyX}
            label={{ value: legendX, position: "bottom" }}
            scale="band"
            axisLine={false}
            tickLine={false}
            padding={{ left: 5 }}
          />
          <YAxis
            label={{ value: legendY, angle: -90, position: "left" }}
            axisLine={false}
            tickLine={false}
            padding={{ bottom: 5 }}
          />
          <Tooltip />
          <Legend wrapperStyle={{ top: 300, left: 100 }} />
          <Bar dataKey={dataKeyA} name={legendA} stackId="a" fill={colorA} />
          <Bar dataKey={dataKeyB} name={legendB} stackId="a" fill={colorB} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;
