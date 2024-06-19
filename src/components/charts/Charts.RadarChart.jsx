import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    subject: "RPS",
    description: "Percent of overall RPS",
    value: 100,
    cap: 100,
  },
  {
    subject: "Uptime",
    description:
      "Percent of time since last restart that this has been available",
    value: 90,
    cap: 100,
  },
  {
    subject: "Success",
    description: "Percent of responses that are 200 (Status Ok)",
    value: 95,
    cap: 100,
  },
  {
    subject: "Inventory",
    description: "Percent of OAS documentation that have descriptions",
    value: 70,
    cap: 100,
  },
  {
    subject: "Builders",
    description: "Percent of endpoints that have builders setup",
    value: 85,
    cap: 100,
  },
  {
    subject: "Latency",
    description:
      "Percent of requests that are within expected response time (~100ms) depending on analytics",
    value: 90,
    cap: 100,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const tooltipData = payload[0].payload;

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
          style={{ margin: 0, paddingBottom: "5px", fontSize: 12, fontWeight:"bolder" }}
        >{`${label}`}</p>

        <p
          style={{ margin: 0, paddingBottom: "5px", fontSize: 12 }}
        >{`${tooltipData.description}`}</p>

        <p
          style={{ margin: 0, paddingBottom: "5px", fontSize: 10, color:"#4799ff" }}
        >{`Amount: ${tooltipData.actual}`}</p>
      </div>
    );
  }
};

export default class RadarChartComponent extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={this.props.data}>
          <PolarGrid opacity={0.3} />
          <PolarAngleAxis fontSize={12} dataKey="subject" />
          <PolarRadiusAxis
            fontSize={10}
            strokeOpacity={0.2}
            tickFormatter={(cap) => `${cap}%`} // Add "ms" suffix
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#00000020" }} />

          <Radar
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d880"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
