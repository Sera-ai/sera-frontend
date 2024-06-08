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

const generateRandomTooltipData = () => {
  const tooltips = [
    "Socket Init",
    "DNS Lookup",
    "TCP Handshake",
    "Transfer Start",
    "Download",
  ];

  let currentStart = 0;
  return tooltips.map((name) => {
    const duration = Math.random() * 20 + 10; // Random duration between 10 and 30
    const tooltip = {
      name,
      start: currentStart,
      duration: duration.toFixed(0),
    };
    currentStart += duration;
    return tooltip;
  });
};

data1.forEach((item) => {
  item.tooltip = generateRandomTooltipData();
});

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
        <ResponsiveContainer width={400} height={180}>
          <BarChart
            layout="vertical"
            data={tooltipData}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            barCategoryGap="70%" // Adjust this value to make bars skinnier
          >
            <CartesianGrid
              strokeDasharray="0"
              horizontal={false}
              strokeOpacity={0.1}
            />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              width={95}
              orientation="left"
            />
            <YAxis
              type="category"
              dataKey="duration"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              width={50}
              orientation="right"
              yAxisId="right"
              tickFormatter={(value) => `${value} ms`} // Add "ms" suffix
            />
            <Bar dataKey="start" stackId="a" fill="transparent" />
            <Bar
              dataKey="duration"
              stackId="a"
              fill="#4799ff"
              radius={[3, 3, 3, 3]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
};

export default class NewBarChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data1}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="0"
            vertical={false}
            strokeOpacity={0.1}
          />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="name"
            fontSize={12}
          />
          <YAxis axisLine={false} tickLine={false} fontSize={12} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#00000020" }} />
          <Legend
            align="right"
            verticalAlign="top"
            layout="vertical"
            wrapperStyle={{ cursor: "pointer" }}
            iconType="line"
          />
          <Bar
            dataKey="req"
            stackId="a"
            fill="#4799ff"
            fillOpacity={0.3}
            stroke="#4799ff"
            radius={[0, 0, 10, 10]}
          />
          <Bar
            dataKey="pre"
            stackId="a"
            fill="#94a3b8"
            fillOpacity={0.3}
            stroke="#94a3b8"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
