import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const data1 = [
  {
    name: "05/28/2024",
    pre: 4000,
    req: 2400,
    amt: 2400,
    tooltip: [],
  },
  {
    name: "05/29/2024",
    pre: 3000,
    req: 1398,
    amt: 2210,
    tooltip: [],
  },
  {
    name: "05/30/2024",
    pre: 2000,
    req: 9800,
    amt: 2290,
    tooltip: [],
  },
  {
    name: "05/31/2024",
    pre: 2780,
    req: 3908,
    amt: 2000,
    tooltip: [],
  },
  {
    name: "06/01/2024",
    pre: 1890,
    req: 4800,
    amt: 2181,
    tooltip: [],
  },
  {
    name: "06/02/2024",
    pre: 2390,
    req: 3800,
    amt: 2500,
    tooltip: [],
  },
  {
    name: "06/03/2024",
    pre: 3490,
    req: 4300,
    amt: 2100,
    tooltip: [],
  },
  {
    name: "06/04/2024",
    pre: 4000,
    req: 2400,
    amt: 2400,
    tooltip: [],
  },
  {
    name: "06/05/2024",
    pre: 3000,
    req: 1398,
    amt: 2210,
    tooltip: [],
  },
  {
    name: "06/06/2024",
    pre: 2000,
    req: 9800,
    amt: 2290,
    tooltip: [],
  },
  {
    name: "06/07/2024",
    pre: 2780,
    req: 3908,
    amt: 2000,
    tooltip: [],
  },
  {
    name: "06/08/2024",
    pre: 1890,
    req: 4800,
    amt: 2181,
    tooltip: [],
  },
  {
    name: "06/09/2024",
    pre: 2390,
    req: 3800,
    amt: 2500,
    tooltip: [],
  },
  {
    name: "06/10/2024",
    pre: 3490,
    req: 4300,
    amt: 2100,
    tooltip: [],
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const tooltipData = payload[0].payload.tooltip;

    return (
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "10px",
          borderRadius: "5px",
          color: "#fff",
          minWidth: "300px",
        }}
      >
        <p
          style={{ margin: 0, paddingBottom: "5px", fontSize: 12 }}
        >{`Average Latency On${label}`}</p>
      </div>
    );
  }

  return null;
};

export const NewBarChart = ({height, onSelectColumn = ()=>{}, selectedColumn}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        width={"100%"}
        height={"100%"}
        data={[...data1,...data1,...data1]}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="0"
          vertical={false}
          strokeOpacity={0.1}
        />
        <XAxis axisLine={false} tickLine={false} dataKey="name" fontSize={12} />
        <YAxis axisLine={false} tickLine={false} fontSize={12} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#00000020" }} />
        <Bar
          dataKey="pre"
          stackId="a"
          fill="#008cff"
          width={1}
          maxBarSize={10}
          radius={[3, 3, 3, 3]}
          onClick={(e) => onSelectColumn(e)}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
