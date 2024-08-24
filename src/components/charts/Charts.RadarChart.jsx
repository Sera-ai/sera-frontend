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
